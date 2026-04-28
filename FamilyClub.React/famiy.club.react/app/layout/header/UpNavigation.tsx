import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";
import UaCircle from "./UaCircle";
import SearchIco from "./SearchIco";
import PersonIco from "./PersonIco";
import IcoPeople from "./IcoPeople";
import IcoFavorite from "./IcoFavorite";
import IcoShopping from "./IcoShopping";


export default function UpNavigation() {
  return (
    <>
      <div className="max-w-7xl mx-auto flex items-center h-full px-4 relative flex-nowrap justify-between">
        <Link href="/">
          <Logo />
        </Link>
        {/* ml60 як по іншому змістити вліво ? */}
        <div className="flex items-center w-[1000px] ml-60 gap-6 mt-[11px]">

          <div className="w-[110px] gap-5 h-[50px] flex items-center justify-center">
            <UaCircle />
          </div>

          <div className="flex items-center bg-[#F5F3EE] relative left-[20px] rounded-[25px] px-4 h-[50px] w-[406px] shadow-[0px_0px_10px_0px_#24242466]">
            <SearchIco />
          </div>

          <div className="flex relative items-center gap-4 h-[50px] w-[384px] left-[6vw] ">
              <PersonIco />
            <div className="flex items-center h-[50px] w-[170px] mt-[8px] gap-[10px]">
              <div className=" relative w-[50px] h-[50px] ">
                <IcoPeople />
              </div>
              <div className=" relative w-[50px] h-[50px] ">
                <IcoFavorite />
              </div>
              <div className=" relative w-[50px] h-[50px] ">
                <IcoShopping />
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}