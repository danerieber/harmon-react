import { Presence, User } from "@/types/types";
import PresenceIcon from "./PresenceIcon";
import Username from "./Username";
import { getBannerBackground } from "@/styles/computed";

export default function UserElement({ user }: { user: User }) {
  return (
    <div
      className="flex items-center px-2 py-1 !bg-cover !bg-center"
      style={
        user.presence !== Presence.Offline
          ? { background: getBannerBackground(user.bannerUrl) }
          : {}
      }
    >
      <div className="flex-grow flex flex-col min-w-0">
        <div className="flex gap-2">
          <PresenceIcon presence={user.presence} />
          <Username username={user.username} color={user.usernameColor} />
        </div>
        <p className="text-ellipsis overflow-hidden flex-grow ml-5">
          {user.presence !== Presence.Offline ? user.status : "offline"}
          <span className="select-none">&nbsp;</span>
        </p>
      </div>
    </div>
  );
}
