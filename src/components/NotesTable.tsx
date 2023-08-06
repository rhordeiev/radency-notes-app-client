import React, { useContext } from "react";
import { NotesTableProps } from "../types/props/NotesTableProps";
import { TableType } from "../types/enums/TableType";
import { Note } from "../types/entites/Note";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { showOverlay } from "../helpers/overlayHandling";
import { OverlayContext } from "../contexts/OverlayContext";
import {
  archiveNote,
  setClickedId,
  unarchiveNote,
} from "../store/slices/notesSlice";
import "../styles/table.css";

export default function NotesTable({ tableType }: NotesTableProps) {
  const overlays = useContext(OverlayContext);
  const notes: Note[] = useSelector((state: RootState) => state.notes).notes;
  const count = useSelector((state: RootState) => state.notes).count;
  const dispatch = useDispatch();

  const tableHeadRow = (
    <tr>
      <th>Name</th>
      <th>Created</th>
      <th>Category</th>
      <th>Content</th>
      <th>Dates</th>
      <th>Actions</th>
    </tr>
  );
  function getNoteRowTds(note: Note) {
    return (
      <>
        <td>{note.name}</td>
        <td>{note.created}</td>
        <td>{note.category}</td>
        <td>{note.content}</td>
        <td>{note.dates}</td>
      </>
    );
  }
  function onEditClick(noteId: number) {
    if (overlays.editOverlay.current) showOverlay(overlays.editOverlay.current);
    dispatch(setClickedId(noteId));
  }
  function onDeleteClick(noteId: number) {
    if (overlays.deleteOverlay.current)
      showOverlay(overlays.deleteOverlay.current);
    dispatch(setClickedId(noteId));
  }
  function onArchiveClick(noteId: number) {
    dispatch(archiveNote(noteId));
  }
  function onUnarchiveClick(noteId: number) {
    dispatch(unarchiveNote(noteId));
  }

  switch (tableType) {
    case TableType.Main:
      const currentNotes = notes.filter((note) => !note.archived);
      const currentNotesRows = currentNotes.map((note) => (
        <tr id={`note-${note.id}`} key={`note-${note.id}`}>
          {getNoteRowTds(note)}
          <td>
            <button
              className="archive-button"
              onClick={() => onArchiveClick(note.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="36"
                viewBox="0 -960 960 960"
                width="36"
              >
                <path d="M180-120q-24 0-42-18t-18-42v-523q0-15 3-25.5t11-19.5l56-76q8-9 18.5-12.5t24.886-3.5h493.228Q741-840 751-836.5t18 12.5l57 76q8 9 11 19.5t3 25.5v523q0 24-18 42t-42 18H180Zm17-614h565l-36.409-46H233l-36 46Zm-17 554h600v-494H180v494Zm300.133-102Q486-282 491-284q5-2 10-7l115-115q8-7.822 8-19.911Q624-438 616.143-446q-7.857-8-20-8T576-446l-66 66v-171q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T450-551v171l-66-66q-7.822-8-19.911-8Q352-454 344-446.143q-8 7.857-8 20T344-406l115 115q5 5 10.133 7 5.134 2 11 2ZM180-180v-494 494Z" />
              </svg>
            </button>
            <button
              className="edit-button"
              onClick={() => onEditClick(note.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="36"
                viewBox="0 -960 960 960"
                width="36"
              >
                <path d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l41.823-41.823Q725-853 750.5-852.5T793-835l43 43q17 17 17 42t-16.963 41.963L794-666ZM150.327-120q-12.889 0-21.608-8.714Q120-137.429 120-150.311v-85.627Q120-242 122-247q2-5 7-10l495-495 128 128-495 495q-5 5-10.217 7-5.218 2-10.783 2h-85.673ZM645-645l-22-22 44 44-22-22Z" />
              </svg>
            </button>
            <button
              className="delete-button"
              onClick={() => onDeleteClick(note.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="36"
                viewBox="0 -960 960 960"
                width="36"
              >
                <path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-11q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T190-810h158q0-13 8.625-21.5T378-840h204q12.75 0 21.375 8.625T612-810h158q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T770-750h-11v570q0 24.75-17.625 42.375T699-120H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" />
              </svg>
            </button>
          </td>
        </tr>
      ));
      return (
        <table id="current-notes-table">
          <thead>{tableHeadRow}</thead>
          <tbody>{currentNotesRows}</tbody>
        </table>
      );
    case TableType.Archived:
      const archivedNotes = notes.filter((note) => note.archived);
      const archivedNotesRows = archivedNotes.map((note) => (
        <tr id={`note-${note.id}`} key={`note-${note.id}`}>
          {getNoteRowTds(note)}
          <td>
            <button
              className="unarchive-button"
              onClick={() => onUnarchiveClick(note.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="36"
                viewBox="0 -960 960 960"
                width="36"
              >
                <path d="M180-120q-24 0-42-18t-18-42v-523q0-12.923 3-24.462Q126-739 134-748l56-76q8-9 19.5-12.5T233-840h494q12 0 23 3.5t19 12.5l57 76q8 9 11 20.538 3 11.539 3 24.462v523q0 24-18 42t-42 18H180Zm17-614h565l-36.409-46H233l-36 46Zm-17 554h600v-494H180v494Zm300.175-98q12.825 0 21.325-8.625T510-308v-165l62 62q9 9 21.5 8.5T615-412q9-9 9-21.5t-9-21.5L501-568q-5-5-10.133-7-5.134-2-11-2Q474-577 469-575q-5 2-10 7L345-454q-9 9-8.5 21t9.5 21q9 9 21.5 9t21.5-9l61-61v165q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625ZM180-180v-494 494Z" />
              </svg>
            </button>
          </td>
        </tr>
      ));
      return (
        <table id="archived-notes-table">
          <thead>{tableHeadRow}</thead>
          <tbody>{archivedNotesRows}</tbody>
        </table>
      );
    default:
      return (
        <table id="summary-table">
          <thead>
            <tr>
              <th>Note category</th>
              <th>Active</th>
              <th>Archived</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Task</td>
              <td>{count.active.task}</td>
              <td>{count.archived.task}</td>
            </tr>
            <tr>
              <td>Random Thought</td>
              <td>{count.active.randomThought}</td>
              <td>{count.archived.randomThought}</td>
            </tr>
            <tr>
              <td>Idea</td>
              <td>{count.active.idea}</td>
              <td>{count.archived.idea}</td>
            </tr>
          </tbody>
        </table>
      );
  }
}
