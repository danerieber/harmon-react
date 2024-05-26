/* eslint-disable @next/next/no-img-element */
import { Modal, ModalBody, ModalContent } from "@nextui-org/modal";

export default function ImageModal({
  isOpen,
  onClose,
  imageSrc,
}: {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | undefined;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      scrollBehavior="inside"
      hideCloseButton={true}
    >
      <ModalContent className="bg-transparent shadow-none hover:cursor-pointer">
        {(_onClose) => (
          <>
            <ModalBody>
              <img
                className="object-contain overflow-hidden"
                src={imageSrc}
                alt="image"
                onClick={onClose}
              ></img>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
