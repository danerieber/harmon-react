import { Presence, User } from "@/types/types";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import UserElement from "./UserElement";

export default function UserList({ users }: { users: Record<string, User> }) {
  return (
    <ScrollShadow hideScrollBar className="flex-grow flex flex-col">
      {Object.entries(
        Object.entries(users).reduce(
          // Group users by their presence
          (byPresence: any, [userId, user]) => {
            let g = "offline";
            if (user.presence === Presence.InCall) {
              g = "in call";
            } else if (
              user.presence === Presence.Online ||
              user.presence === Presence.Away
            ) {
              g = "online";
            }
            byPresence[g].push([userId, user]);
            return byPresence;
          },
          { "in call": [], online: [], offline: [] },
        ),
      ).map(([g, group]: [string, any]) => (
        // Header for each group
        <div key={`users_${g}`} className="flex flex-col">
          {group.length > 0 && (
            <strong className="text-default-500 ml-1">
              <small>{g}</small>
            </strong>
          )}
          {group
            // Sort by username
            .sort((a: any, b: any) =>
              a[1].username.localeCompare(b[1].username),
            )
            .map(([userId, user]: any) => (
              <UserElement key={`user_${userId}`} user={user}></UserElement>
            ))}
        </div>
      ))}
    </ScrollShadow>
  );
}
