"use client";

import Image from "next/image";
import HeaderUtilityIcon from "./HeaderUtilityIcon";

export default function UserLoginButton() {
  return (
    <HeaderUtilityIcon size={34}>
      <Image
        src="/images/header/person_24px.png"
        alt="person"
        priority
        width={34}
        height={34}
      />
    </HeaderUtilityIcon>
  );
}
