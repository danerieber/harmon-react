import api from "@/lib/api";
import { User } from "@/types/types";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Tooltip } from "@nextui-org/tooltip";
import { useState } from "react";

export default function Login({
  setSessionToken,
  setMyUserId,
  setMyUser,
}: {
  setSessionToken: (sessionToken: string) => void;
  setMyUserId: (userId: string) => void;
  setMyUser: (user: User) => void;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [registeredToken, setRegisteredToken] = useState<string | undefined>();
  const [copiedTooltipIsOpen, setCopiedTooltipIsOpen] = useState(false);
  const [token, setToken] = useState("");

  const [badInput, setBadInput] = useState(false);

  async function login() {
    const data = await api.login(token);
    if (!data) {
      setBadInput(true);
      setTimeout(() => setBadInput(false), 400);
      return;
    }
    const { sessionToken, userId, user } = data;
    setSessionToken(sessionToken);
    setMyUserId(userId);
    setMyUser(user);
  }

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <div className="flex flex-col w-full max-w-lg items-center gap-2">
          <h1>harmon.</h1>
          <h5 className="font-normal mb-5">
            the place to <strong>be</strong>
          </h5>
          <Input
            fullWidth
            autoFocus
            classNames={{ base: badInput ? "bad-input" : "" }}
            type="password"
            label="Token"
            value={token}
            onValueChange={setToken}
            onKeyDown={(e) => {
              if (e.key === "Enter") login();
            }}
          ></Input>
          <div className="flex w-full gap-2">
            <Button
              fullWidth
              onPress={async () => {
                const { token } = await api.register();
                setRegisteredToken(token);
                onOpen();
              }}
            >
              Register
            </Button>
            <Button fullWidth color="primary" onPress={login}>
              Login
            </Button>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="text-success">
            You have registered!
          </ModalHeader>
          <ModalBody>
            <p>
              This is your login token.{" "}
              <strong className="text-danger">Do not lose it.</strong> Your
              account will be unrecoverable if you lose your token.
            </p>
            <strong className="break-all font-mono text-primary">
              {registeredToken}
            </strong>
          </ModalBody>
          <ModalFooter>
            <Tooltip
              isOpen={copiedTooltipIsOpen}
              content="Copied to clipboard!"
            >
              <Button
                color="primary"
                onPress={() => {
                  navigator.clipboard.writeText(registeredToken || "");
                  setCopiedTooltipIsOpen(true);
                  setTimeout(() => setCopiedTooltipIsOpen(false), 1500);
                }}
              >
                Copy to Clipboard
              </Button>
            </Tooltip>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
