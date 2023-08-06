import { NotesFormProps } from "../types/props/NotesFormProps";
import { NotesFormType } from "../types/enums/NotesFormType";
import { useForm } from "react-hook-form";
import { NotesFormInputs } from "../types/inputs/NotesFormInputs";
import { Note } from "../types/entites/Note";
import { useDispatch, useSelector } from "react-redux";
import { createNote, deleteNote, editNote } from "../store/slices/notesSlice";
import { RootState } from "../store/store";
import { hideOverlay } from "../helpers/overlayHandling";
import { useEffect } from "react";
import { NoteCategory } from "../types/enums/NoteCategory";

export default function NotesForm({ formType, formRef }: NotesFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<NotesFormInputs>();
  const clickedId = useSelector((state: RootState) => state.notes).clickedId;
  const notes = useSelector((state: RootState) => state.notes).notes;
  const dispatch = useDispatch();

  useEffect(() => {
    if (clickedId && formType === NotesFormType.Edit) {
      const currentIndex = notes.findIndex((note) => note.id === clickedId);
      setValue("name", notes[currentIndex]?.name);
      setValue("category", notes[currentIndex]?.category);
      setValue("content", notes[currentIndex]?.content);
    } else {
      setValue("name", "");
      setValue("category", NoteCategory.Task);
      setValue("content", "");
    }
  }, [clickedId, notes, setValue, formType]);

  function onSubmit(data: NotesFormInputs) {
    switch (formType) {
      case NotesFormType.Create:
        dispatch(createNote(data as Note));
        break;
      case NotesFormType.Edit:
        if (clickedId) {
          const editedNote: Note = {
            id: clickedId,
            archived: false,
            ...data,
          };
          dispatch(editNote(editedNote));
        }
        break;
    }
    if (formRef.current) hideOverlay(formRef.current);
  }
  function onDeleteClick() {
    if (clickedId) dispatch(deleteNote());
    if (formRef.current) hideOverlay(formRef.current);
  }
  switch (formType) {
    case NotesFormType.Delete:
      return (
        <div className="overlay-background" id="delete-form" ref={formRef}>
          <form action="">
            <h4>Do you really want to delete?</h4>
            <button
              type="button"
              className="default-button delete-confirm-button"
              onClick={onDeleteClick}
            >
              Delete
            </button>
          </form>
        </div>
      );
    default:
      let mainSelectorName: string;
      if (formType === NotesFormType.Create) {
        mainSelectorName = "create";
      } else {
        mainSelectorName = "edit";
      }
      return (
        <div
          className="overlay-background"
          id={`${mainSelectorName}-form`}
          ref={formRef}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="form-header">{`${mainSelectorName[0].toUpperCase()}${mainSelectorName.substring(
              1,
            )}`}</h2>
            <label htmlFor={`${mainSelectorName}-name-input`}>Name</label>
            <input type="text" {...register("name", { required: true })} />
            {errors.name && (
              <div className="error-block">Name field can't be empty</div>
            )}
            <label htmlFor={`${mainSelectorName}-category-select`}>
              Category
            </label>
            <select {...register("category", { required: true })}>
              <option value={NoteCategory.Task}>{NoteCategory.Task}</option>
              <option value={NoteCategory.RandomThought}>
                {NoteCategory.RandomThought}
              </option>
              <option value={NoteCategory.Idea}>{NoteCategory.Idea}</option>
            </select>
            {errors.category && (
              <div className="error-block">Category field can't be empty</div>
            )}
            <label htmlFor={`${mainSelectorName}-content-textarea`}>
              Content
            </label>
            <textarea
              {...register("content", { required: true })}
              cols={30}
              rows={10}
            ></textarea>
            {errors.content && (
              <div className="error-block">Content field can't be empty</div>
            )}
            <button type="submit" className="default-button">
              {formType === NotesFormType.Create ? "Create" : "Save"}
            </button>
          </form>
        </div>
      );
  }
}
