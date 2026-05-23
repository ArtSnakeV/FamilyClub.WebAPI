import { ProductDto } from "@/app/addProduct/types";
import { NumberInput } from "@/app/addProduct/ui/NumberInput";
import AvailabilitySelector from "@/app/addProduct/AvailabilitySelector";
import ButtonSubmitAddProduct from "@/app/addProduct/ButtonSubmitAddProduct";

type Props = {
  form: ProductDto;
  setField: <K extends keyof ProductDto>(key: K, value: ProductDto[K]) => void;
  loading: boolean;
  onPublish: () => void;
  onCancel: () => void;
};

export function SaleSection({ form, setField, loading, onPublish, onCancel }: Props) {
  return (
    <div className="w-full h-[594px] flex mt-[120px] text-[var(--color-white)]">
      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/addProducts/Rectangle 315.svg')" }}
      >
        <div className="w-full h-full flex flex-col items-center -ml-[6px] mt-[38px]">
          <div className="relative w-[308px] h-[116px] -ml-[40px]">
            <img
              src="/images/addProducts/Rectangle 304.svg"
              alt=""
              className="w-full h-full"
              style={{ objectFit: "fill" }}
            />
            <div className="absolute inset-0 -mt-[14px] flex items-center ml-[40px] justify-start">
              <p className="font-['Roboto_Mono'] font-semibold text-[28px] leading-[100%] tracking-[-0.011em]">
                Продаж та наявність
              </p>
            </div>
          </div>

          <NumberInput
            label="Ціна *"
            value={form.price}
            onChange={(v) => setField("price", v)}
            className="w-[250px] text-[var(--color-black)]"
          />

          <NumberInput
            label="Знижка *"
            placeholder="0"
            value={form.discountPrice}
            onChange={(v) => setField("discountPrice", v)}
            className="w-[250px] mt-8"
          />

          <div className="flex flex-col items-center w-[250px] mt-0">
            <AvailabilitySelector
              value={form.availability}
              onChange={(value) => setField("availability", value)}
            />
          </div>

          <div className="relative flex flex-col items-center mt-[140px]">
            <ButtonSubmitAddProduct
              loading={loading}
              onPublish={onPublish}
              onSaveDraft={() => console.log("draft")}
              onCancel={onCancel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}