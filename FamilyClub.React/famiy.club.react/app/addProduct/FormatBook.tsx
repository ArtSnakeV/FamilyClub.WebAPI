"use client";

import AudioFormat from "./AudioFormat";
import EbookFormat from "./EbookFormat";
import { ProductFormat } from "@/src/lib/api/generated";
import Image from "next/image";

const formatBooksCheck = [
  { label: "Ebook", value: ProductFormat.NUMBER_0 },
  { label: "AudioBook", value: ProductFormat.NUMBER_1 },
  { label: "Printed", value: ProductFormat.NUMBER_2 },
];

type Props = {
  value: ProductFormat;
  onChange: (value: ProductFormat) => void;
};

export default function DigitalFormatsBlock({ value, onChange }: Props) {
  // const toggleFormat = (format: ProductFormat) => {
  //   if (value.includes(format)) {
  //     onChange(value.filter((f) => f !== format));
  //   } else {
  //     onChange([...value, format]);
  //   }
  // };
  const isSelected = (format: ProductFormat) => value === format;
  const selectFormat = (format: ProductFormat) => {
    onChange(format);
  };
  return (
    <div className="flex flex-col gap-4 w-[565px]">
      {/* <div className="w-[70px] h-[30px] flex flex-row items-center justify-center gap-2 pb-4">
        <button
          type="button"
          onClick={() => selectFormat(ProductFormat.NUMBER_2)}
          className="relative w-[30px] h-[30px] flex items-center justify-center"
        >
          <Image
            src="/images/addProducts/icon.svg"
            alt="circle"
            width={30}
            height={30}
            className="object-contain"
          />

          {isSelected(ProductFormat.NUMBER_2) && (
            <Image
              src="/images/addProducts/check_24px.svg"
              alt="check"
              width={30}
              height={30}
              className="absolute"
            />
          )}
        </button>

        <div
          className="w-[30px] h-[30px] bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/addProducts/Group 140.svg')",
          }}
        />
      </div> */}
      <div className="flex flex-col  h-[94px]">
        <label className="flex flex-row justify-between items-center">
          <span className="text-[24px]">Електронний</span>
          <div className="w-[70px] h-[30px] flex flex-row items-center justify-center gap-2 pb-4">
            <button
              type="button"
              onClick={() => selectFormat(ProductFormat.NUMBER_0)}
              className="relative w-[30px] h-[30px] flex items-center justify-center"
            >
              <Image
                src="/images/addProducts/icon.svg"
                alt="circle"
                width={30}
                height={30}
                className="object-contain"
              />
              {isSelected(ProductFormat.NUMBER_0) && (
                <Image
                  src="/images/addProducts/check_24px.svg"
                  alt="check"
                  width={30}
                  height={30}
                  className="absolute ml-2 -mt-2"
                />
              )}
            </button>

            <div
              className="w-[30px] h-[30px] bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/addProducts/Group 139.svg')",
              }}
            />
          </div>
        </label>
        <EbookFormat />
      </div>
      <div className="flex flex-col  h-[94px]">
        <label className="flex flex-row justify-between items-center">
          <span className="text-[24px]">Аудіо</span>
          <div className="w-[70px] h-[30px] flex flex-row items-center justify-center gap-2 pb-4">
            <button
              type="button"
              onClick={() => selectFormat(ProductFormat.NUMBER_1)}
              className="relative w-[30px] h-[30px] flex items-center justify-center"
            >
              <Image
                src="/images/addProducts/icon.svg"
                alt="circle"
                width={30}
                height={30}
                className="object-contain"
              />
              {isSelected(ProductFormat.NUMBER_1) && (
                <Image
                  src="/images/addProducts/check_24px.svg"
                  alt="check"
                  width={30}
                  height={30}
                  className="absolute ml-2 -mt-2"
                />
              )}
            </button>

            <div
              className="w-[30px] h-[30px] bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/addProducts/Group 141.svg')",
              }}
            />
          </div>
        </label>
        <AudioFormat />
      </div>
    </div>
  );
}
