"use client";

import Image from "next/image";
import HeaderUtilityIcon from "./HeaderUtilityIcon";

export default function FavoriteButton() {
  return (
    <HeaderUtilityIcon>
      <Image
        src="/images/header/favorite_border_24px.png"
        alt="favor"
        className="p-1"
        priority
        width={36}
        height={36}
      />
    </HeaderUtilityIcon>
  );
}
