/* eslint-disable @next/next/no-img-element */
import { ChatMessage } from "@/types/types";
import clsx from "clsx";
import moment from "moment";
import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import Username from "./Username";
import remarkGemoji from "remark-gemoji";
import { Edit, Verified } from "@mui/icons-material";
import { Tooltip } from "@nextui-org/tooltip";
import rehypeExternalLinks from "rehype-external-links";
import { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";

export default function ChatMessageElement({
  icon,
  username,
  usernameColor,
  showUsername,
  msg,
  myUsername,
  isDeveloper,
  setImageModalSrc,
  imageOnOpen,
  isOwned,
  editChatMessage,
}: {
  icon: string;
  username: string;
  usernameColor: string;
  showUsername: boolean;
  msg: ChatMessage;
  myUsername: string;
  isDeveloper: boolean;
  setImageModalSrc: (src: string | undefined) => void;
  imageOnOpen: () => void;
  isOwned: boolean;
  editChatMessage: (content: string) => void;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditedContent(msg.data.content);
  }, [msg.data.content]);

  useEffect(() => {
    if (isEditing) {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(
        editedContent.length,
        editedContent.length,
      );
    }
  }, [editedContent.length, isEditing]);

  function editMessage() {
    if (editedContent !== msg.data.content) {
      editChatMessage(editedContent);
    }
    setIsEditing(false);
    setIsHovering(false);
    setEditedContent(msg.data.content);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.code === "Enter" && !e.shiftKey) {
      e.preventDefault();
      editMessage();
    } else if (e.code === "Escape") {
      e.preventDefault();
      editMessage();
    }
  }

  function formatTimestamp(timestamp: number) {
    const tsFormatOtherYear = "D MMM Y [at] h:mm a";
    const tsFormat = "D MMM [at] h:mm a";
    const m = moment(timestamp);
    const isCurrentYear = m.year() === moment().year();
    const format = isCurrentYear ? tsFormat : tsFormatOtherYear;
    return m.calendar({
      sameDay: "h:mm a",
      lastDay: "ddd [at] h:mm a",
      lastWeek: format,
      sameElse: format,
    });
  }

  function isMentioned() {
    if (!myUsername) return false;
    const u = myUsername;
    const mentionRegex = new RegExp(
      `^@${u}$|^@${u}\\s+.*$|^.*\\s+@${u}\\s+.*|^.*\\s+@${u}$`,
      "sg",
    );
    return mentionRegex.test(msg.data.content);
  }

  return (
    <div
      className={clsx(
        "relative w-full max-w-7xl px-2 xl:px-10",
        isHovering && "bg-content4",
        isMentioned() && (isHovering ? "bg-mentioned-600" : "bg-mentioned"),
        showUsername && "mt-3",
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex">
        {showUsername && <div className="pr-2 w-5">{icon ?? "😃"}</div>}
        <div
          className={clsx("flex flex-col min-w-0", isEditing && "flex-grow")}
        >
          {showUsername && (
            <p>
              <Username color={usernameColor}>
                {username || "<unkown>"}
                {isDeveloper && (
                  <Tooltip disableAnimation closeDelay={0} content="Developer">
                    <Verified className="text-primary-600 max-h-[1.1rem] pb-0.5" />
                  </Tooltip>
                )}
              </Username>
              <small className="text-default-500 pl-1">
                {formatTimestamp(msg.data.timestamp)}
              </small>
            </p>
          )}
          {isEditing ? (
            <Textarea
              ref={textareaRef}
              fullWidth
              color="primary"
              variant="faded"
              size="md"
              minRows={1}
              maxRows={5}
              maxLength={2069}
              value={editedContent}
              onValueChange={setEditedContent}
              onKeyDown={handleKeyDown}
            ></Textarea>
          ) : (
            <>
              <Markdown
                className={clsx(
                  "text-wrap break-words",
                  !showUsername && "pl-5",
                )}
                remarkPlugins={[remarkGfm, remarkBreaks, remarkGemoji]}
                rehypePlugins={[[rehypeExternalLinks, { target: "_blank" }]]}
                components={{
                  img(props) {
                    const { src, alt } = props;
                    return (
                      <>
                        <img
                          className="hover:cursor-pointer max-h-96 rounded-lg"
                          src={src}
                          alt={alt}
                          onClick={() => {
                            setImageModalSrc(src);
                            imageOnOpen();
                          }}
                        ></img>
                      </>
                    );
                  },
                }}
              >
                {msg.data.content}
              </Markdown>
              {msg.edited && (
                <p
                  className={clsx(
                    "text-default-500 text-xs",
                    !showUsername && "pl-5",
                  )}
                >
                  (edited)
                </p>
              )}
            </>
          )}
        </div>
      </div>
      {isHovering && (
        <div className="absolute top-[-1rem] right-[1rem]">
          <ButtonGroup size="sm">
            {isOwned && (
              <Button isIconOnly onPress={() => setIsEditing(!isEditing)}>
                <Edit />
              </Button>
            )}
          </ButtonGroup>
        </div>
      )}
    </div>
  );
}
