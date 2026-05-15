import Image from "next/image";


export default function Logo() {
  return (
    <>
      <div className="absolute top-[0px]">
        <Image
          src="/images/header/logo.png"
          alt="Logo"
          width={189}
          height={83}
          className="object-contain"
          priority
        />
      </div>
    </>
  );
}
