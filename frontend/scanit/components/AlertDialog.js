import { AlertDialog, Button } from "native-base";
import { useRef } from "react";

export default function AlertDialogComponent({ isOpen, onSubmit, onClose }) {
  const suspendAlertCancelRef = useRef(null);

  return (
    <AlertDialog
      leastDestructiveRef={suspendAlertCancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Suspend product</AlertDialog.Header>
        <AlertDialog.Body>
          This will suspend the product, preventing customers from scanning it.
          Are you sure?
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={onClose}
              ref={suspendAlertCancelRef}
            >
              Cancel
            </Button>
            <Button colorScheme="danger" onPress={onSubmit}>
              Confirm
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
