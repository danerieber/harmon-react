import { Chip } from "@nextui-org/chip";
import { User } from "@/types/types";
import { getUsernameColor } from "@/styles/computed";

interface UserChipsProps {
  users: User[];
  onChipClick: (username: string) => void;
}

const UserChips = ({ users, onChipClick }: UserChipsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {users.map((user) => (
        <Chip
          className={`hover: cursor-pointer ${getUsernameColor(user.usernameColor)}`}
          variant="faded"
          onClick={() => onChipClick(user.username)}
          key={user.username}
          startContent={<>{user.icon}</>}
        >
          {user.username}
        </Chip>
      ))}
    </div>
  );
};

export default UserChips;
