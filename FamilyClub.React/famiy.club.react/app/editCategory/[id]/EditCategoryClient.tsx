"use client";

import { useRouter } from "next/navigation";
import ButtonReturn from "./ButtonReturn";
import useEditCategoryForm from "./hooks/useEditCategoryForm";
import useSubmitEditCategory from "./hooks/useSubmitEditCategory";
import { BasicInfoSectionEditCategory } from "./section/BasicInfoSectionEditCategory";

export default function EditCategoryClient({ id }: { id: string }) {
  const router = useRouter();

  const categoryId = Number(id);

  const {
    form,
    setField,
    loading: formLoading,
  } = useEditCategoryForm(categoryId);

  const { handleSubmit, loading, handleDelete } = useSubmitEditCategory({
    id: categoryId,
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
            Редагувати категорію
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
              <BasicInfoSectionEditCategory
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
