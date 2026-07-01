import { CategoryDto } from "@/app/(admin-site)/admin/books/categories/addCategory/types";
import { SectionCard } from "@/app/(admin-site)/admin/books/categories/addCategory/ui/SectionCard";

type Props = {
  form: CategoryDto;
  setField: <K extends keyof CategoryDto>(
    key: K,
    value: CategoryDto[K],
  ) => void;
  loading: boolean;
  handleDelete: () => void;
};

export function BasicInfoSectionEditCategory({ form, setField, loading, handleDelete }: Props) {
  return (
    <div className="w-full flex pb-4">
      <SectionCard
        title="Основна інформація"
        backgroundImage="/images/addProducts/Rectangle 313.svg"
        className="w-[600px] h-[580px]"
        backgroundSize="100% 100%"
      >
        <div className="flex w-[390px] relative top-[46px] flex-col gap-1">
          <p className="text-[var(--color-black)] font-sans-pro font-normal text-[18px] leading-[150%] tracking-[-0.011em]">
            Назва категорії *
          </p>
          <input
            placeholder="Назва категорії"
            value={form.categoryName}
            onChange={(e) => setField("categoryName", e.target.value)}
            className="relative z-10 input rounded-[9px] px-3 bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px]"
          />

          <div className="p-4 top-[24px] relative w-full flex flex-col gap-5 ">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[40px] rounded-[55px] bg-[var(--color-green)] text-[var(--color-white)] text-[20px] font-medium transition-all duration-200 hover:opacity-90 hover:shadow-[0px_0px_20px_0px_#00000080] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Збереження..." : "зберегти зміни"}
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
      </SectionCard>
    </div>
  );
}
