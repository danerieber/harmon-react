import { getUsernameColor } from "@/styles/computed";
import clsx from "clsx";
import { ReactNode } from "react";

export default function Username({
  children,
  color,
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <strong
      className={clsx("text-ellipsis overflow-hidden", getUsernameColor(color))}
    >
      {children}
    </strong>
  );
}
