export interface Note {
  id: string;
  cityId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteFormData {
  content: string;
}
