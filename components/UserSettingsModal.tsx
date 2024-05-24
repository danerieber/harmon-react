import emojis from "@/types/Emojis";
import { User } from "@/types/types";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useState } from "react";
import { getUsernameColor, usernameColors } from "@/styles/computed";
import Username from "./Username";
import { Casino } from "@mui/icons-material";

export default function UserSettingsModal({
  myUser,
  editUser,
  isOpen,
  onClose,
}: {
  myUser: User;
  editUser: (user: User) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [editedUser, setEditedUser] = useState<User>(myUser);

  function saveOnClose() {
    editUser(editedUser);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={saveOnClose} size="2xl">
      <ModalContent>
        {(_onClose) => (
          <>
            <ModalHeader className="text-lg">Settings</ModalHeader>
            <ModalBody>
              <table className="border-none [&_*]:border-none [&_td:nth-child(1)]:pr-2">
                <tbody>
                  <tr>
                    <td>Icon</td>
                    <td>
                      <div className="flex gap-2">
                        <Input
                          disabled
                          value={editedUser.icon}
                          classNames={{ input: "text-2xl" }}
                        />
                        <Button
                          isIconOnly
                          onPress={() =>
                            setEditedUser({
                              ...editedUser,
                              icon: emojis[
                                Math.floor(Math.random() * emojis.length)
                              ],
                            })
                          }
                        >
                          <Casino />
                        </Button>
                        <Popover>
                          <PopoverTrigger>
                            <Button>Choose</Button>
                          </PopoverTrigger>
                          <PopoverContent className="max-w-96 max-h-96">
                            <ScrollShadow size={20}>
                              <div className="flex flex-wrap">
                                {emojis.map((e, i) => (
                                  <Button
                                    key={`emoji_${i}`}
                                    isIconOnly
                                    className="text-xl"
                                    size="sm"
                                    variant="light"
                                    onPress={() =>
                                      setEditedUser({ ...editedUser, icon: e })
                                    }
                                  >
                                    {e}
                                  </Button>
                                ))}
                              </div>
                            </ScrollShadow>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Username Color</td>
                    <td>
                      <div className="flex gap-2">
                        <Input
                          disabled
                          value={editedUser.username}
                          classNames={{
                            input: [
                              "text-md",
                              "font-bold",
                              getUsernameColor(editedUser.usernameColor),
                            ],
                          }}
                        />
                        <Dropdown>
                          <DropdownTrigger>
                            <Button>Choose</Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            {usernameColors.map((color) => (
                              <DropdownItem
                                key={`color_${color}`}
                                onPress={() =>
                                  setEditedUser({
                                    ...editedUser,
                                    usernameColor: color,
                                  })
                                }
                              >
                                <Username color={color}>
                                  {editedUser.username}
                                </Username>
                              </DropdownItem>
                            ))}
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Banner URL</td>
                    <td>
                      <Input
                        value={editedUser.bannerUrl}
                        onValueChange={(bannerUrl) =>
                          setEditedUser({ ...editedUser, bannerUrl })
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
