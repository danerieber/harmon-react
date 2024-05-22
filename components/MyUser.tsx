import { Settings } from "@mui/icons-material";
import { Button } from "@nextui-org/button";
import PresenceIcon from "./PresenceIcon";
import { useEffect, useRef, useState } from "react";
import { Input } from "@nextui-org/input";
import { Action, User } from "@/types/types";
import { useDisclosure } from "@nextui-org/modal";
import UserSettingsModal from "./UserSettingsModal";
import Username from "./Username";
import { getBannerBackground } from "@/styles/computed";

export default function MyUser({
  myUser,
  send,
}: {
  myUser: User;
  send: (action: Action, data: any) => void;
}) {
  const {
    isOpen: settingsIsOpen,
    onOpen: settingsOnOpen,
    onClose: settingsOnClose,
  } = useDisclosure();

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingStatus, setIsEditingStatus] = useState(false);

  const editUsernameInput = useRef<HTMLInputElement>(null);
  const editStatusInput = useRef<HTMLInputElement>(null);

  // PRESS S FOR SETTINGS 😎
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "s") {
        e.preventDefault();
        settingsOnOpen();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function editUser(updated: User) {
    send(Action.UpdateMyUserInfo, updated);
  }

  function editStatus() {
    editUser({ ...myUser, status: editStatusInput.current?.value ?? "" });
    setIsEditingStatus(false);
  }

  function editUsername() {
    const username = editUsernameInput.current?.value;
    if (username) {
      send(Action.ChangeUsername, { username });
      setIsEditingUsername(false);
    }
  }

  return (
    <div
      className="flex items-center px-2 py-1 bg-content1 !bg-cover !bg-center"
      style={{ background: getBannerBackground(myUser.bannerUrl) }}
    >
      <div className="flex-grow flex flex-col min-w-0">
        {isEditingUsername ? (
          <Input
            ref={editUsernameInput}
            autoFocus
            size="sm"
            variant="faded"
            defaultValue={myUser.username}
            onFocus={() => {
              editUsernameInput.current?.select();
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape" || e.key === "Enter") {
                e.preventDefault();
                editUsername();
              }
            }}
            onBlur={editUsername}
          ></Input>
        ) : (
          <p
            className="text-ellipsis overflow-hidden hover:bg-content4 hover:cursor-text rounded"
            onClick={() => setIsEditingUsername(true)}
          >
            <Username username={myUser.username} color={myUser.usernameColor} />
          </p>
        )}
        <div className="flex gap-2">
          <PresenceIcon presence={myUser.presence} />
          {isEditingStatus ? (
            <Input
              ref={editStatusInput}
              autoFocus
              size="sm"
              variant="faded"
              defaultValue={myUser.status}
              onFocus={() => {
                editStatusInput.current?.select();
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape" || e.key === "Enter") {
                  e.preventDefault();
                  editStatus();
                }
              }}
              onBlur={editStatus}
            ></Input>
          ) : (
            <p
              className="hover:bg-content4 hover:cursor-text text-ellipsis overflow-hidden flex-grow rounded"
              onClick={() => setIsEditingStatus(true)}
            >
              {myUser.status}
              <span className="select-none">&nbsp;</span>
            </p>
          )}
        </div>
      </div>
      <Button isIconOnly size="lg" variant="light" onPress={settingsOnOpen}>
        <Settings />
      </Button>
      <UserSettingsModal
        // Cursed way to get this shit to actually update the myUser prop
        key={JSON.stringify(myUser)}
        myUser={myUser}
        editUser={editUser}
        isOpen={settingsIsOpen}
        onClose={settingsOnClose}
      />
    </div>
  );
}
