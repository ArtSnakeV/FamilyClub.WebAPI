
export type AuthorDto = {
  authorName: string;
  biography?: string;  
  photoUrl?: string; 
};

export type ImageUploadState = {
  mainImage: File | null;
  mainPreview: string | null;
  handleMainChange: (file: File | null) => void;
};