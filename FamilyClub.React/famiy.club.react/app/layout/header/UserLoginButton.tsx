import Image from "next/image";

export default function UserLoginButton(){

   return (
    <div className="group flex items-center justify-center">
      <div className="w-[50px] h-[50px] flex row w-full
          items-center
          justify-center
          rounded-full
          transition-all
          duration-300
          group-hover:bg-[var-(--color-white)]
          group-hover:shadow-[0px_0px_15px_0px_#242424CC]">
        <Image
          src="/images/header/person_24px.png"
          alt="person"
          className="object-contain"
          priority
          width={50}
          height={50}
        />
      </div>
    </div>
  );
}