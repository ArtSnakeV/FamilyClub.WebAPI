import { AuthorDTO, PublisherDto } from "@/lib/api/generated";
import { ProductDto } from "@/app/addProduct/types";
import { SectionCard } from "@/app/addProduct/ui/SectionCard";
import AuthorSelectForm from "@/app/addProduct/AuthorSelectForm";
import PublisherSelectForm from "@/app/addProduct/PublisherSelectForm";
import ISBNForm from "@/app/addProduct/ISBNForm";

type Props = {
  form: ProductDto;
  setField: <K extends keyof ProductDto>(key: K, value: ProductDto[K]) => void;
  authors: AuthorDTO[];
  publishers: PublisherDto[];
  loading: boolean;
  isbnLoading: boolean;
  onIsbnLookup: () => void;
};

export function BasicInfoSection({
  form,
  setField,
  authors,
  publishers,
  loading,
  onIsbnLookup,
  isbnLoading,
}: Props) {
  return (
    <div className="w-full h-[720px] flex">
      <SectionCard
        title="Основна інформація"
        backgroundImage="/images/addProducts/Rectangle 313.svg"
      >
        <div className="flex w-[560px] flex-col gap-1">
          <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
            Назва книги *
          </p>
          <input
            placeholder="Назва"
            value={form.productName}
            onChange={(e) => setField("productName", e.target.value)}
            className="input rounded-[9px] px-3 bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px]"
          />

          <AuthorSelectForm
            authors={authors}
            value={form.authorIds}
            onChange={(ids) => setField("authorIds", ids)}
          />

          <PublisherSelectForm
            publishers={publishers}
            value={form.publisherId}
            onChange={(id) => setField("publisherId", id)}
          />

          <div className="flex flex-col gap-1 pt-2">
            <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
              Опис *
            </p>
            <textarea
              placeholder="Опис книги"
              value={form.description ?? ""}
              onChange={(e) => setField("description", e.target.value)}
              className="px-2 h-[120px] resize-none input rounded-[9px] bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040]"
            />
          </div>

          <div className="flex flex-col gap-1 h-[88px] pt-2 pb-[20px]">
            <ISBNForm
              value={form.isbn ?? ""}
              loading={loading}
              isbnLoading={isbnLoading}
              onChange={(v) => setField("isbn", v)}
              onLookup={onIsbnLookup}
            />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
