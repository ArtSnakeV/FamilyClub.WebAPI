"use client";

import DropDownAuthors from "./DropDownAuthors";
import DropDownCategories from "./DropDownCategories";
import DropDownFormat from "./DropDownFormat";
import DropDownLanguage from "./DropDownLanguage";
import DropDownPrice from "./DropDownPrice";
import DropDownYearOfPublication from "./DropDownYearOfPublication";

export default function DropDownList() {

  return (
    <>
      <DropDownCategories />
      <DropDownAuthors />
      <DropDownLanguage />
      <DropDownFormat />
      <DropDownPrice />
      <DropDownYearOfPublication />
    </>
  );
}
