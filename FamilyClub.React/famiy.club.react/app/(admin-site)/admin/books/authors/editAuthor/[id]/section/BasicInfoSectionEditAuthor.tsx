import ellipse from "@/public/images/addProducts/Ellipse 36.svg";
import plus from "@/public/images/addProducts/plus-solid-full 1.svg";
import { AuthorDto } from "@/app/(admin-site)/admin/books/authors/addAuthor/types";
import { SectionCard } from "@/app/(admin-site)/admin/books/authors/addAuthor/ui/SectionCard";
import Image from "next/image";

type Props = {
  form: AuthorDto;
  setField: <K extends keyof AuthorDto>(key: K, value: AuthorDto[K]) => void;
  loading: boolean;
  handleDelete: () => void;
  mainPreview: string | null;
  onMainChange: (file: File | null) => void;
};

export function BasicInfoSectionEditAuthor({
  form,
  setField,
  loading,
  handleDelete,
  mainPreview,
  onMainChange,
}: Props) {
  return (
    <div className="w-full flex pb-4">
      <SectionCard
        title="Основна інформація"
        backgroundImage="/images/addProducts/Rectangle 313.svg"
        className="w-[600px] h-[580px]"
      >
        <div className="flex w-[390px] relative top-[46px] flex-col gap-1">
          <p className="text-[var(--color-black)] font-sans-pro font-normal text-[18px] leading-[150%] tracking-[-0.011em]">
            Назва автора *
          </p>
          <input
            placeholder="Ім`я та прізвище"
            value={form.authorName}
            onChange={(e) => setField("authorName", e.target.value)}
            className="input rounded-[9px] px-3 bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[40px]"
          />

          <div className="flex flex-col gap-1 pt-2">
            <p className="text-[var(--color-black)] font-sans-pro font-normal text-[18px] leading-[150%] tracking-[-0.011em]">
              Біографія *
            </p>
            <textarea
              placeholder="Біографія"
              value={form.biography ?? ""}
              onChange={(e) => setField("biography", e.target.value)}
              className="px-2 h-[80px] resize-none input rounded-[9px] bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040]"
            />
          </div>
          <div className="flex flex-row w-full gap-2 place-content-between">
            <div className="flex flex-col justify-center items-center gap-1 p-2">
              <p className="text-[var(--color-black)] font-sans-pro font-normal text-[18px] leading-[150%] tracking-[-0.011em]">
                Фото автора
              </p>
              <label
                className="cursor-pointer flex items-center justify-center bg-contain bg-no-repeat bg-center w-[100px] h-[100px]"
                style={{
                  backgroundImage:
                    "url('/images/addProducts/Rectangle 305.svg')",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => onMainChange(e.target.files?.[0] ?? null)}
                />
                {mainPreview ? (
                  <img
                    src={mainPreview}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative flex items-center justify-center">
                    <Image
                      src={ellipse}
                      alt="ellipse"
                      width={38}
                      height={38}
                      className="drop-shadow-md"
                    />
                    <Image
                      src={plus}
                      alt="plus"
                      width={18}
                      height={18}
                      className="absolute"
                    />
                  </div>
                )}
              </label>
            </div>
            <div className="p-4 top-[24px] relative w-[300px] flex flex-col gap-5 ">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[40px] rounded-[55px] bg-[var(--color-green)] text-[var(--color-white)] text-[20px] font-medium transition-all duration-200 hover:opacity-90 hover:shadow-[0px_0px_20px_0px_#00000080] active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? "Збереження..." : "Зберегти зміни"}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleDelete}
                className="
                w-full
                 h-[40px] 
                 rounded-[55px] 
                 bg-transparent 
                 text-[var(--color-green)] 
                 border-2 border-[#005B3380]
                 text-[#005B33]
                 text-[20px] 
                 font-medium transition-all duration-200 hover:opacity-90 hover:shadow-[0px_0px_20px_0px_#00000080] active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? "Видалення..." : "Видалити"}
              </button>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
