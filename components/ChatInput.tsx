import api from "@/lib/api";
import { Send } from "@mui/icons-material";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { RefObject, useState } from "react";

export default function ChatInput({
  sendNewChatMessage,
  textareaRef,
  sessionToken,
}: {
  sendNewChatMessage: (content: string) => void;
  textareaRef: RefObject<HTMLTextAreaElement>;
  sessionToken: string;
}) {
  const [content, setContent] = useState("");

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

  return (
    <div className="flex w-full max-w-7xl gap-2 p-2 pt-0 xl:px-10">
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
  );
}
