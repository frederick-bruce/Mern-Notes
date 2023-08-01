import { Button, Form, Modal } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { Note } from "../models/note";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import TextInputField from "./form/TextInputField";
import useSpeechRecognition from "../hooks/useSpeechRecognition";

interface AddEditNoteDialogProps {
  noteToEdit?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

const AddEditNoteDialog = ({
  noteToEdit,
  onDismiss,
  onNoteSaved,
}: AddEditNoteDialogProps) => {
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    getValues,
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await NotesApi.createNote(input);
      }
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  function handleSpeakText(): void {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = getValues("text") || "";
    window.speechSynthesis.speak(utterance);
  }

  const { transcript, startRecognition, stopRecognition } =
    useSpeechRecognition();

  const handleStartSpeechToText = () => {
    startRecognition();
    setValue("text", transcript);
  };

  const handleStopSpeechToText = () => {
    stopRecognition();
  };

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? "Edit note" : "Add note"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="title"
            label="Title"
            type="text"
            placeholder="Title"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.title}
          />

          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <TextInputField
                name="text"
                label="Text"
                as="textarea"
                rows={5}
                placeholder="Text"
                register={register}
                value={field.value || transcript} // Using the transcript as the value
                onChange={(e: { target: { value: any } }) =>
                  field.onChange(e.target.value)
                }
              />
            )}
          />
        </Form>
        <div>
          <Button
            className="m-2"
            type="button"
            onClick={handleStartSpeechToText}
          >
            Start Speech to Text
          </Button>
          <Button type="button" onClick={handleStopSpeechToText}>
            Stop Speech to Text
          </Button>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button type="button" onClick={handleSpeakText}>
          Speak Text
        </Button>
        <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditNoteDialog;

// import { Button, Form, Modal } from "react-bootstrap";
// import { useForm, Controller } from "react-hook-form";
// import { Note } from "../models/note";
// import { NoteInput } from "../network/notes_api";
// import * as NotesApi from "../network/notes_api";
// import TextInputField from "./form/TextInputField";
// import useSpeechRecognition from "../hooks/useSpeechToText";

// interface AddEditNoteDialogProps {
//   noteToEdit?: Note;
//   onDismiss: () => void;
//   onNoteSaved: (note: Note) => void;
// }

// const AddEditNoteDialog = ({
//   noteToEdit,
//   onDismiss,
//   onNoteSaved,
// }: AddEditNoteDialogProps) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     control,
//   } = useForm<NoteInput>({
//     defaultValues: {
//       title: noteToEdit?.title || "",
//       text: noteToEdit?.text || "",
//     },
//   });

//   const transcript = useSpeechRecognition();

//   async function onSubmit(input: NoteInput) {
//     try {
//       let noteResponse: Note;
//       if (noteToEdit) {
//         noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
//       } else {
//         noteResponse = await NotesApi.createNote(input);
//       }
//       onNoteSaved(noteResponse);
//     } catch (error) {
//       console.error(error);
//       alert(error);
//     }
//   }

//   function handleSpeakText(
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>
//   ): void {
//     throw new Error("Function not implemented.");
//   }

//   return (
//     <Modal show onHide={onDismiss}>
//       <Modal.Header closeButton>
//         <Modal.Title>{noteToEdit ? "Edit note" : "Add note"}</Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
//                <TextInputField
//                  name="title"
//                      label="Title"
//                     type="text"
//                      placeholder="Title"
//                      register={register}
//                      registerOptions={{ required: "Required" }}
//                      error={errors.title}
//                    />

//                    <TextInputField
//                      name="text"
//                      label="Text"
//                      as="textarea"
//                      rows={5}
//                      placeholder="Text"
//                      register={register}
//                    />
//         </Form>

//              <Controller
//             name="text"
//             control={control}
//             render={({ field }) => (
//               <TextInputField
//                 name="text"
//                 label="Text"
//                 as="textarea"
//                 rows={5}
//                 placeholder="Text"
//                 register={register}
//                 value={field.value || transcript} // Using the transcript as the value
//                 onChange={(e: { target: { value: any } }) =>
//                   field.onChange(e.target.value)
//                 }
//               />
//             )}
//           />
//           <TextInputField
//             name="title"
//             label="Title"
//             type="text"
//             placeholder="Title"
//             register={register}
//             registerOptions={{ required: "Required" }}
//             error={errors.title}
//           />

//           <TextInputField
//             name="text"
//             label="Text"
//             as="textarea"
//             rows={5}
//             placeholder="Text"
//             register={register}
//           />

//         </Modal.Body>

//         </Form>
//       </Modal.Body>

//       <Modal.Footer>
//         <Button type="button" onClick={handleSpeakText}>
//           Speak Text
//         </Button>
//         <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
//           Save
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default AddEditNoteDialog;

// import { Button, Form, Modal } from "react-bootstrap";
// import { useForm } from "react-hook-form";
// import { Note } from "../models/note";
// import { NoteInput } from "../network/notes_api";
// import * as NotesApi from "../network/notes_api";
// import TextInputField from "./form/TextInputField";

// interface AddEditNoteDialogProps {
//   noteToEdit?: Note;
//   onDismiss: () => void;
//   onNoteSaved: (note: Note) => void;
// }

// const AddEditNoteDialog = ({
//   noteToEdit,
//   onDismiss,
//   onNoteSaved,
// }: AddEditNoteDialogProps) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     watch,
//   } = useForm<NoteInput>({
//     defaultValues: {
//       title: noteToEdit?.title || "",
//       text: noteToEdit?.text || "",
//     },
//   });

//   const textToSpeak = watch("text");

//   async function onSubmit(input: NoteInput) {
//     try {
//       let noteResponse: Note;
//       if (noteToEdit) {
//         noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
//       } else {
//         noteResponse = await NotesApi.createNote(input);
//       }
//       onNoteSaved(noteResponse);
//     } catch (error) {
//       console.error(error);
//       alert(error);
//     }
//   }

//   const handleSpeakText = () => {
//     const speechSynthesis = window.speechSynthesis;
//     const utterance = new SpeechSynthesisUtterance(textToSpeak);
//     speechSynthesis.speak(utterance);
//   };

//   return (
//     <Modal show onHide={onDismiss}>
//       <Modal.Header closeButton>
//         <Modal.Title>{noteToEdit ? "Edit note" : "Add note"}</Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
//           <TextInputField
//             name="title"
//             label="Title"
//             type="text"
//             placeholder="Title"
//             register={register}
//             registerOptions={{ required: "Required" }}
//             error={errors.title}
//           />

//           <TextInputField
//             name="text"
//             label="Text"
//             as="textarea"
//             rows={5}
//             placeholder="Text"
//             register={register}
//           />
//         </Form>
//       </Modal.Body>

//       <Modal.Footer>
//         <Button type="button" onClick={handleSpeakText}>
//           Speak Text
//         </Button>
//         <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
//           Save
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default AddEditNoteDialog;
