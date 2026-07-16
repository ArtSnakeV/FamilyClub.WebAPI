import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ButtonReturn() {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <button
        type="button"
         onClick={() => {router.push("/admin/managers");}}
        className="relative w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
      >
        <Image
          src="/images/addManagerPageAdmin/Ellipse 9.png"
          alt="circle"
          width={40}
          height={40}
          className="object-contain"
        />
        <Image src="/images/addProducts/keyboard_backspace_24px.png"
          alt="back"
          width={36}
          height={36}
          className="object-contain absolute" />
      </button>
    </div>
  );
}
