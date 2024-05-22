import { Send } from "@mui/icons-material";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { RefObject, useState } from "react";

export default function ChatInput({
  sendNewChatMessage,
  textareaRef,
}: {
  sendNewChatMessage: (content: string) => void;
  textareaRef: RefObject<HTMLTextAreaElement>;
}) {
  const [content, setContent] = useState("");

  function sendMessage() {
    sendNewChatMessage(content);
    setContent("");
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
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            ((!e.shiftKey && !content.includes("\n")) || e.ctrlKey)
          ) {
            e.preventDefault();
            sendMessage();
          } else if (e.key === "Escape") {
            textareaRef.current?.blur();
          }
        }}
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
