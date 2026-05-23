import { ImageUploadState } from "@/app/addProduct/types";
import { ImageUploadSlot } from "@/app/addProduct/ui/ImageUploadSlot";

type Props = {
  images: ImageUploadState;
};

export function ImageUploadSection({ images }: Props) {
  return (
    <>
      <div className="flex justify-center items-center">
        <p className="font-['Roboto_Mono'] font-bold text-[48px] leading-[150%] tracking-[-0.011em] text-center">
          Головне фото
        </p>
      </div>

      <ImageUploadSlot
        preview={images.mainPreview}
        onChange={images.handleMainChange}
        height="h-[482px]"
        ellipseSize="w-[146px] h-[146px]"
        iconSize="w-[88px] h-[88px]"
      />

      <div className="h-[540px] flex flex-col items-center">
        <p className="font-['Roboto_Mono'] font-bold text-[24px] leading-[150%] tracking-[-0.011em] text-center mb-4">
          Додаткові фото
        </p>
        <div className="grid grid-cols-2 gap-[46px]">
          {images.gallery.map((item, index) => (
            <ImageUploadSlot
              key={index}
              preview={item ? URL.createObjectURL(item) : null}
              onChange={(file) => images.handleGalleryChange(index, file)}
              height="h-[213px]"
              width="w-[158px]"
               ellipseSize="w-[64px] h-[64px]"
              iconSize="w-[38px] h-[38px]"
            />
          ))}
        </div>
      </div>
    </>
  );
}
