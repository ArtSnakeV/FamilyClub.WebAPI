import Link from "next/link";
import Image from "next/image";
import DropDownAuthors from "./DropDownAuthors";
import DropDownCategories from "./DropDownCategories";
import DropDownLanguage from "./DropDownLanguage";
import DropDownFormat from "./DropDownFormat";


export default function DropDownList() {
    return (
        <>
           <DropDownCategories />
           <DropDownAuthors />
           <DropDownLanguage />
           <DropDownFormat />
        </>
    )
}