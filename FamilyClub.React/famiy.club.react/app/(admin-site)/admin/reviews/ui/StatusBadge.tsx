export default function StatusBadge({ approved }: { approved: boolean }) {
    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
                approved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            }`}
        >
            {approved ? "Опубліковано" : "На модерації"}
        </span>
    );
}