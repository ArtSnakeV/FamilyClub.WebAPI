"use client";

import { useRouter } from "next/navigation";
import ButtonReturn from "./ButtonReturn";
import useEditBlockReasonForm from "./hooks/useEditBlockReasonForm";
import useSubmitEditBlockReason from "./hooks/useSubmitEditBlockReason";
import { BasicInfoSectionEditBlockReason } from "./section/BasicInfoSectionEditBlockReason";

export default function EditBlockReasonClient({ id }: { id: string }) {
  const router = useRouter();

  const blockReasonId = Number(id);

  const {
    form,
    setField,
    loading: formLoading,
  } = useEditBlockReasonForm(blockReasonId);

  const { handleSubmit, loading, handleDelete } = useSubmitEditBlockReason({
    id: blockReasonId,
    form,
    router,
  });

  if (formLoading) {
    return <div>Завантаження...</div>;
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col text-[var(--foreground-primary)]">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none admin-parchment-bg"
        style={{
          backgroundImage: "url('/images/addProducts/Rectangle 326.png')",
          backgroundSize: "cover",
        }}
      />
      <div className="relative z-10">
        <div
          className="relative w-[900px] ml-[16.7vw] -mt-[68px] mx-auto min-h-screen"
          style={{ height: "1100px" }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none admin-parchment-bg bg-no-repeat"
            style={{
              backgroundImage: "url('/images/addProducts/Rectangle 312.svg')",
              backgroundSize: "cover",
              backgroundPosition: "top",
            }}
          />
          <div className="relative z-10">
            <div className="flex z-40 relative top-[130px] ml-[64px]">
              <ButtonReturn />
            </div>

            <div className="flex flex-col items-center mt-[80px]">
              <h1 className="text-[var(--foreground-primary)] w-[800px] font-['Roboto_Mono'] font-bold text-[36px] leading-[150%] tracking-[-0.011em] text-center">
                Редагувати причину блокування
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
                  <BasicInfoSectionEditBlockReason
                    form={form}
                    setField={setField}
                    loading={loading}
                    handleDelete={handleDelete}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
