"use client";

import Image from "next/image";
import HeaderUtilityIcon from "./HeaderUtilityIcon";

export default function IcoPeople() {
  return (
    <HeaderUtilityIcon>
      <Image
        src="/images/header/people_24px.png"
        alt="people"
        width={32}
        height={32}
      />
    </HeaderUtilityIcon>
  );
}
