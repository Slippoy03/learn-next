import dynamic from "next/dynamic";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Card,
  Heading,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import AddEditModal from "./AddEditModal.js";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes({ initialNotes }) {
  const router = useRouter();
  const toast = useToast();

  const [notes, setNotes] = useState(initialNotes);

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAdd = () => {
    setIsEditing(false);
    setSelectedNote(null);
    onEditOpen();
  };

  const handleEdit = (note) => {
    setIsEditing(true);
    setSelectedNote(note);
    onEditOpen();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notes/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (result?.success) {
        toast({
          title: "Note deleted failed successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "left",
        });
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      } else {
        toast({
          title: "Note deleted successfully failed",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast({
        title: "An error occurred while deleting the note.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDeleteConfirmed = async () => {
    if (selectedNote) {
      await handleDelete(selectedNote.id); 
      onDeleteClose();
    }
  };

  const confirmDelete = (id) => {
    setSelectedNote({ id }); 
    onDeleteOpen();
  };

  const handleSaveNote = (savedNote) => {
    if (isEditing) {
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === savedNote.id ? savedNote : note))
      );
    } else {
      setNotes([...notes, savedNote]);
    }
    onEditClose();
  };

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <Box padding="5">
          <Flex justifyContent="end">
            <Button colorScheme="blue" onClick={handleAdd}>
              Add fren
            </Button>
          </Flex>
          <Grid templateColumns="repeat(3, 1fr)" gap={5}>
            {notes?.map((note) => (
              <GridItem key={note?.id}>
                <Card>
                  <Heading>{note?.title}</Heading>
                  <Text>{note?.description}</Text>
                  <Button onClick={() => handleEdit(note)}>Edith</Button>
                  <Button
                    colorScheme="red"
                    onClick={() => confirmDelete(note.id)}
                  >
                    Delete
                  </Button>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Box>

        <AddEditModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          note={selectedNote}
          isEditing={isEditing}
          onSave={handleSaveNote}
        />

        <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} zIndex="1400">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delet Confirmation</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Yakin dek?</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={handleDeleteConfirmed}>
                YES! YES! YES!
              </Button>
              <Button variant="ghost" onClick={onDeleteClose}>
                NO! NO! NO!
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </LayoutComponent>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}notes`);
  const notes = await res.json();

  return {
    props: {
      initialNotes: notes.data,
    },
  };
}
