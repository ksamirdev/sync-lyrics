# Sync Lyrics

Sync Lyrics is an npm package that provides synchronized lyrics for Spotify tracks. Using the package, developers can easily fetch lyrics data for a given track ID, and receive back a cleaned version of the lyrics, with each line's start time and text.

The package is built on top of the Musixmatch API, and utilizes Spotify access tokens to retrieve lyrics data for a specific track. It also supports the removal of vocals from the track audio using the Web Audio API.

The package is easy to use, and provides a clean and compact data structure for the lyrics, making it simple to integrate into your project.

## Installation

```
npm install sync-lyrics
yarn add sync-lyrics
pnpm install sync-lyrics
```

## Usage

```ts
import LyricsClient from "sync-lyrics";
const client = new LyricsClient("SPOTIFY_COOKIE");

(async () => {
  const lyrics = await client.getLyrics("SPOTIFY_TRACK_ID");
  console.log(lyrics);
})();
```

## API Reference

> Fetches lyrics

`<Client>.getLyrics(id: string): Promise`

returns

```
language: string;
lines: Array<{ time: number; words: string; }>;
syncType: string;

```

## License

MIT License is a permissive open-source software license. It allows users to freely use, modify, distribute, and sell the software without any warranties or conditions. The license grants permission to the software's users to do whatever they want with the software, as long as they include the original license and copyright notice in their distribution. The software is provided "as is," and the license's authors are not responsible for any damages or liabilities.
