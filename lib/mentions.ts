import { User } from "@/types/types";

function makeSubstitution(content: string, sub: Record<string, string>) {
  for (const key in sub) {
    let subbed = "";
    const tokens = content.split("@");
    let first = true;
    for (const token of tokens) {
      if (first) {
        first = false;
        subbed += token;
        continue;
      }
      if (
        (!subbed || /^.*\s+$/gs.test(subbed)) &&
        token.startsWith(key) &&
        !token.at(key.length)?.trim()
      ) {
        subbed += "@" + sub[key] + token.substring(key.length);
      } else {
        subbed += "@" + token;
      }
    }
    content = subbed;
  }
  return content;
}

const mentions = {
  subUsernames(content: string, users: Record<string, User>) {
    return makeSubstitution(
      content,
      Object.fromEntries(
        Object.entries(users).map(([userId, user]) => [user.username, userId]),
      ),
    );
  },
  subUserIds(content: string, users: Record<string, User>) {
    return makeSubstitution(
      content,
      Object.fromEntries(
        Object.entries(users).map(([userId, user]) => [userId, user.username]),
      ),
    );
  },
  isMentioned(content: string, u: string) {
    const mentionRegex = new RegExp(
      `^@${u}$|^@${u}\\s+.*$|^.*\\s+@${u}\\s+.*|^.*\\s+@${u}$`,
      "sg",
    );
    return mentionRegex.test(content);
  },
};

export default mentions;
