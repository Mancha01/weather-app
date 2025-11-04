"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addNote, updateNote, deleteNote } from "@/store/notesSlice";
import { Card, Button } from "./ui";
import { Note } from "@/types/note";

interface NotesSectionProps {
  cityId: string;
}

export const NotesSection: React.FC<NotesSectionProps> = ({ cityId }) => {
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) =>
    state.notes.notes.filter((note: Note) => note.cityId === cityId)
  );

  const [isAdding, setIsAdding] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const handleAddNote = () => {
    if (!newNoteContent.trim()) return;

    dispatch(
      addNote({
        cityId,
        content: newNoteContent.trim(),
      })
    );

    setNewNoteContent("");
    setIsAdding(false);
  };

  const handleStartEdit = (note: Note) => {
    setEditingNoteId(note.id);
    setEditContent(note.content);
  };

  const handleSaveEdit = () => {
    if (!editingNoteId || !editContent.trim()) return;

    dispatch(
      updateNote({
        id: editingNoteId,
        content: editContent.trim(),
      })
    );

    setEditingNoteId(null);
    setEditContent("");
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditContent("");
  };

  const handleDeleteNote = (noteId: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNote(noteId));
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Notes</h2>
        {!isAdding && (
          <Button size="sm" onClick={() => setIsAdding(true)}>
            Add Note
          </Button>
        )}
      </div>

      {/* Add New Note */}
      {isAdding && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <textarea
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            placeholder="Write your note here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4}
            autoFocus
          />
          <div className="flex space-x-2 mt-2">
            <Button size="sm" onClick={handleAddNote}>
              Save
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setIsAdding(false);
                setNewNoteContent("");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Notes List */}
      {notes.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No notes yet. Add your first note about this city&apos;s weather.
        </p>
      ) : (
        <div className="space-y-4">
          {notes.map((note: Note) => (
            <div key={note.id} className="p-4 bg-gray-50 rounded-lg">
              {editingNoteId === note.id ? (
                <>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={4}
                    autoFocus
                  />
                  <div className="flex space-x-2 mt-2">
                    <Button size="sm" onClick={handleSaveEdit}>
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {note.content}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                    <span className="text-xs text-gray-500">
                      {new Date(note.updatedAt).toLocaleString()}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStartEdit(note)}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
