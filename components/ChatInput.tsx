import api from "@/lib/api";
import { User } from "@/types/types";
import { Send } from "@mui/icons-material";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { RefObject, useState, useEffect } from "react";
import SuggestionChips from "./SuggestionChips";
import { getUsernameColor } from "@/styles/computed";
import data, { EmojiMartData } from "@emoji-mart/data";

export default function ChatInput({
  sendNewChatMessage,
  textareaRef,
  sessionToken,
  users,
}: {
  sendNewChatMessage: (content: string) => void;
  textareaRef: RefObject<HTMLTextAreaElement>;
  sessionToken: string;
  users: { [key: string]: User };
}) {
  const [content, setContent] = useState("");
  const [showUserChips, setShowUserChips] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [showEmojiChips, setShowEmojiChips] = useState(false);
  const [filteredEmojis, setFilteredEmojis] = useState<any[]>([]);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);

  const emojis = Object.values((data as EmojiMartData).emojis).filter(
    (emoji) => emoji && emoji.skins && emoji.skins[0].native,
  );

  useEffect(() => {
    const userArray = Object.values(users);
    const atSymbolIndex = content.lastIndexOf("@", cursorPosition || undefined);
    const colonIndex = content.lastIndexOf(":", cursorPosition || undefined);
    const userSearchQuery =
      atSymbolIndex !== -1 &&
      (cursorPosition === null || atSymbolIndex < cursorPosition)
        ? content.substring(atSymbolIndex + 1, cursorPosition || undefined)
        : "";
    const emojiSearchQuery =
      colonIndex !== -1 &&
      (cursorPosition === null || colonIndex < cursorPosition)
        ? content.substring(colonIndex + 1, cursorPosition || undefined)
        : "";

    if (userSearchQuery.length >= 1) {
      const filtered = userArray
        .filter((user) =>
          user.username.toLowerCase().startsWith(userSearchQuery.toLowerCase()),
        )
        .slice(0, 4); // Limit to 4 users so we don't crowd the UI

      setFilteredUsers(filtered);
      setShowUserChips(filtered.length > 0);
    } else {
      setShowUserChips(false);
    }

    if (emojiSearchQuery.length >= 1) {
      const filtered = emojis
        .filter((emoji) =>
          emoji.id.toLowerCase().startsWith(emojiSearchQuery.toLowerCase()),
        )
        .slice(0, 10); // Limit to 10 emojis so we don't crowd the UI

      setFilteredEmojis(filtered);
      setShowEmojiChips(filtered.length > 0);
    } else {
      setShowEmojiChips(false);
    }
  }, [content, cursorPosition, users, emojis]);

  function sendMessage() {
    sendNewChatMessage(content);
    setContent("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.code === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    } else if (e.code === "Escape") {
      textareaRef.current?.blur();
    }
  }

  async function handlePaste(e: React.ClipboardEvent) {
    const clipboardData = e.clipboardData;
    const file = clipboardData.files[0]; // Get only first file (if available)
    if (file && file.type.startsWith("image/")) {
      const imageBinary: ArrayBuffer = await readFileData(file);
      const imageUrl = await api.uploadImage(
        imageBinary,
        file.type.split("/")[1],
        sessionToken,
      );

      if (imageUrl) {
        const newContent = `${textareaRef.current?.value}![Pasted Image](${imageUrl})`;
        setContent(newContent);
      }
    }
  }

  function readFileData(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target) {
          resolve(event.target.result as ArrayBuffer);
        } else {
          reject(new Error("File reading failed"));
        }
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsArrayBuffer(file); // Read in binary
    });
  }

  function applyAutoCompletion(
    selector: string,
    completion: string,
    keepSelector = true,
    preSpace = true,
  ) {
    const selectorIndex = content.lastIndexOf(
      selector,
      cursorPosition || undefined,
    );
    setContent(
      content.substring(0, selectorIndex) +
        (preSpace && content.at(selectorIndex - 1) !== " " ? " " : "") +
        (keepSelector ? selector : "") +
        completion +
        " " +
        content.substring(cursorPosition || content.length),
    );
    setCursorPosition((selectorIndex || 0) + completion.length + 2);
    textareaRef.current?.focus();
  }

  function handleUserChipClick(user: User) {
    applyAutoCompletion("@", user.username);
    setShowUserChips(false);
  }

  function handleEmojiChipClick(emoji: any) {
    applyAutoCompletion(":", emoji.skins[0].native, false, false);
    setShowEmojiChips(false);
  }

  return (
    <div className="flex flex-col w-full max-w-7xl gap-2 p-2 pt-0 xl:px-10">
      {showUserChips && (
        <SuggestionChips
          items={filteredUsers}
          onChipClick={handleUserChipClick}
          getItemKey={(user) => user.username}
          getItemLabel={(user) => user.username}
          getItemIcon={(user) => <div className="pl-1">{user.icon}</div>}
          getItemClassNames={(user) => getUsernameColor(user.usernameColor)}
        />
      )}
      {showEmojiChips && (
        <SuggestionChips
          items={filteredEmojis}
          onChipClick={handleEmojiChipClick}
          getItemKey={(emoji) => emoji.id}
          getItemLabel={(emoji) => emoji.skins[0].native}
        />
      )}
      <div className="flex w-full gap-2">
        <Textarea
          fullWidth
          ref={textareaRef}
          color="primary"
          variant="faded"
          size="lg"
          minRows={1}
          maxLength={2069}
          value={content}
          onValueChange={(value) => {
            setContent(value);
            if (textareaRef.current) {
              setCursorPosition(textareaRef.current.selectionStart);
            }
          }}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        ></Textarea>
        <Button
          isIconOnly
          className="lg:hidden"
          size="lg"
          color="primary"
          onPress={sendMessage}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
}
