import axios from "axios";
import { AccessToken, CleanLyrics, LyricsData } from "./types";

class SpotifyClient {
  private cachedToken: AccessToken | null;
  private readonly cookie: string;

  constructor(cookie: string) {
    this.cachedToken = null;
    this.cookie = cookie;
  }

  private async getToken(): Promise<AccessToken> {
    if (this.cachedToken) {
      return this.cachedToken;
    }

    const options = {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36",
        "App-platform": "WebPlayer",
        "content-type": "text/html; charset=utf-8",
        cookie: `sp_dc=${this.cookie}`,
      },
    };

    try {
      const { data } = await axios.get<AccessToken>(
        "https://open.spotify.com/get_access_token?reason=transport&productType=web_player",
        options
      );
      this.cachedToken = data;
      return data;
    } catch (error) {
      throw new Error(`Failed to get access token: ${error}`);
    }
  }

  async getLyrics(trackId: string): Promise<CleanLyrics> {
    await this.checkTokenExpire();

    try {
      const token = this.cachedToken!.accessToken;
      const formattedUrl = `https://spclient.wg.spotify.com/color-lyrics/v2/track/${trackId}?format=json&market=from_token`;
      const options = {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36",
          "App-platform": "WebPlayer",
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get<LyricsData>(formattedUrl, options);
      return this.clean(data);
    } catch (error) {
      throw new Error(`Failed to get lyrics: ${error}`);
    }
  }

  private async checkTokenExpire() {
    const token = this.cachedToken;

    if (token && token.accessTokenExpirationTimestampMs > Date.now()) {
      return;
    }

    try {
      this.cachedToken = await this.getToken();
    } catch (error) {
      throw new Error(`Failed to refresh token: ${error}`);
    }
  }

  private clean(data: LyricsData): CleanLyrics {
    return {
      language: data.lyrics.language,
      lines: data.lyrics.lines.flatMap((value) => {
        return {
          words: value.words,
          time: Number(value.startTimeMs),
        };
      }),
      syncType: data.lyrics.syncType,
    };
  }
}

export default SpotifyClient;
