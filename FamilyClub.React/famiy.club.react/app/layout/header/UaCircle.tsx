import Link from "next/link";
import Image from "next/image";

export default function UaCircle() {
  return (
    <div className="flex items-center justify-center gap-1">
      <div className="group flex items-center justify-center">
        <div
          className="
          w-[40px]
          h-[40px]
          flex
          items-center
          justify-center
          rounded-full
          transition-all
          duration-300
          group-hover:bg-[var-(--color-white)]
          group-hover:shadow-[0px_0px_15px_0px_#242424CC]
        "
        >
          <Image
            src="/images/header/Group11.png"
            alt="group11"
            width={36}
            height={36}
            className="object-contain"
            priority
          />
        </div>
      </div>
      <div className="group flex items-center justify-center">
        <div
          className="
          w-[40px]
          h-[40px]
          flex
          items-center
          justify-center
          rounded-full
          transition-all
          duration-300
          group-hover:bg-[var-(--color-white)]
          group-hover:shadow-[0px_0px_15px_0px_#242424CC]
        "
        >
          <Image
            src="/images/header/Group19.png"
            alt="group19"
            width={36}
            height={36}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
