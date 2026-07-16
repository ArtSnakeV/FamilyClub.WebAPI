"use client";

import ReasonFilteredBlockedUsers from "./ReasonFilteredBlockedUsers";
import SearchBlockedUsers from "./SearcBlockedUsers";
import SortFilteredBlockedUsers from "./SortFilteredBlockedUsers";
import StatusFilteredBlockedUsers from "./StatusFilteredBlockedUsers";

interface Props {
    search: string;
    status: string;
    reason: string;
    sort: string;
    onSortChange: (value: string) => void;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onReasonChange: (value: string) => void;
}

export default function BlockFilteredBlockedUsers({ search, status, reason, sort, onSearchChange, onStatusChange, onReasonChange, onSortChange }: Props) {
    return (
        <div
            className="w-[77vw] max-w-full h-[134px] rounded-1xl overflow-hidden"
            style={{
                backgroundImage: "url('/images/blockedUsersPageAdmin/Rectangle 832.png')",
                backgroundSize: "100% 100%",
            }}
        >
            <div className="mt-[3vh] flex gap-4 items-center justify-start">
                <SearchBlockedUsers value={search} onChange={onSearchChange} />
                <StatusFilteredBlockedUsers status={status} onChange={onStatusChange} />
                <ReasonFilteredBlockedUsers reason={reason} onChange={onReasonChange} />
                <SortFilteredBlockedUsers sort={sort} onChange={onSortChange} />
            </div>
        </div>
    );
}