"use client";

import Link from "next/link";
import Logo from "./Logo";
import UaCircle from "./UaCircle";
import SearchIco from "./SearchIco";
import IcoPeople from "./IcoPeople";
import AuthorizationButton from "./AuthorizationButton";
import UserCabinetButton from "./UserCabinetButton";
import FavoriteButton from "./FavoriteButton";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuDrop from "./userMenu/UserMenuDrop";

export default function UpNavigation() {
  const isAuthenticated = true;
  const member = {
    fullName: "Test User",
    email: "test@test.com",
    avatarUrl:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  };

  return (
    <>
      <div className="max-w-7xl mx-auto flex items-center h-full px-0 relative flex-nowrap justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center w-[1000px] ml-60 gap-4 mt-[11px]">
          <div className="w-[110px] gap-5 h-[50px] flex items-center justify-center">
            <UaCircle />
          </div>

          <div className="flex items-center bg-[#F5F3EE] relative left-[20px] rounded-[25px] px-4 h-[50px] w-[406px] shadow-[0px_0px_10px_0px_#24242466]">
            <SearchIco />
          </div>
          <div className="flex relative items-center gap-4 h-[50px] w-[384px] left-[4vw] ">
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
            {/* <div className="flex relative items-center h-[50px] w-[194px] ml-[1vw]">
              <Link href="/account">
                <UserCabinetButton />
              </Link>
              <Link href="/authorization">
                <AuthorizationButton />
              </Link>
            </div> */}
            <div className="flex relative items-center h-[50px] w-[194px] ml-[1vw]">
              {isAuthenticated ? (
                <UserMenuDrop
                  member={member}
                  notificationCount={3}
                  onCabinet={() => console.log("cabinet")}
                  onNotifications={() => console.log("notifications")}
                  onOrders={() => console.log("orders")}
                  onLibrary={() => console.log("library")}
                  onLogout={() => console.log("logout")}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/account">
                    <UserCabinetButton />
                  </Link>

                  <Link href="/authorization">
                    <AuthorizationButton />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
