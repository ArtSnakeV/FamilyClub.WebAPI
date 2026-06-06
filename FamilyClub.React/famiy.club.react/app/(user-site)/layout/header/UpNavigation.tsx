"use client";

import Link from "next/link";
import Logo from "./Logo";
import UaCircle from "./UaCircle";
import SearchIco from "./SearchIco";
import IcoPeople from "./IcoPeople";
import FavoriteButton from "./FavoriteButton";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuDrop from "./userMenu/UserMenuDrop";
import UserAuthorizationButton from "./UserAuthorizationButton";
import { useEffect, useState } from "react";
import UserLoginButton from "./UserLoginButton";
import { useRouter } from "next/navigation";
import { authService, notificationsService } from "@/lib/api/services";
import { ClubMemberReadDto } from "@/lib/api/generated";

// type User = {
//   id: string;
//   email: string;
//   phoneNumber: string;
//   name: string;
//   surname: string;
//   dateOfBirth: string;
//   roles: string[];
//   avatarData: string;
// };

export default function UpNavigation() {
  const [member, setMember] = useState<ClubMemberReadDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);
  const router = useRouter();

  const fetchNotifications = async (memberId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const count =
        await notificationsService.apiNotificationsUnreadCountClubMemberIdGet(
          { clubMemberId: memberId },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      setNotificationCount(count);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMember(null);
      setLoading(false);
      return;
    }

    try {
      const data = await authService.apiAuthClubMemberMeGet({
        headers: { Authorization: `Bearer ${token}` },
      });
      setMember(data);
      await fetchNotifications(data.id!);
    } catch (error) {
      console.log(error);
      setMember(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();

    const handler = () => {
      fetchUser();
    };

    window.addEventListener("auth-change", handler);

    return () => {
      window.removeEventListener("auth-change", handler);
    };
  }, []);

  const isAuthenticated = !!member?.id;

  if (loading) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMember(null);
    setNotificationCount(0);
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
  };
  return (
    <>
      <div className="max-w-[1100px] mx-auto flex items-center h-full ml-[92px] relative flex-nowrap justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center w-[800px] relative ml-[180px] gap-1 mt-[2px]">
          <div className="w-[80px] gap-5 h-[50px] flex items-center justify-center">
            <UaCircle />
          </div>
          <div className="group flex items-center justify-center">
            <div
              className="flex items-center bg-[var(--color-white)] relative left-[8px] rounded-[25px] px-2 h-[36px] w-[290px] shadow-[0px_0px_10px_0px_#24242466] transition-all
          duration-300
          group-hover:bg-[var(--color-white)]
          group-hover:shadow-[0px_0px_15px_0px_#242424CC]"
            >
              <SearchIco />
            </div>
          </div>
          <div className="flex relative items-center gap-4 h-[50px] w-[384px] left-[2vw] ">
            <div className="flex items-center h-[50px] w-[170px] mt-[4px] gap-[8px]">
              <div className=" relative w-[40px] h-[40px] ">
                <Link href="/community">
                  <IcoPeople />
                </Link>
              </div>
              <div className=" relative w-[40px] h-[40px] ">
                <Link href="/favorites">
                  <FavoriteButton />
                </Link>
              </div>
              <div className=" relative w-[40px] h-[40px] ">
                <Link href="/cart">
                  <ShoppingCartButton />
                </Link>
              </div>
            </div>
            <div className="flex relative mt-1 -ml-5 items-center h-[40px] w-[144px]">
              {isAuthenticated ? (
                <UserMenuDrop
                  member={{
                    fullName: `${member?.name} ${member?.surname}`,
                    email: member?.email ?? undefined,
                    avatarData: member?.avatarData ?? undefined,
                  }}
                  notificationCount={notificationCount}
                  onCabinet={() => router.push("/cabinetManager")}
                  onNotifications={() => router.push("/notifications")}
                  onOrders={() => router.push("/orders")}
                  onLibrary={() => router.push("/library")}
                  onLogout={handleLogout}
                />
              ) : (
                <div className="flex w-[196px] items-center gap-1">
                  <Link href="/login">
                    <UserLoginButton />
                  </Link>
                  <Link href="/register">
                    <UserAuthorizationButton />
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
