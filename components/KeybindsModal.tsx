import { Kbd } from "@nextui-org/kbd";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

export default function KeybindsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs" scrollBehavior="inside">
      <ModalContent>
        {(_onClose) => (
          <>
            <ModalHeader className="text-lg">Keybinds</ModalHeader>
            <ModalBody>
              <ScrollShadow size={20}>
                <div className="flex flex-col text-sm [&>strong]:text-default-500 [&>strong]:text-xs [&>strong]:text-center [&>table]:border-none [&_*]:border-none [&_td:nth-child(1)]:pr-2 [&_td:nth-child(1)]:w-80% [&_td:nth-child(2)]:text-right">
                  <strong>Input</strong>
                  <table>
                    <tbody>
                      <tr>
                        <td>Insert/edit message</td>
                        <td>
                          <Kbd>i</Kbd>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <strong>Messages</strong>
                  <table>
                    <tbody>
                      <tr>
                        <td>Page Down</td>
                        <td>
                          <Kbd keys={["ctrl"]}>d</Kbd>
                        </td>
                      </tr>
                      <tr>
                        <td>Page Up</td>
                        <td>
                          <Kbd keys={["ctrl"]}>u</Kbd>
                        </td>
                      </tr>
                      <tr>
                        <td>Scroll Down</td>
                        <td>
                          <Kbd>j</Kbd>
                        </td>
                      </tr>
                      <tr>
                        <td>Scroll Up</td>
                        <td>
                          <Kbd>k</Kbd>
                        </td>
                      </tr>
                      <tr>
                        <td>Go to Page Start</td>
                        <td>
                          <Kbd>gg</Kbd>
                        </td>
                      </tr>
                      <tr>
                        <td>Go to Page End</td>
                        <td>
                          <Kbd>G</Kbd> / <Kbd>ge</Kbd>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <strong>Call</strong>
                  <table>
                    <tbody>
                      <tr>
                        <td>Join Call</td>
                        <td>
                          <Kbd>v</Kbd>
                        </td>
                      </tr>
                      <tr>
                        <td>End/Decline Call</td>
                        <td>
                          <Kbd>b</Kbd>
                        </td>
                      </tr>
                      <tr>
                        <td>Mute</td>
                        <td>
                          <Kbd>n</Kbd>
                        </td>
                      </tr>
                      <tr>
                        <td>Deafen</td>
                        <td>
                          <Kbd>m</Kbd>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <strong>Status</strong>
                  <table>
                    <tbody>
                      <tr>
                        <td>Edit Status</td>
                        <td>
                          <Kbd>s</Kbd>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <strong>Settings</strong>
                  <table>
                    <tbody>
                      <tr>
                        <td>Open Settings</td>
                        <td>
                          <Kbd>S</Kbd>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <strong>Help</strong>
                  <table>
                    <tbody>
                      <tr>
                        <td>Show Keybinds</td>
                        <td>
                          <Kbd>?</Kbd>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ScrollShadow>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
