"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import type { NotificationDTO } from "@/lib/api/generated/models";

type NotificationThreadProps = {
    open: boolean;
    onClose: () => void;
    messages: NotificationDTO[];
    avatarSrc?: string;
    avatarFallback?: string;
    formatDate: (date?: Date) => string;
};

export default function NotificationThread({
    open,
    onClose,
    messages,
    avatarSrc,
    avatarFallback,
    formatDate,
}: NotificationThreadProps) {
    // найстаріші зверху, найновіші внизу
    const sorted = [...messages].sort(
        (a, b) => new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime()
    );

    return (
        <Transition show={open} as={Fragment}>
            <Dialog onClose={onClose} className="relative z-50">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                </Transition.Child>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-150"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-100"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-[520px] max-h-[70vh] flex flex-col bg-[#F5F3EE] rounded-[26px] shadow-[0px_0px_15px_0px_#242424CC] overflow-hidden">
                            <div className="flex items-center gap-3 px-5 py-4 border-b border-black/10 shrink-0">
                                {avatarSrc ? (
                                    <img
                                        src={avatarSrc}
                                        alt="Повідомлення"
                                        className="w-9 h-9 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center">
                                        {avatarFallback ?? "👤"}
                                    </div>
                                )}
                                <Dialog.Title className="font-bold text-[16px]">
                                    Повідомлення
                                </Dialog.Title>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="ml-auto text-black/50 hover:text-black text-xl leading-none px-2"
                                    aria-label="закрити"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                                {sorted.length === 0 ? (
                                    <p className="text-black/50 text-sm text-center py-6">
                                        Повідомлень немає
                                    </p>
                                ) : (
                                    sorted.map((m) => (
                                        <div
                                            key={m.id}
                                            className="max-w-[80%] self-start bg-white rounded-2xl rounded-tl-sm px-4 py-2 shadow-sm"
                                        >
                                            <p className="text-sm text-black/80">{m.text}</p>
                                            <span className="text-[11px] text-black/40 block mt-1">
                                                {formatDate(m.createdAt)}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}