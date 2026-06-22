"use client"

import { CurrentUser } from "../hooks/useCurrentUser";
import { useUserReviews } from "../hooks/useUserReviews";


type Props = {
    member?: CurrentUser | null;
};

export default function InfoUserSection({ member }: Props) {
    const { reviews, loading } = useUserReviews(member?.id);
    const displayName =
        [member?.name, member?.surname].filter(Boolean).join(" ") ||
        member?.email?.split("@")[0] ||
        "User";

    const avatarSrc = member?.avatarData
        ? `data:image/jpeg;base64,${member.avatarData}`
        : null;

    return (
        <div className="relative w-full h-full flex flex-row gap-[60px] p-2 bg-[red] items-center">
            <div className="w-[145px] h-[145px] rounded-full overflow-hidden flex items-center justify-center">
                {avatarSrc ? (
                    <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                    <i className="ti ti-user-circle text-white text-[14px]" />
                )}
            </div>
            <div className="flex flex-col -mt-[120px] text-left">
                <span className="flex-1 text-[42px] text-left weight-700 h-[46px] font-semibold text-[var(--color-white)]">
                    {displayName}
                </span>
                <div className="flex flex-row p-1 gap-2 text-[22px] items-center weight-700 h-[30px] font-semibold text-[var(--color-white)]">
                    <p>{member?.email}</p>
                    <div className="w-2 h-2 rounded-full bg-[white]"></div>
                    {!loading && (
                        <p className="text-[var(--color-white)] text-[16px]">
                            Відгуків: {reviews.length}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}