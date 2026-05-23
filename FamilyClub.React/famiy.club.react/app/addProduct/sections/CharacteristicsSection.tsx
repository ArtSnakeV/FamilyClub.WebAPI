import { LanguageDto, FormatDto, BookSizeDto } from "@/lib/api/generated";
import { ProductDto } from "@/app/addProduct/types";
import { SectionCard } from "@/app/addProduct/ui/SectionCard";
import { NumberInput } from "@/app/addProduct/ui/NumberInput";
import LanguageSelectForm from "@/app/addProduct/LanguageSeletForm";
import AgeRestrictions from "@/app/addProduct/AgeRestrictions";
import BookSizeSelectForm from "@/app/addProduct/BookSizeSelectForm";
import CoverTypeSelect from "@/app/addProduct/CoverTypeSelect";
import FormatBook from "@/app/addProduct/FormatBook";

type Props = {
  form: ProductDto;
  setField: <K extends keyof ProductDto>(key: K, value: ProductDto[K]) => void;
  languages: LanguageDto[];
  formats: FormatDto[];
  bookSizes: BookSizeDto[];
};

export function CharacteristicsSection({
  form,
  setField,
  languages,
  formats,
  bookSizes,
}: Props) {
  return (
    <div className="w-full h-[950px] flex mt-[48px]">
      <SectionCard
        title="Характеристики"
        backgroundImage="/images/addProducts/Rectangle 314.svg"
      >
        <div className="flex w-full flex-row gap-4 items-center justify-between h-[88px]">
          <div className="flex flex-col w-[250px]">
            <LanguageSelectForm
              languages={languages}
              value={form.languageId}
              onChange={(id) => setField("languageId", id)}
            />
          </div>
          <div className="flex flex-col w-[250px]">
            <NumberInput
              label="Рік видання *"
              placeholder={String(new Date().getFullYear())}
              value={form.publishingYear}
              onChange={(v) => setField("publishingYear", v)}
            />
          </div>
        </div>

        <div className="flex flex-row gap-4 justify-between p-2 h-[88px]">
          <div className="flex flex-col w-[250px]">
            <AgeRestrictions
              value={form.ageRestrictions}
              onChange={(v) => setField("ageRestrictions", v)}
            />
          </div>
          <div className="flex flex-col w-[250px]">
            <NumberInput
              label="Кількість сторінок *"
              placeholder="567"
              value={form.pageCount}
              onChange={(v) => setField("pageCount", v)}
              className="w-[250px]"
            />
          </div>
        </div>

        <div className="flex flex-row gap-4 justify-between p-2 h-[88px]">
          <div className="flex flex-col w-[250px]">
            <BookSizeSelectForm
              value={form.bookSizeIds?.[0]}
              formats={bookSizes}
              onChange={(id) => setField("bookSizeIds", id ? [id] : [])}
            />
          </div>
          <div className="flex flex-col w-[250px]">
            <NumberInput
              label="Вага"
              placeholder="1180g"
              value={form.weightGrams}
              onChange={(v) => setField("weightGrams", v)}
              className="w-[250px]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 p-2 h-[88px]">
          <div className="flex flex-col w-[450px]">
            <CoverTypeSelect
              value={form.coverType}
              onChange={(v) => setField("coverType", v)}
            />
          </div>
        </div>

        <div className="flex flex-row gap-1 h-[164px] justify-between p-2">
          <div className="flex flex-col w-[250px]">
            <NumberInput
              label="Кількість товару в наявності"
              value={form.quantityInStock}
              onChange={(v) => setField("quantityInStock", v)}
              className="w-[250px]"
            />
          </div>
          <div className="flex flex-col w-[250px]">
            <NumberInput
              label="Кількість товару в наборі"
              value={form.itemsInSet}
              onChange={(v) => setField("itemsInSet", v)}
              className="w-[250px]"
            />
          </div>
        </div>

        <div className="flex flex-col h-[200px] pb-[20px]">
          <FormatBook
            value={form.formatIds}
            formats={formats}
            onChange={(ids) => setField("formatIds", ids)}
          />
        </div>
      </SectionCard>
    </div>
  );
}
