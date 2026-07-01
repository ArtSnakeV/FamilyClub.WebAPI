"use client";

import { useRouter } from "next/navigation";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { useSubmitPublisher } from "./hooks/useSubmitPublisher";
import { usePublisherForm } from "./hooks/usePublisherForm";
import ButtonReturn from "../editPublisher/[id]/ButtonReturn";

export default function AddPublisherPage() {
  const router = useRouter();
  const { form, setField } = usePublisherForm();
  const { handleSubmit, loading } = useSubmitPublisher({ form, router });

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div
        className="relative w-[1200px] h-[1200px] pb-[60px] -mt-[68px] mx-auto bg-no-repeat"
        style={{
          backgroundImage: "url('/images/addProducts/Rectangle 312.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "top",
        }}
      >
        <div className="flex z-20 relative top-[130px] ml-[64px]">
          <ButtonReturn />
        </div>
        <div className="flex flex-col items-center mt-[120px]">
          <h1 className="text-[var(--color-black)] w-[800px] font-['Roboto_Mono'] font-bold text-[64px] leading-[150%] tracking-[-0.011em] text-center">
            Додати видавництво
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
