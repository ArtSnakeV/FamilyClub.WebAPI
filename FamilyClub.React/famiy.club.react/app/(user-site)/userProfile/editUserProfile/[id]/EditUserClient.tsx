"use client"

import { useEffect } from "react";
import HeaderEditUserProfile from "./section/HeaderEditUserProfile";
import SocialLinkEditUserProfile from "./section/SocialLinkEditUserProfile";
import AboutBlockEditUserProfile from "./section/AboutBlockEditUserProfile";
import SecurityEditUserProfile from "./section/SecurityEditUserProfile";
import FavoriteCategoryUserProfile from "./section/FavoriteCategoryUserProfile";
import SettingsUserProfile from "./section/SettingsUserProfile";
import PrivacyAndAgeUserProfile from "./section/PrivacyAndAgeUserProfile";
import ButtonSubmitEditUserProfile from "./section/ButtonSubmitEditUserProfile";
import useEditForm from "./hooks/useEditForm";

export default function EditUserClient({ id }: { id: string }) {
    const { form, setField, avatarData, setAvatarData, loading,  about, setAbout, links, setLinks} = useEditForm(id);
    useEffect(() => {
        document.body.style.backgroundImage =
            "url('/images/userProfile/editUserProfile/Rectangle 326.png')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";

        return () => {
            document.body.style.backgroundImage = "";
            document.body.style.backgroundSize = "";
            document.body.style.backgroundAttachment = "";
            document.body.style.backgroundPosition = "";
            document.body.style.backgroundRepeat = "";
        };
    }, []);
    return (
        <div className="w-full min-h-screen flex flex-col  items-center">
            <div
                className="relative min-h-screen w-full mt-[48vh] flex flex-col  items-center"
                style={{
                    backgroundImage: "url('/images/userProfile/editUserProfile/Rectangle194.png')",
                    backgroundSize: "100% auto",
                    backgroundPosition: "top center",
                    backgroundRepeat: "no-repeat",
                    minHeight: "100vh",
                }}
            >

                <div className="w-full flex items-center justify-center relative -mt-[14vh]">
                    <HeaderEditUserProfile form={form}
                        setField={setField}
                        avatarData={avatarData}
                        setAvatarData={setAvatarData} />
                </div>
                <div className="w-full flex items-center justify-center relative mt-[1vh]">
                    <SocialLinkEditUserProfile links={links} setLinks={setLinks} />
                </div>
                <div className="w-full flex items-center justify-center relative mt-[1vh]">
                    <AboutBlockEditUserProfile about={about} setAbout={setAbout}/>
                </div>
                <div className="flex flex-row items-center mb-6 pb-4">
                    <div className="flex flex-col items-center ">
                        <SecurityEditUserProfile />
                        <SettingsUserProfile />
                    </div>
                    <div className="flex flex-col items-center -mt-16">
                        <FavoriteCategoryUserProfile />
                        <PrivacyAndAgeUserProfile />
                        <ButtonSubmitEditUserProfile />
                    </div>
                </div>
            </div>
        </div>
    )
}