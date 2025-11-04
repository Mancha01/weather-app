import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../types/note";
import { getNotes, setNotes } from "../utils/storage";

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: getNotes(),
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (
      state,
      action: PayloadAction<Omit<Note, "id" | "createdAt" | "updatedAt">>
    ) => {
      const newNote: Note = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      state.notes.push(newNote);
      setNotes(state.notes);
    },
    updateNote: (
      state,
      action: PayloadAction<{ id: string; content: string }>
    ) => {
      const note = state.notes.find((n) => n.id === action.payload.id);
      if (note) {
        note.content = action.payload.content;
        note.updatedAt = new Date();
        setNotes(state.notes);
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      setNotes(state.notes);
    },
    setNotesList: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
      setNotes(state.notes);
    },
  },
});

export const { addNote, updateNote, deleteNote, setNotesList } =
  notesSlice.actions;
export default notesSlice.reducer;
