import { ImageUploadState } from "@/app/(user-site)/addProduct/types";
import { ImageUploadSlot } from "@/app/(user-site)/addProduct/ui/ImageUploadSlot";

type Props = {
  images: ImageUploadState;
};

export function ImageUploadSection({ images }: Props) {
  return (
    <>
      <div className="flex justify-center items-center">
        <p className="font-['Roboto_Mono'] font-bold text-[34px] leading-[150%] tracking-[-0.011em] text-center">
          Головне фото
        </p>
      </div>

      <ImageUploadSlot
        preview={images.mainPreview}
        onChange={images.handleMainChange}
        height="h-[346px]"
        width="w-[260px]"
        ellipseSize="w-[106px] h-[106px]"
        iconSize="w-[56px] h-[56px]"
        titleMt="-mt-[20px]"
        titleMl="ml-[20px]"
      />

      <div className="h-[540px] flex relative -mt-4 flex-col items-center">
        <p className="font-['Roboto_Mono'] font-bold text-[18px] leading-[150%] tracking-[-0.011em] text-center mb-4">
          Додаткові фото
        </p>
        <div className="grid grid-cols-2 gap-[34px]">
          {images.gallery.map((item, index) => (
            <ImageUploadSlot
              key={index}
              preview={item ? URL.createObjectURL(item) : null}
              onChange={(file) => images.handleGalleryChange(index, file)}
              height="h-[169px]"
              width="w-[110px]"
              ellipseSize="w-[46px] h-[46px]"
              iconSize="w-[32px] h-[32px]"
            />
          ))}
        </div>
      </div>
    </>
  );
}
