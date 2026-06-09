import { ProductDto } from "@/app/(user-site)/addProduct/types";
import { NumberInput } from "@/app/(user-site)/addProduct/ui/NumberInput";
import AvailabilitySelector from "@/app/(user-site)/addProduct/AvailabilitySelector";
import ButtonSubmitAddProduct from "@/app/(user-site)/addProduct/ButtonSubmitAddProduct";

type Props = {
  form: ProductDto;
  setField: <K extends keyof ProductDto>(key: K, value: ProductDto[K]) => void;
  loading: boolean;
  onPublish: () => void;
  onSaveDraft: () => void;
  onCancel: () => void;
};

export function SaleSection({
  form,
  setField,
  loading,
  onPublish,
  onSaveDraft,
  onCancel,
}: Props) {
  return (
    <div className="w-full h-[480px] flex relative -mt-[30px] text-[var(--color-white)]">
      <div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/addProducts/Rectangle 315.svg')",
        }}
      >
        <div className="w-full h-full flex flex-col items-center -ml-[2px] mt-[38px]">
          <div className="relative w-[260px] h-[116px] -ml-[40px]">
            <img
              src="/images/addProducts/Rectangle 304.svg"
              alt=""
              className="w-full h-full"
              style={{ objectFit: "fill" }}
            />
            <div className="absolute inset-0 -mt-[14px] flex items-center ml-[40px] justify-start">
              <p className="font-['Roboto_Mono'] font-semibold text-[20px] leading-[100%] tracking-[-0.011em]">
                Продаж та наявність
              </p>
            </div>
          </div>

          <NumberInput
            label="Ціна *"
            value={form.price}
            onChange={(v) => setField("price", v)}
            className="w-[200px] text-[var(--color-black)]"
          />

          <NumberInput
            label="Знижка *"
            placeholder="0"
            value={form.discountPrice}
            onChange={(v) => setField("discountPrice", v)}
            className="w-[200px] mt-4"
          />

          <div className="flex flex-col items-center w-[200px] mt-0">
            <AvailabilitySelector
              value={form.availability}
              onChange={(value) => setField("availability", value)}
            />
          </div>

          <div className="relative flex flex-col items-center mt-[120px]">
            <ButtonSubmitAddProduct
              loading={loading}
              onPublish={onPublish}
              onSaveDraft={onSaveDraft}
              onCancel={onCancel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
