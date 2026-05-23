"use client";

import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  MenuSeparator,
  Transition,
} from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";

type Member = {
  fullName?: string;
  email?: string;
  avatarUrl?: string;
};

type Props = {
  member?: Member | null;
  notificationCount?: number;
  onCabinet?: () => void;
  onNotifications?: () => void;
  onOrders?: () => void;
  onLibrary?: () => void;
  onLogout?: () => void;
};

export default function UserMenuDrop({
  member,
  // notificationCount = 0,
  onCabinet,
  onNotifications,
  onOrders,
  onLibrary,
  onLogout,
}: Props) {
  const displayName =
    member?.fullName || member?.email?.split("@")[0] || "User";

  return (
    <Menu as="div" className="relative inline-block">
      {({ open }) => (
        <>
          <div
            className={`
          bg-[#F5F3EE]
          shadow-[0px_0px_15px_0px_#242424CC]
          transition-all
          ${open ? "rounded-t-[26px]" : "rounded-[26px]"}
        `}
          >
            {/* TRIGGER */}
            <MenuButton
              className="relative z-30 flex items-center gap-2 px-3 py-2 min-w-[194px] h-[50px]
          bg-[#F5F3EE]
          rounded-[26px]
          shadow-[0px_0px_15px_0px_#242424CC]
          border-0 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0"
            >
              {/* Avatar */}
              <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-[#3a3a3a] flex items-center justify-center">
                {member?.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <i className="ti ti-user-circle text-white text-[22px]" />
                )}
              </div>

              {/* Name */}
              <span className="flex-1 text-[16px] font-semibold text-[#242424]">
                {displayName}
              </span>

              {/* Arrow */}
              <div className="w-[26px] h-[26px] mt-[18px]">
                <img
                  src="/images/header/Vector.svg"
                  className={`w-[16px] h-[10px] transition-transform duration-200 ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                  alt="arrow"
                />
              </div>
            </MenuButton>

            {/* DROPDOWN */}
            <Transition
              as={Fragment}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 -translate-y-2"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0 -translate-y-2"
            >
              <MenuItems
                className="absolute left-0 top-0 z-20 w-full
            bg-[#F5F3EE]
            rounded-[26px]
            shadow-[0px_0px_15px_0px_#242424CC]
            overflow-hidden
            outline-none
            pt-[50px]"
              >
                {/* HEADER */}
                <div className="flex flex-col justify-center ">
                  <div className="flex items-center gap-6 pt-4 pb-2 px-4">
                    <div className="w-[34px] h-[34px] rounded-full overflow-hidden flex items-center justify-center">
                      {member?.avatarUrl ? (
                        <img
                          src={member.avatarUrl}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <i className="ti ti-user-circle text-white" />
                      )}
                    </div>
                    <div className="font-bold text-[16px]">{displayName}</div>
                  </div>

                  {/* ITEMS */}
                  <div className="py-1">
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={onCabinet}
                          className={`flex items-center w-full px-4 py-1 text-[16px] transition
        ${active ? "bg-[#ece7df]" : ""}`}
                        >
                          <div className="h-[50px] flex flex-row place-content-around items-center">
                            <div className="w-[26px] flex justify-center">
                              <Image
                                src="/images/header/work_24px.svg"
                                alt="cabinet"
                                width={25}
                                height={25}
                              />
                            </div>

                            <div className="w-[132px]">
                              <span>Кабінет менеджера</span>
                            </div>
                          </div>
                        </button>
                      )}
                    </MenuItem>

                    {/* Повідомлення */}
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={onNotifications}
                          className={`flex items-center w-full px-4 py-1 text-[16px] transition
        ${active ? "bg-[#ece7df]" : ""}`}
                        >
                          <div className="h-[50px] flex flex-row place-content-around items-center">
                            <div className="w-[26px] flex justify-center">
                              <Image
                                src="/images/header/add_24px.svg"
                                alt="notifications"
                                width={25}
                                height={25}
                              />
                            </div>

                            <div className="w-[132px] ">
                              <span>Повідомлення</span>
{/* 
                              {notificationCount > 0 && (
                                <span className="bg-red-500 text-white text-[10px] px-2 py-[2px] rounded-full">
                                  {notificationCount}
                                </span>
                              )} */}
                            </div>
                          </div>
                        </button>
                      )}
                    </MenuItem>

                    {/* Замовлення */}
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={onOrders}
                          className={`flex items-center w-full px-4 py-1 text-[16px] transition
        ${active ? "bg-[#ece7df]" : ""}`}
                        >
                          <div className="h-[50px] flex flex-row place-content-around items-center">
                            <div className="w-[26px] flex justify-center">
                              <Image
                                src="/images/header/assignment_24px.svg"
                                alt="orders"
                                width={25}
                                height={25}
                              />
                            </div>

                            <div className="w-[132px]">
                              <span>Замовлення</span>
                            </div>
                          </div>
                        </button>
                      )}
                    </MenuItem>

                    {/* Бібліотека */}
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={onLibrary}
                          className={`flex items-center w-full px-4 py-1 text-[16px] transition
        ${active ? "bg-[#ece7df]" : ""}`}
                        >
                          <div className="h-[50px] flex flex-row place-content-around items-center">
                            <div className="w-[26px] flex justify-center">
                              <Image
                                src="/images/header/view_column_24px.svg"
                                alt="library"
                                width={25}
                                height={25}
                              />
                            </div>

                            <div className="w-[132px]">
                              <span>Бібліотека</span>
                            </div>
                          </div>
                        </button>
                      )}
                    </MenuItem>

                    <MenuSeparator className="h-px bg-[#e0dbd2] my-1" />

                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={onLogout}
                          className={`flex items-center gap-2 w-full px-4 py-2 text-[16px] text-red-600 transition
                    ${active ? "bg-[#ece7df]" : ""}`}
                        >
                               <div className="h-[50px] flex flex-row place-content-around items-center">
                            <div className="w-[26px] flex justify-center">
                              <Image
                                src="/images/header/meeting_room_24px.svg"
                                alt="library"
                                width={25}
                                height={25}
                              />
                            </div>

                            <div className="w-[132px]">
                              <span>Вийти з акаунту</span>
                            </div>
                          </div>
                        </button>
                      )}
                    </MenuItem>
                  </div>
                </div>
              </MenuItems>
            </Transition>
          </div>
        </>
      )}
    </Menu>
  );
}
