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

type User = {
  id: string;
  email: string;
  phoneNumber: string;
  name: string;
  surname: string;
  dateOfBirth: string;
  roles: string[];
};

export default function UpNavigation() {
  const [member, setMember] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);
  const router = useRouter();

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMember(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://localhost:7069/api/AuthClubMember/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setMember(null);
        return;
      }

      const data: User = await res.json();

      console.log("CURRENT USER:", data);

      setMember(data);
    } catch (error) {
      console.log(error);
      setMember(null);
    } finally {
      setLoading(false);
    }
  };
  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(
        "https://localhost:7069/api/Notifications/count",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) return;

      const data = await res.json();
      setNotificationCount(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchNotifications();

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
      <div className="max-w-7xl mx-auto flex items-center h-full px-0 relative flex-nowrap justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center w-[1000px] ml-60 gap-4 mt-[11px]">
          <div className="w-[110px] gap-5 h-[50px] flex items-center justify-center">
            <UaCircle />
          </div>
          <div className="group flex items-center justify-center">
            <div
              className="flex items-center bg-[var-(--color-white)] relative left-[20px] rounded-[25px] px-2 h-[50px] w-[306px] shadow-[0px_0px_10px_0px_#24242466] transition-all
          duration-300
          group-hover:bg-[var-(--color-white)]
          group-hover:shadow-[0px_0px_15px_0px_#242424CC]"
            >
              <SearchIco />
            </div>
          </div>
          <div className="flex relative items-center gap-4 h-[50px] w-[384px] left-[4vw] ">
            <div className="flex items-center h-[50px] w-[170px] mt-[4px] gap-[10px]">
              <div className=" relative w-[50px] h-[50px] ">
                <Link href="/community">
                  <IcoPeople />
                </Link>
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
            <div className="flex relative items-center h-[50px] w-[194px] ml-[1vw]">
              {isAuthenticated ? (
                <UserMenuDrop
                  member={{
                    fullName: `${member?.name} ${member?.surname}`,
                    email: member?.email,
                    avatarUrl: undefined,
                  }}
                  notificationCount={notificationCount}
                  onCabinet={() => router.push("/cabinetManager")}
                  onNotifications={() => router.push("/notifications")}
                  onOrders={() => router.push("/orders")}
                  onLibrary={() => router.push("/library")}
                  onLogout={handleLogout}
                />
              ) : (
                <div className="flex w-[196px] items-center gap-3">
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
