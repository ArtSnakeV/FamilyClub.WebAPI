"use client";

import { Suspense } from "react";
import ButtonReturn from "./ui/ButtonReturn";
import ManagerInfoFields from "./sections/ManagerInfoFields";
import ManagerPasswordFields from "./sections/ManagerPasswordFields";
import RolesInfoCard from "./ui/RolesInfoCard";
import { useAddManagerForm } from "./hooks/useAddManagerForm";

function AddManagerForm() {
    const {
        form,
        updateField,
        submitting,
        error,
        searchEmail,
        setSearchEmail,
        searching,
        userFound,
        handleSearch,
        handleSubmit,
        roleOptions,
    } = useAddManagerForm();

    return (
        <div className="w-full min-h-screen overflow-hidden relative m-0 p-0 text-[var(--foreground-primary)]">
            <div className="w-[100vw] min-h-screen relative">
                <div
                    className="absolute pointer-events-none"
                    style={{ width: "100vw", top: "-40px", left: "-20px" }}
                    aria-hidden
                >
                    <div className="admin-shelf-surface relative w-full">
                        <img
                            src="/images/authorPageAdmin/Rectangle 675.png"
                            className="block w-full h-auto"
                            alt=""
                        />
                    </div>
                </div>

                <div className="relative z-10 top-10 left-16 flex flex-col gap-7 pb-16 pr-16">
                    <ButtonReturn />

                    <div className="flex flex-wrap gap-6 items-start">
                        <div className="relative flex-1 min-w-[360px] max-w-[740px] rounded-[10px] overflow-hidden">
                            <div
                                aria-hidden
                                className="absolute inset-0 pointer-events-none admin-parchment-bg"
                                style={{
                                    backgroundImage:
                                        "url('/images/usersPageAdmin/Rectangle 793.png')",
                                    backgroundSize: "100% 100%",
                                }}
                            />
                            <div className="relative z-10 p-8 flex flex-col gap-6">
                                <h2 className="text-[32px] font-semibold text-[var(--foreground-primary)]">
                                    Основна інформація
                                </h2>

                                <ManagerInfoFields
                                    form={form}
                                    updateField={updateField}
                                    disabled={submitting || searching}
                                    emailDisabled={userFound}
                                    searchEmail={searchEmail}
                                    setSearchEmail={setSearchEmail}
                                    searching={searching}
                                    userFound={userFound}
                                    handleSearch={handleSearch}
                                    roleOptions={roleOptions}
                                />

                                {!userFound && (
                                    <ManagerPasswordFields
                                        form={form}
                                        updateField={updateField}
                                    />
                                )}

                                {error && (
                                    <p className="text-sm text-[#981717]">
                                        {error}
                                    </p>
                                )}

                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="mt-2 h-[50px] rounded-[9px] bg-[var(--color-green)] text-[var(--color-cream)] font-medium text-[18px] hover:opacity-90 transition disabled:opacity-50"
                                >
                                    {submitting
                                        ? "Обробка..."
                                        : userFound
                                          ? "Оновити профіль користувача"
                                          : "Додати менеджера"}
                                </button>
                            </div>
                        </div>

                        <RolesInfoCard />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AddManagerPage() {
    return (
        <Suspense
            fallback={
                <div className="p-10 text-[20px] text-[var(--color-muted-fg)]">
                    Завантаження...
                </div>
            }
        >
            <AddManagerForm />
        </Suspense>
    );
}
