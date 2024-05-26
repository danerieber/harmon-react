import api from "@/lib/api";
import { User } from "@/types/types";
import { Send } from "@mui/icons-material";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { RefObject, useState, useEffect } from "react";
import UserChips from "./UserChips";

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

  useEffect(() => {
    const userArray = Object.values(users);
    const atSymbolIndex = content.lastIndexOf("@");
    const searchQuery =
      atSymbolIndex !== -1 ? content.substring(atSymbolIndex + 1) : "";

    if (searchQuery.length >= 1) {
      const filtered = userArray
        .filter((user) =>
          user.username.toLowerCase().startsWith(searchQuery.toLowerCase()),
        )
        .slice(0, 4); // Limit to 4 users so we don't crowd the UI

      setFilteredUsers(filtered);
      setShowUserChips(filtered.length > 0);
    } else {
      setShowUserChips(false);
    }
  }, [content, users]);

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

  function handleChipClick(username: string) {
    setContent(
      `${content.substring(0, content.lastIndexOf("@") + 1)}${username} `,
    );
    setShowUserChips(false);
    textareaRef.current?.focus();
  }

  return (
    <div className="flex flex-col w-full max-w-7xl gap-2 p-2 pt-0 xl:px-10">
      {showUserChips && (
        <UserChips users={filteredUsers} onChipClick={handleChipClick} />
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
          onValueChange={setContent}
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
