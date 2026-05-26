import Image from "next/image";


export default function UserCabinetButton() {
  return (
    <>
      <div className="w-[40px] h-[40px] flex items-center">
        <Image
          src="/images/person_24px.png"
          alt="person"
          className="object-contain"
          priority
          width={27}
          height={27}
        />
      </div>
    </>
  );
}
