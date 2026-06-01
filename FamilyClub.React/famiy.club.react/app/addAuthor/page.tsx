"use client";

import { useRouter } from "next/navigation";
import { useAuthorForm } from "./hooks/useAuthorForm";
import { useAuthorImageUpload } from "./hooks/useAuthorImageUpload";
import { useSubmitAuthor } from "./hooks/useSubmitAuthor";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import ButtonReturn from "./ButtonReturn";

export default function AddAuthorPage() {
  const router = useRouter();
  const { form, setField } = useAuthorForm();
  const images = useAuthorImageUpload();
  const { handleSubmit, loading } = useSubmitAuthor({
    form,
    router,
    mainImage: images.mainImage,
  });

  return (
    <div
      className="w-full min-h-screen flex flex-col "
      style={{
        backgroundImage: "url('/images/addProducts/Rectangle 326.png')",
        backgroundSize: "cover",
      }}
    >
      <div
        className="relative w-[900px] ml-[16.7vw] -mt-[68px] mx-auto bg-no-repeat min-h-screen"
        style={{
          backgroundImage: "url('/images/addProducts/Rectangle 312.svg')",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="flex z-40 relative top-[130px] ml-[64px]">
          <ButtonReturn />
        </div>
        <div className="flex flex-col items-center mt-[80px]">
          <h1 className="text-[var(--color-black)] w-[800px] font-['Roboto_Mono'] font-bold text-[46px] leading-[150%] tracking-[-0.011em] text-center">
            Додати автора
          </h1>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="w-full flex justify-center ml-2 items-center">
            <div className="w-[485px] relative flex flex-col">
              <BasicInfoSection
                form={form}
                setField={setField}
                loading={loading}
                mainPreview={images.mainPreview}
                onMainChange={images.handleMainChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
