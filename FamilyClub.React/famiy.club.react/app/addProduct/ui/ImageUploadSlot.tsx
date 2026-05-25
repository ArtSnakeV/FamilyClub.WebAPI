// import Image from "next/image";
// import ellipse from "@/public/images/addProducts/Ellipse 36.svg";
// import plus from "@/public/images/addProducts/plus-solid-full 1.svg";

// type Props = {
//   preview: string | null;
//   onChange: (file: File | null) => void;
//   width?: string;
//   height?: string;
//   iconSize?: string;
// };

// export function ImageUploadSlot({
//   preview,
//   onChange,
//   width = "w-full",
//   height = "h-full",
//   iconSize = "w-[88px] h-[88px]",
// }: Props) {
//   return (
//     <label
//       className={`${width} ${height} flex items-center justify-center cursor-pointer bg-cover bg-center`}
//       style={{ backgroundImage: "url('/images/addProducts/Rectangle 305.svg')" }}
//     >
//       <input
//         type="file"
//         accept="image/*"
//         hidden
//         onChange={(e) => onChange(e.target.files?.[0] ?? null)}
//       />
//       {preview ? (
//         <img src={preview} className="w-full h-full object-cover" />
//       ) : (
//         <div className="relative flex items-center justify-center">
//           <Image src={ellipse} alt="ellipse" />
//           <Image src={plus} alt="plus" className={`absolute ${iconSize}`} />
//         </div>
//       )}
//     </label>
//   );
// }

import Image from "next/image";
import ellipse from "@/public/images/addProducts/Ellipse 36.svg";
import plus from "@/public/images/addProducts/plus-solid-full 1.svg";

type Props = {
  preview: string | null;
  onChange: (file: File | null) => void;
  width?: string;
  height?: string;
  iconSize?: string;
  ellipseSize?: string;
};

export function ImageUploadSlot({
  preview,
  onChange,
  width = "w-full",
  height = "h-full",
  iconSize = "w-[88px] h-[88px]",
  ellipseSize = "w-[146px] h-[146px]",
}: Props) {
  return (
    <label
      className={`${width} ${height} flex items-center justify-center cursor-pointer bg-cover bg-center`}
      style={{
        backgroundImage: "url('/images/addProducts/Rectangle 305.svg')",
      }}
    >
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />

      {preview ? (
        <img src={preview} className="w-full h-full p-2 object-cover" />
      ) : (
        <div className="relative flex items-center justify-center">
          <Image
            src={ellipse}
            alt="ellipse"
            className={ellipseSize}
          />

          <Image
            src={plus}
            alt="plus"
            className={`absolute ${iconSize}`}
          />
        </div>
      )}
    </label>
  );
}