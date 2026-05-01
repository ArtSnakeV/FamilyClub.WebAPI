import DropDownAuthors from "./DropDownAuthors";
import DropDownCategories from "./DropDownCategories";
import DropDownLanguage from "./DropDownLanguage";
import DropDownFormat from "./DropDownFormat";
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
    )
}