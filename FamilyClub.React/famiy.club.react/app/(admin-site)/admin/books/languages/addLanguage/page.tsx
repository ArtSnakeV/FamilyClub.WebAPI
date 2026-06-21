"use client";

import { useRouter } from "next/navigation";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { useSubmitLanguage } from "./hooks/useSubmitLanguage";
import { useLanguageForm } from "./hooks/useLanguageForm";
import ButtonReturn from "../editLanguage/[id]/ButtonReturn";

export default function AddLanguagePage() {
  const router = useRouter();
  const { form, setField } = useLanguageForm();
  const { handleSubmit, loading } = useSubmitLanguage({ form, router });

  return (
    <div className="w-full min-h-screen flex flex-col">
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
          <h1 className="text-[var(--color-black)] w-[800px] font-['Roboto_Mono'] font-bold text-[64px] leading-[150%] tracking-[-0.011em] text-center">
            Додати мову
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
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
