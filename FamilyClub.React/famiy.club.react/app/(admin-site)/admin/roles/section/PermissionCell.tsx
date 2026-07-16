interface PermissionCellProps {
    allowed: boolean;
    onToggle?: () => void;
}

export default function PermissionCell({ allowed, onToggle }: PermissionCellProps) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="mx-auto flex h-8 w-8 items-center justify-center rounded-full transition hover:scale-105"
            style={{
                backgroundColor: allowed ? "#1F7A4D" : "#D9D9D9",
            }}
            aria-label={allowed ? "Доступ дозволено" : "Доступ заборонено"}
        >
            {allowed ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                        d="M2.5 7.2L5.7 10.4L11.5 3.8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ) : (
                <svg width="12" height="2" viewBox="0 0 12 2" fill="none" aria-hidden="true">
                    <rect width="12" height="2" rx="1" fill="white" />
                </svg>
            )}
        </button>
    );
}
