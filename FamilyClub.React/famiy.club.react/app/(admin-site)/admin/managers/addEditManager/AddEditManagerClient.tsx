"use client";

import ButtonReturn from "./ui/ButtonReturn";
import UserSearchBlock from "./sections/UserSearchBlock";
import ManagerInfoFields from "./sections/ManagerInfoFields";
import ManagerPasswordFields from "./sections/ManagerPasswordFields";
import RolesInfoCard from "./ui/RolesInfoCard";
import { useAddManagerForm } from "./hooks/useAddManagerForm";

export default function AddEditManagerClient() {
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
    } = useAddManagerForm();

    return (
        <div
            className="w-full min-h-screen overflow-hidden relative m-0 p-0 flex flex-col"
            style={{
                backgroundImage: "url('/images/authorPageAdmin/Rectangle 326.png')",
                backgroundSize: "100% 100%",
            }}
        >
            <div className="w-[1600px] h-[1150px] relative top-[36px] left-[-20px]"
                style={{
                    backgroundImage: "url('/images/authorPageAdmin/Rectangle 675.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                }}>
                <div className="top-10 left-16 relative z-10 flex flex-col gap-7">
                    <div className="flex relative top-0 ml-0">
                        <ButtonReturn />
                    </div>

                    <div className="flex flex-wrap gap-6 items-start">
                        <div className="bg-[var(--color-white,#F7F5F1)] rounded-[10px] p-8 flex-1 min-w-[360px] max-w-[740px] flex flex-col gap-6">
                            <h2 className="text-[32px] font-semibold text-[var(--color-black)]">
                                Основна інформація
                            </h2>

                            <UserSearchBlock
                                searchEmail={searchEmail}
                                onSearchEmailChange={setSearchEmail}
                                searching={searching}
                                userFound={userFound}
                                onSearch={handleSearch}
                            />

                            <ManagerInfoFields form={form} updateField={updateField} disabled={userFound} />

                            {!userFound && (
                                <ManagerPasswordFields form={form} updateField={updateField} />
                            )}

                            {error && <p className="text-sm text-[#981717]">{error}</p>}

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="mt-2 h-[50px] rounded-[9px] bg-[var(--color-green)] text-white font-medium text-[18px] hover:opacity-90 transition disabled:opacity-50"
                            >
                                {submitting
                                    ? "Обробка..."
                                    : userFound
                                        ? "Оновити профіль користувача"
                                        : "Додати менеджера"}
                            </button>
                        </div>

                        <RolesInfoCard />
                    </div>
                </div>
            </div>
        </div>
    );
}
