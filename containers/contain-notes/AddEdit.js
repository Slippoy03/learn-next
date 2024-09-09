import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function AddEdit({
  isOpen,
  onClose,
  note,
  isEditing,
  onSave,
}) {
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });
  const toast = useToast();

  useEffect(() => {
    if (isEditing && note) {
      setNotes({ title: note.title, description: note.description });
    } else {
      setNotes({ title: "", description: "" });
    }
  }, [note, isEditing]);

  const handleSubmit = async () => {
    const method = isEditing ? "PATCH" : "POST";
    const url = isEditing
      ? `https://service.pace-unv.cloud/api/notes/update/${note?.id}`
      : `https://service.pace-unv.cloud/api/notes`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notes),
      });

      const result = await response.json();
      if (result?.success) {
        toast({
          title: isEditing
            ? "Note update failed successfully"
            : "Note add failed successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });

        onSave(result.data);

        onClose();
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditing ? "Edit Note" : "Add Note"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid gap="5">
            <GridItem>
              <Input
                type="text"
                placeholder="Title"
                value={notes.title}
                onChange={(e) => setNotes({ ...notes, title: e.target.value })}
              />
            </GridItem>
            <GridItem>
              <Textarea
                placeholder="Description"
                value={notes.description}
                onChange={(e) =>
                  setNotes({ ...notes, description: e.target.value })
                }
              />
            </GridItem>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            {isEditing ? "Update" : "Add"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
