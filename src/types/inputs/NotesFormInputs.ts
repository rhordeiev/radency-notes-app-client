import {NoteCategory} from "../enums/NoteCategory";

export type NotesFormInputs = {
  name: string;
  category: NoteCategory;
  content: string;
};
