"use client";

import { useRouter } from "next/navigation";
import useEditAuthorForm from "./hooks/useEditAuthorForm";
import useSubmitEditAuthor from "./hooks/useSubmitEditAuthor";
import { useAuthorImageUpload } from "@/app/addAuthor/hooks/useAuthorImageUpload";
import { authorsApi } from "@/app/addAuthor/api/authorsApiClient";
import { BasicInfoSectionEditAuthor } from "./section/BasicInfoSectionEditAuthor";
import ButtonReturn from "./ButtonReturn";

export default function EditAuthorClient({ id }: { id: string }) {
  const router = useRouter();
  const authorId = Number(id);

  const {
    form,
    setField,
    loading: formLoading,
    initialPhotoUrl,
  } = useEditAuthorForm(authorId);

  const { mainImage, mainPreview, handleMainChange } = useAuthorImageUpload();
  const resolvedPreview = mainPreview ?? initialPhotoUrl;
  const { handleSubmit, loading } = useSubmitEditAuthor({
    id: authorId,
    form,
    mainImage,
    router,
  });

  const handleDelete = async () => {
    if (!confirm("Ви точно бажаєте видалити цього автора?")) return;
    try {
      await authorsApi.apiAuthorsIdDelete({ id: Number(id) });
      router.push("/authors");
    } catch (e) {
      console.error(e);
      alert("Помилка при видаленні");
    }
  };

  if (formLoading) return <div>Завантаження...</div>;

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
            Редагувати автора
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
              <BasicInfoSectionEditAuthor
                form={form}
                setField={setField}
                loading={loading}
                handleDelete={handleDelete}
                mainPreview={resolvedPreview}
                onMainChange={handleMainChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
