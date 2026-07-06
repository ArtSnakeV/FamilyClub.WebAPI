// "use client";

// import { UserInfo } from "../../hooks/useAllUsersInfo";

// interface Props {
//     user: UserInfo;
// }

// export default function OneUserInfoCard({ user, }: Props) {

//     return (
//         <div className="w-[490px] -ml-6 mt-4 h-[140px] gap-8 flex flex-row items-center justify-center">
//             {user.avatarData ? (
//                 <img
//                     src={`data:image/jpeg;base64,${user.avatarData}`}
//                     alt="avatar"
//                     className="w-[130px] h-[130px] rounded-full object-cover"
//                 />
//             ) : (
//                 <div className="w-[130px] h-[130px] rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-2xl">
//                     {user.name?.[0] ?? "?"}
//                 </div>
//             )}
//             <div className="flex flex-col gap-4 text-left">
//                 <p className="font-semibold text-[var(--color-black)] text-[24px] mt-4 text-left">
//                     {user.name} {user.surname}
//                 </p>
//                 <p className="text-[15px] text-[var(--color-black)] text-left truncate w-full">{user.email}</p>
//                 <p className="text-[15px] text-[var(--color-black)] truncate w-full">ID: {user.id}</p>
//             </div>

//         </div>
//     );
// }
"use client";

import { UserInfo } from "../../hooks/useAllUsersInfo";

interface Props {
    user: UserInfo;
}

export default function OneUserInfoCard({ user, }: Props) {

    return (
        <div className="w-[490px] max-w-full mt-4 h-auto min-h-[140px] gap-8 flex flex-row flex-wrap items-center justify-center">
            {user.avatarData ? (
                <img
                    src={`data:image/jpeg;base64,${user.avatarData}`}
                    alt="avatar"
                    className="w-[130px] h-[130px] rounded-full object-cover shrink-0"
                />
            ) : (
                <div className="w-[130px] h-[130px] rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-2xl shrink-0">
                    {user.name?.[0] ?? "?"}
                </div>
            )}
            <div className="flex flex-col gap-4 text-left min-w-0 flex-1">
                <p className="font-semibold text-[var(--color-black)] text-[24px] mt-4 text-left truncate">
                    {user.name} {user.surname}
                </p>
                <p className="text-[15px] text-[var(--color-black)] text-left truncate w-full">{user.email}</p>
                <p className="text-[15px] text-[var(--color-black)] truncate w-full">ID: {user.id}</p>
            </div>

        </div>
    );
}