"use client";

import Image from "next/image";
import HeaderUtilityIcon from "./HeaderUtilityIcon";

export default function ShoppingCartButton() {
  return (
    <HeaderUtilityIcon size={38}>
      <Image
        src="/images/header/shopping_basket_24px.png"
        alt=""
        priority
        width={30}
        height={26}
      />
    </HeaderUtilityIcon>
  );
}
