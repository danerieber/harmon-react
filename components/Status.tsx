import { ReactNode } from "react";

export default function Status({ children }: { children: ReactNode }) {
  return (
    <p className={"text-nowrap text-ellipsis overflow-hidden"}>
      {children}
      <span className="select-none">&nbsp;</span>
    </p>
  );
}
