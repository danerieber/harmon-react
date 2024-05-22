import { getUsernameColor } from "@/styles/computed";
import clsx from "clsx";

export default function Username({
  username,
  color,
}: {
  username: string;
  color?: string;
}) {
  return (
    <strong
      className={clsx("text-ellipsis overflow-hidden", getUsernameColor(color))}
    >
      {username}
    </strong>
  );
}
