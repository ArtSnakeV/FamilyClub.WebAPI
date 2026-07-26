"use client";

import { useRouter } from "next/navigation";
import useEditBookSizeForm from "./hooks/useEditBookSizeForm";
import useSubmitEditBookSize from "./hooks/useSubmitEditBookSize";
import { BasicInfoSectionEditBookSize } from "./section/BasicInfoSectionEditBookSize";
import ButtonReturn from "./ButtonReturn";

export default function EditBookSizeClient({ id }: { id: string }) {
  const router = useRouter();
  const bookSizeId = Number(id);

  const { form, setField, loading: formLoading } = useEditBookSizeForm(bookSizeId);

  const { handleSubmit, loading, handleDelete } = useSubmitEditBookSize({
    id: bookSizeId,
    form,
    router,
  });

  if (formLoading) {
    return <div>Завантаження...</div>;
  }

  return (
    <div
      className="w-full min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/images/addProducts/Rectangle 326.png')",
        backgroundSize: "cover",
      }}
    >
      <div
        className="relative w-[900px] ml-[16.7vw] -mt-[68px] mx-auto bg-no-repeat min-h-screen"
        style={{
          backgroundImage: "url('/images/addProducts/Rectangle 312.png')",
          backgroundSize: "cover",
          backgroundPosition: "top",
          height: "1200px",
        }}
      >
        <div className="flex z-40 relative top-[130px] ml-[64px]">
          <ButtonReturn />
        </div>

        <div className="flex flex-col items-center mt-[80px]">
          <h1 className="text-[var(--color-black)] w-[800px] font-['Roboto_Mono'] font-bold text-[46px] leading-[150%] tracking-[-0.011em] text-center">
            Редагувати розмір книги
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
              <BasicInfoSectionEditBookSize
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
  );
}
