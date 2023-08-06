import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../../types/entites/Note";
import { NotesSliceState } from "../../types/states/NotesSliceState";
import { NoteCategory } from "../../types/enums/NoteCategory";
import { Summary } from "../../types/entites/Summary";

const initialState: NotesSliceState = {
  currentId: 8,
  clickedId: null,
  count: {
    active: {
      task: 0,
      randomThought: 0,
      idea: 0,
    },
    archived: {
      task: 0,
      randomThought: 0,
      idea: 0,
    },
  },
  notes: [
    {
      id: 1,
      name: "Note 1",
      category: NoteCategory.Task,
      content: "Need to check my application on 28/07/2023 and 29/07/2023",
      archived: false,
    },
    {
      id: 2,
      name: "Note 2",
      category: NoteCategory.RandomThought,
      content: "I must try turkish tangerines",
      archived: false,
    },
    {
      id: 3,
      name: "Note 3",
      category: NoteCategory.Idea,
      content:
        "I need to follow code style guidelines to improve code readability",
      archived: false,
    },
    {
      id: 4,
      name: "Note 4",
      category: NoteCategory.RandomThought,
      content: "I must try pink watermelon",
      archived: false,
    },
    {
      id: 5,
      name: "Note 5",
      category: NoteCategory.Idea,
      content:
        "I need to follow code style guidelines to improve code readability",
      archived: false,
    },
    {
      id: 6,
      name: "Note 6",
      category: NoteCategory.Task,
      content: "Need to check my application on 01/09/2024 and 03/09/2024",
      archived: false,
    },
    {
      id: 7,
      name: "Note 7",
      category: NoteCategory.RandomThought,
      content: "I must try yellow tomatoes",
      archived: false,
    },
  ],
};

function prepareData(note: Note): Note {
  if (!note.created) {
    const today = new Date(Date.now());
    const todayDay =
      today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`;
    const todayMonth =
      today.getMonth() + 1 > 9
        ? today.getMonth() + 1
        : `0${today.getMonth() + 1}`;
    const todayYear = today.getFullYear();
    note.created = `${todayDay}\\${todayMonth}\\${todayYear}`;
  }
  const foundDates = note.content.match(
    /(0?[1-9]|[12][0-9]|3[01])\/((0?[1-9]|1[012])\/(19|20)?[0-9]{2})/gm,
  );
  note.dates = foundDates?.join(", ") || "";
  return note;
}

function getIndexByNoteId(notes: Note[], noteId: number): number {
  return notes.findIndex((note) => note.id === noteId);
}

function calculateSummary(notes: Note[], count: Summary): void {
  count.active.task = 0;
  count.active.randomThought = 0;
  count.active.idea = 0;
  count.archived.task = 0;
  count.archived.randomThought = 0;
  count.archived.idea = 0;

  notes.forEach((note) => {
    switch (note.category) {
      case NoteCategory.Task:
        if (note.archived) count.archived.task++;
        else count.active.task++;
        break;
      case NoteCategory.RandomThought:
        if (note.archived) count.archived.randomThought++;
        else count.active.randomThought++;
        break;
      default:
        if (note.archived) count.archived.idea++;
        else count.active.idea++;
    }
  });
}

initialState.notes = initialState.notes.map((note) => prepareData(note));
calculateSummary(initialState.notes, initialState.count);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setClickedId: (state, action: PayloadAction<number>) => {
      state.clickedId = action.payload;
    },
    createNote: (state, action: PayloadAction<Note>) => {
      const preparedNote = prepareData(action.payload);
      state.notes.push({
        id: state.currentId,
        name: preparedNote.name,
        created: preparedNote.created,
        category: preparedNote.category,
        content: preparedNote.content,
        dates: preparedNote.dates,
        archived: false,
      });
      state.currentId++;
      calculateSummary(state.notes, state.count);
    },
    editNote: (state, action: PayloadAction<Note>) => {
      state.notes[getIndexByNoteId(state.notes, action.payload.id)] =
        prepareData(action.payload);
      calculateSummary(state.notes, state.count);
    },
    deleteNote: (state) => {
      state.notes = state.notes.filter((note) => note.id !== state.clickedId);
      calculateSummary(state.notes, state.count);
    },
    archiveNote: (state, action: PayloadAction<number>) => {
      state.notes[getIndexByNoteId(state.notes, action.payload)].archived =
        true;
      calculateSummary(state.notes, state.count);
    },
    unarchiveNote: (state, action: PayloadAction<number>) => {
      state.notes[getIndexByNoteId(state.notes, action.payload)].archived =
        false;
      calculateSummary(state.notes, state.count);
    },
  },
});

export const {
  setClickedId,
  createNote,
  editNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} = notesSlice.actions;
export default notesSlice;
