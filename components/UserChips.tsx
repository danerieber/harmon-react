import { Chip } from "@nextui-org/chip";
import { User } from "@/types/types";
import { getUsernameColor } from "@/styles/computed";
import clsx from "clsx";

interface UserChipsProps {
  users: User[];
  onChipClick: (username: string) => void;
}

const UserChips = ({ users, onChipClick }: UserChipsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {users.map((user) => (
        <Chip
          classNames={{
            base: clsx(
              "hover:cursor-pointer",
              getUsernameColor(user.usernameColor),
            ),
            content: "font-bold",
          }}
          variant="faded"
          onClick={() => onChipClick(user.username)}
          key={user.username}
          startContent={<div className="pl-1">{user.icon}</div>}
        >
          {user.username}
        </Chip>
      ))}
    </div>
  );
};

export default UserChips;
