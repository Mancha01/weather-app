import notesReducer, {
  addNote,
  updateNote,
  deleteNote,
  loadNotes,
} from "../notesSlice";
import type { Note } from "@/types/note";

describe("notesSlice", () => {
  const initialState = {
    notes: [],
  };

  const mockNote: Note = {
    id: "note-1",
    cityId: "city-1",
    content: "Test note",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  it("should return the initial state", () => {
    expect(notesReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should add a note", () => {
    const actual = notesReducer(initialState, addNote(mockNote));
    expect(actual.notes).toHaveLength(1);
    expect(actual.notes[0]).toEqual(mockNote);
  });

  it("should update a note", () => {
    const stateWithNote = {
      notes: [mockNote],
    };
    const updatedContent = "Updated note content";
    const actual = notesReducer(
      stateWithNote,
      updateNote({ id: mockNote.id, content: updatedContent })
    );
    expect(actual.notes[0].content).toBe(updatedContent);
    expect(actual.notes[0].updatedAt).toBeGreaterThan(mockNote.updatedAt);
  });

  it("should delete a note", () => {
    const stateWithNote = {
      notes: [mockNote],
    };
    const actual = notesReducer(stateWithNote, deleteNote(mockNote.id));
    expect(actual.notes).toHaveLength(0);
  });

  it("should load notes from storage", () => {
    const notes = [mockNote, { ...mockNote, id: "note-2" }];
    const actual = notesReducer(initialState, loadNotes(notes));
    expect(actual.notes).toEqual(notes);
  });
});
