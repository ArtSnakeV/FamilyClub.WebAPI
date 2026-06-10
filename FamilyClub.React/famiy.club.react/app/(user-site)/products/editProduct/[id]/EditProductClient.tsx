"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useProductData } from "@/app/(user-site)/products/addProduct/hooks/useProductData";
import { useImageUpload } from "@/app/(user-site)/products/addProduct/hooks/useImageUpload";
import { BasicInfoSection } from "@/app/(user-site)/products/addProduct/sections/BasicInfoSection";
import { CharacteristicsSection } from "@/app/(user-site)/products/addProduct/sections/CharacteristicsSection";
import { GenresSection } from "@/app/(user-site)/products/addProduct/sections/GenresSection";
import { ImageUploadSection } from "@/app/(user-site)/products/addProduct/sections/ImageUploadSection";
import { SaleSection } from "@/app/(user-site)/products/addProduct/sections/SaleSection";
import { useISBNLookup } from "@/app/(user-site)/products/addProduct/hooks/useISBNLookup";
import useEditForm from "./hooks/useEditForm";
import useSubmitEdit from "./hooks/useSubmitEdit";

export default function EditProductClient({ id }: { id: string }) {
  const router = useRouter();
  const productId = Number(id);
  const {
    form,
    setField,
    toggleCategory,
    loading: formLoading,
  } = useEditForm(productId);
  const data = useProductData();
  const images = useImageUpload();
  const { handleSubmit, loading } = useSubmitEdit({
    id: productId,
    form,
    images,
    router,
  });
  const { isbnLoading, handleIsbnLookup } = useISBNLookup({ form, setField });
  const toImageSrc = (img: { imageData: string }) => {
    if (!img?.imageData) return "";

    if (img.imageData.startsWith("UklGR")) {
      return `data:image/webp;base64,${img.imageData}`;
    }

    return `data:image/jpeg;base64,${img.imageData}`;
  };
  useEffect(() => {
    document.body.style.backgroundImage =
      "url('/images/addProducts/Rectangle 326.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundAttachment = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
    };
  }, []);

 useEffect(() => {
  if (!form.productImages?.length) return;

  const imgs = form.productImages;

  images.setMainPreview(toImageSrc(imgs[0]));

  images.setGalleryPreviews([
    imgs[1] ? toImageSrc(imgs[1]) : null,
    imgs[2] ? toImageSrc(imgs[2]) : null,
    imgs[3] ? toImageSrc(imgs[3]) : null,
  ]);
}, [form.productImages]);

  if (formLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-[var(--color-black)] text-[24px]">Завантаження...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div
        className="relative w-[900px] pb-[60px] ml-[16.8vw] -mt-[68px] mx-auto bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/addProducts/Rectangle 312.svg')",
        }}
      >
        <div className="flex flex-col items-center mt-[100px]">
          <h1 className="text-[var(--color-black)] w-[600px] font-['Roboto_Mono'] font-bold text-[44px] leading-[150%] tracking-[-0.011em] text-center">
            Редагувати книгу
          </h1>
          <p className="text-[var(--color-black)] -mt-2 font-sans font-normal text-[22px] leading-[150%] tracking-[-0.011em] text-center">
            Змінити інформацію
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="w-full flex mt-[30px] gap-[4vw] relative z-10 justify-center">
            <div className="w-[450px] flex flex-col">
              <BasicInfoSection
                form={form}
                setField={setField}
                authors={data.authors}
                publishers={data.publishers}
                loading={loading}
                onIsbnLookup={handleIsbnLookup}
                isbnLoading={isbnLoading}
              />
              <CharacteristicsSection
                form={form}
                setField={setField}
                languages={data.languages}
                formats={data.formats}
                bookSizes={data.bookSizes}
                ageRestrictions={data.ageRestrictions}
              />
              <GenresSection
                categories={data.categories}
                selectedIds={form.categoryIds}
                onToggle={toggleCategory}
              />
            </div>

            <div className="w-[300px] flex flex-col mt-1 relative left-3 gap-[40px]">
              <ImageUploadSection images={images} />
              <SaleSection
                form={form}
                setField={setField}
                loading={loading}
                onPublish={handleSubmit}
                onSaveDraft={() => {}}
                onCancel={() => router.push(`/products/${id}`)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
