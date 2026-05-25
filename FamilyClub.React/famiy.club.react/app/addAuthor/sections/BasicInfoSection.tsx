import { AuthorDto } from "@/app/addAuthor/types";
import Image from "next/image";
import ellipse from "@/public/images/addProducts/Ellipse 36.svg";
import plus from "@/public/images/addProducts/plus-solid-full 1.svg";
import { SectionCard } from "../ui/SectionCard";

type Props = {
  form: AuthorDto;
  setField: <K extends keyof AuthorDto>(key: K, value: AuthorDto[K]) => void;
  loading: boolean;
  mainPreview: string | null;
  onMainChange: (file: File | null) => void;
};

export function BasicInfoSection({
  form,
  setField,
  loading,
  mainPreview,
  onMainChange,
}: Props) {
  return (
    <div className="w-full flex">
      <SectionCard
        title="Основна інформація"
        backgroundImage="/images/addProducts/Rectangle 313.svg"
      >
        <div className="flex w-[560px] flex-col gap-1">
          <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
            Ім`я автора *
          </p>
          <input
            placeholder="Ім`я та прізвище"
            value={form.authorName}
            onChange={(e) => setField("authorName", e.target.value)}
            className="input rounded-[9px] px-3 bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px]"
          />

          <div className="flex flex-col gap-1 pt-2">
            <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
              Біографія *
            </p>
            <textarea
              placeholder="Біографія"
              value={form.biography ?? ""}
              onChange={(e) => setField("biography", e.target.value)}
              className="px-2 h-[120px] resize-none input rounded-[9px] bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040]"
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-1 pt-2">
            <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
              Фото автора
            </p>
            <label
              className="cursor-pointer flex items-center justify-center bg-contain bg-no-repeat bg-center w-[200px] h-[200px]"
              style={{
                backgroundImage: "url('/images/addProducts/Rectangle 305.svg')",
              }}
            >
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => onMainChange(e.target.files?.[0] ?? null)}
              />
              {mainPreview ? (
                <img src={mainPreview} className="w-full h-full object-cover" />
              ) : (
                <div className="relative flex items-center justify-center">
                  <Image src={ellipse} alt="ellipse" width={68} height={68} className="drop-shadow-md" />
                  <Image
                    src={plus}
                    alt="plus"
                    width={38}
                    height={38}
                    className="absolute"
                  />
                </div>
              )}
            </label>
          </div>
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[60px] rounded-[55px] bg-[var(--color-green)] text-[var(--color-white)] text-[20px] font-medium transition-all duration-200 hover:opacity-90 hover:shadow-[0px_0px_20px_0px_#00000080] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Збереження..." : "Додати автора"}
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
