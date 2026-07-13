"use client"

import { CurrentUser } from "../hooks/useCurrentUser";
import { useFavorites } from "../../../../lib/hooks/useFavorites";
import { useMyBooks } from "../hooks/useMyBooks";
import { useUserReviews } from "../hooks/useUserReviews";
import SocialLinks from "./SocialLinks";


type Props = {
    member?: CurrentUser | null;
    userId?: string;
};

export default function InfoUserSection({ member, userId }: Props) {
    const { reviews, loading } = useUserReviews(member?.id);
    const { favorites, loadingFavorites } = useFavorites(userId);
    const { myBooks, loadingMyBooks } = useMyBooks(userId);
    const displayName =
        [member?.name, member?.surname].filter(Boolean).join(" ") ||
        member?.email?.split("@")[0] ||
        "User";

    const avatarSrc = member?.avatarData
        ? `data:image/jpeg;base64,${member.avatarData}`
        : null;

    return (
        <div className="relative w-full h-full flex flex-row gap-[60px] p-2 bg-[transparent] items-center">
            <div className="w-[145px] h-[145px] rounded-full overflow-hidden flex items-center justify-center">
                {avatarSrc ? (
                    <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                    <i className="ti ti-user-circle text-white text-[14px]" />
                )}
            </div>
            <div className="flex flex-col -mt-[20px] text-left">
                <span className="flex-1 text-[42px] text-left weight-700 h-[46px] font-semibold text-[var(--color-white)]">
                    {displayName}
                </span>
                <div className="flex flex-row p-1 gap-2 text-[22px] items-center weight-700 h-[26px] font-semibold text-[var(--color-white)]">
                    <p>{member?.email}</p>
                    <div className="w-2 h-2 rounded-full bg-[white]"></div>
                    {!loadingMyBooks && (
                        <p className="text-[var(--color-white)]">
                            Книги: {myBooks.length}
                        </p>
                    )}
                    <div className="w-2 h-2 rounded-full bg-[white]"></div>
                    {!loading && (
                        <p className="text-[var(--color-white)]">
                            Відгуків: {reviews.length}
                        </p>
                    )}

                </div>
                <div className="flex flex-col w-[880px] text-[var(--color-white)] text-[16px] text-left p-1">
                    <p>Докладніше про цей канал придумать, как визуально оформить все фильтры в одном стиле закладок, чтобы это выглядело не как форма, а как часть дизайнапридумать, как визуально оформить все фильтры в одном стиле закладок, чтобы это выглядело не как форма, а как часть дизайна</p>
                </div>
                <div className="flex flex-row mt-[4px]">
                    <SocialLinks userId={userId} />
                </div>
            </div>
        </div>
    );
}