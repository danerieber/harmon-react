import { Presence } from "@/types/types";
import clsx from "clsx";

export default function PresenceIcon({
  presence,
  ping,
}: {
  presence: Presence;
  ping?: boolean;
}) {
  function getColor() {
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

  // Stack two icons so that one can play the ping animation when we need it
  return (
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
  );
}
