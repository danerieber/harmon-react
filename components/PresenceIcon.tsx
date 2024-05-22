import { Presence } from "@/types/types";
import clsx from "clsx";

export default function PresenceIcon({ presence }: { presence: Presence }) {
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

  return <div className={clsx("presence-icon", getColor())}></div>;
}
