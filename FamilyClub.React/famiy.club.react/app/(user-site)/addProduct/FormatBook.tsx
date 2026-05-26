"use client";

import AudioFormat from "./AudioFormat";
import EbookFormat from "./EbookFormat";

export default function DigitalFormatsBlock() {
  return (
    <div className="flex flex-col gap-4 w-[565px]">

      <div className="flex flex-col  h-[94px]">
        <label className="flex flex-row justify-between items-center">
          <span className="text-[24px]">Електронний</span>
          <div className="w-[70px] h-[30px] flex flex-row items-center justify-center gap-2 pb-4">
            <input type="radio" name="format"  className="w-[26px] h-[26px]"/>
            <button
              className="w-[30px] h-[30px] bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('/images/addProducts/Group 139.svg')",
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
            <input type="radio" name="format" className="w-[26px] h-[26px]"/>
            <button
              className="w-[30px] h-[30px] bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('/images/addProducts/Group 141.svg')",
              }}
            />
          </div>
        </label>
        <AudioFormat />
      </div>

    </div>
  );
}
