import { Note } from "../entites/Note";
import { Summary } from "../entites/Summary";

export type NotesSliceState = {
  currentId: number;
  clickedId: number | null;
  count: Summary;
  notes: Note[];
};
