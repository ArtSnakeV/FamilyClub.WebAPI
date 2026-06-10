import { useState } from "react";

export function useAuthorImageUpload() {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainPreview, setMainPreview] = useState<string | null>(null);

  const handleMainChange = (file: File | null) => {
    if (!file) return;
    setMainImage(file);
    setMainPreview(URL.createObjectURL(file));
  };

  return { mainImage, mainPreview, handleMainChange };
}