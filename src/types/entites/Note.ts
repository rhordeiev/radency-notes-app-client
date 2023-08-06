import { NoteCategory } from "../enums/NoteCategory";

export type Note = {
  id: number;
  name: string;
  created?: string;
  category: NoteCategory;
  content: string;
  dates?: string;
  archived: boolean;
};
