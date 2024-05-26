import { ChatMessage } from "@/types/types";
import clsx from "clsx";
import moment from "moment";
import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import Username from "./Username";
import remarkGemoji from "remark-gemoji";
import { Verified } from "@mui/icons-material";
import { Tooltip } from "@nextui-org/tooltip";

export default function ChatMessageElement({
  icon,
  username,
  usernameColor,
  showUsername,
  msg,
  myUsername,
  isDeveloper,
}: {
  icon: string;
  username: string;
  usernameColor: string;
  showUsername: boolean;
  msg: ChatMessage;
  myUsername: string;
  isDeveloper: boolean;
}) {
  function formatTimestamp(timestamp: string) {
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
        "flex w-full max-w-7xl px-2 xl:px-10",
        isMentioned() && "bg-mentioned",
        showUsername && "mt-3",
      )}
    >
      {showUsername && <div className="pr-2 w-5">{icon ?? "😃"}</div>}
      <div className="flex flex-col min-w-0">
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
        <Markdown
          className={clsx("text-wrap break-words", !showUsername && "pl-5")}
          remarkPlugins={[remarkGfm, remarkBreaks, remarkGemoji]}
        >
          {msg.data.content}
        </Markdown>
      </div>
    </div>
  );
}
