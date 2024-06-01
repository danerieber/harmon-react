import { Presence } from "@/types/types";
import { Tooltip } from "@nextui-org/tooltip";
import clsx from "clsx";

export default function PresenceIcon({
  presence,
  ping,
  error,
}: {
  presence: Presence;
  ping?: boolean;
  error?: string;
}) {
  function getColor() {
    if (error) {
      return "bg-danger";
    }
    switch (presence) {
      case Presence.Online:
        return "bg-green-500";
      case Presence.Away:
        return "bg-yellow-500";
      case Presence.InCall:
        return "bg-cyan-500 presence-icon-in-call";
      default: // Offline
        return "bg-zinc-500";
    }
  }

  function getName() {
    if (error) return error;
    switch (presence) {
      case Presence.Online:
        return "Online";
      case Presence.Away:
        return "Away";
      case Presence.InCall:
        return "In Call";
      default:
        return "Offline";
    }
  }

  // Stack two icons so that one can play the ping animation when we need it
  return (
    <Tooltip disableAnimation closeDelay={0} content={getName()}>
      <div className="presence-icon relative mt-1.5">
        <div className={clsx("presence-icon absolute", getColor())}></div>
        <div
          className={clsx(
            "presence-icon absolute",
            getColor(),
            ping && "animate-ping",
          )}
        ></div>
      </div>
    </Tooltip>
  );
}
