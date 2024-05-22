export const usernameColors = [
  "blue",
  "purple",
  "green",
  "red",
  "pink",
  "yellow",
  "cyan",
  "",
];

export function getUsernameColor(color?: string) {
  switch (color) {
    case "blue":
      return "!text-blue-400";
    case "purple":
      return "!text-purple-400";
    case "green":
      return "!text-green-400";
    case "red":
      return "!text-red-400";
    case "pink":
      return "!text-pink-400";
    case "yellow":
      return "!text-yellow-400";
    case "cyan":
      return "!text-cyan-400";
    default:
      return "!text-foreground";
  }
}

export function getBannerBackground(bannerUrl: string) {
  return bannerUrl
    ? `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.45)), url("${bannerUrl}")`
    : "";
}
