export interface AccessToken {
  accessToken: string;
  accessTokenExpirationTimestampMs: number;
}

export interface LyricsData {
  lyrics: Lyrics;
  colors: MusixMatchColor;
  hasVocalRemoval: boolean;
}

export interface Lyrics {
  syncType: string;
  lines: Array<{
    startTimeMs: string;
    words: string;
    syllables: string[];
    endTimeMs: string;
  }>;
  provider: string;
  providerLyricsId: string;
  providerDisplayName: string;
  syncLyricsUri: string;
  isDenseTypeface: boolean;
  alternatives: string[];
  language: string;
  isRtlLanguage: boolean;
  fullscreenAction: string;
}

export interface MusixMatchColor {
  background: number;
  text: number;
  highlightText: number;
}

export interface CleanLyrics {
  syncType: string;
  language: string;
  lines: CleanLyricsLines[];
}

export interface CleanLyricsLines {
  time: number;
  words: string;
}
