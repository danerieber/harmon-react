import {
  default as fuckingUntypedDefaultExport,
  EmojiMartData,
} from "@emoji-mart/data";

export const data = fuckingUntypedDefaultExport as EmojiMartData;

export const emojis = Object.values(data.emojis).filter(
  (emoji) => emoji && emoji.skins && emoji.skins[0].native,
);

export function randomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)].skins[0].native;
}
