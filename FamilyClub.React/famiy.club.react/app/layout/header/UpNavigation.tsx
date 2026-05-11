import Link from "next/link";
import Logo from "./Logo";
import UaCircle from "./UaCircle";
import SearchIco from "./SearchIco";
import IcoPeople from "./IcoPeople";
import AuthorizationButton from "./AuthorizationButton";
import UserCabinetButton from "./UserCabinetButton";
import FavoriteButton from "./FavoriteButton";
import ShoppingCartButton from "./ShoppingCartButton";

export default function UpNavigation() {
  return (
    <>
      <div className="max-w-7xl mx-auto flex items-center h-full px-4 relative flex-nowrap justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center w-[1000px] ml-60 gap-6 mt-[11px]">
          <div className="w-[110px] gap-5 h-[50px] flex items-center justify-center">
            <UaCircle />
          </div>

          <div className="flex items-center bg-[#F5F3EE] relative left-[20px] rounded-[25px] px-4 h-[50px] w-[406px] shadow-[0px_0px_10px_0px_#24242466]">
            <SearchIco />
          </div>
          <div className="flex relative items-center gap-4 h-[50px] w-[384px] left-[6vw] ">
            <div className="flex items-center h-[50px] w-[170px] mt-[8px] gap-[10px]">
              <div className=" relative w-[50px] h-[50px] ">
                <IcoPeople />
              </div>
              <div className=" relative w-[50px] h-[50px] ">
                <Link href="/favorites">
                  <FavoriteButton />
                </Link>
              </div>
              <div className=" relative w-[50px] h-[50px] ">
                <Link href="/cart">
                  <ShoppingCartButton />
                </Link>
              </div>
            </div>
            <div className="flex relative items-center h-[50px] w-[194px] ">
              <Link href="/account">
                <UserCabinetButton />
              </Link>
              <Link href="/authorization">
                <AuthorizationButton />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
