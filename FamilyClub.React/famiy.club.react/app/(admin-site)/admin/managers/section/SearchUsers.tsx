// "use client";

// import Image from "next/image";

// interface Props {
//     value: string;
//     onChange: (value: string) => void;
// }

// export default function SearchUsers({ value, onChange }: Props) {
//     return (
//         <div className="relative w-[480px] ml-[46px]">
//             <input
//                 type="text"
//                 value={value}
//                 onChange={(e) => onChange(e.target.value)}
//                 onClick={(e) => e.stopPropagation()}
//                 placeholder="Пошук за ім'ям, роллю, email..."
//                 className="w-full pl-4 pr-10 h-[36px] bg-[var(--color-white)] rounded-[9px] text-[15px] px-2 text-[#272727] outline-none border-[1px]"
//             />
//             <button
//                 onClick={(e) => e.stopPropagation()}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 w-[22px] h-[22px] flex items-center justify-center"
//             >
//                 <Image
//                     src="/images/header/zoom_out_24px.png"
//                     alt="search"
//                     width={22}
//                     height={22}
//                     className="object-contain"
//                     priority
//                 />
//             </button>
//         </div>
//     );
// }
"use client";

import Image from "next/image";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchUsers({ value, onChange }: Props) {
    return (
        <div className="relative w-[480px] max-w-[calc(100%-46px)] ml-[46px]">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder="Пошук за ім'ям, роллю, email..."
                className="w-full pl-4 pr-10 h-[36px] bg-[var(--color-white)] rounded-[9px] text-[15px] px-2 text-[#272727] outline-none border-[1px]"
            />
            <button
                onClick={(e) => e.stopPropagation()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-[22px] h-[22px] flex items-center justify-center"
            >
                <Image
                    src="/images/header/zoom_out_24px.png"
                    alt="search"
                    width={22}
                    height={22}
                    className="object-contain"
                    priority
                />
            </button>
        </div>
    );
}