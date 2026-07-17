"use client";

import { useRouter } from "next/navigation";
import { useAuthorForm } from "./hooks/useAuthorForm";
import { useAuthorImageUpload } from "./hooks/useAuthorImageUpload";
import { useSubmitAuthor } from "./hooks/useSubmitAuthor";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import ButtonReturn from "./ui/ButtonReturn";

export default function AddAuthorPage() {
  const router = useRouter();
  const { form, setField } = useAuthorForm();
  const images = useAuthorImageUpload();
  const { handleSubmit, loading } = useSubmitAuthor({ form, router, mainImage: images.mainImage });

  return (
    <div
      className="w-full min-h-screen overflow-hidden relative m-0 p-0 flex flex-col"
      style={{
        backgroundImage: "url('/images/authorPageAdmin/Rectangle 326.png')",
        backgroundSize: "100% 100%",
      }}
    >
      <div
        className="relative w-[1200px] pb-[60px] -mt-[68px] mx-auto bg-no-repeat"
        style={{
          backgroundImage: "url('/images/addProducts/Rectangle 312.svg')",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="flex z-20 relative top-[130px] ml-[64px]">
          <ButtonReturn />
        </div>
        <div className="flex flex-col items-center mt-[120px]">
          <h1 className="text-[var(--color-black)] w-[800px] font-['Roboto_Mono'] font-bold text-[34px] leading-[150%] tracking-[-0.011em] text-center">
            Додати автора
          </h1>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="w-full flex mt-[48px] gap-[4vw] justify-center">
            <div className="w-[645px] flex flex-col">
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
    </div >
  );
}
