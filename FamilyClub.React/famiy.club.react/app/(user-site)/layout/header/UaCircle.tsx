import Link from "next/link";
import Image from "next/image";


export default function UaCircle() {

  return (
    <div className="flex items-center justify-center gap-3">
      <div className="flex items-center justify-center w-[50px] h-[50px] ">
        <Image
          src="/images/Group11.png"
          alt="group11"
          width={36}
          height={36}
          className="object-contain"
          priority
        />
      </div>
      <div className="flex items-center justify-center w-[50] h-[50] ">
        <Image
          src="/images/Group19.png"
          alt="group19"
          width={36}
          height={36}
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}