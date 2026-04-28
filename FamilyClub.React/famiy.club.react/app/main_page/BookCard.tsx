export default function BookCard({ title, price }: any) {
    return (
        <div className="bg-white rounded-xl shadow p-3 hover:scale-105 transition">
            <div className="h-[180px] bg-gray-200 rounded mb-2" />

            <p className="text-sm font-medium">{title}</p>
            <p className="text-green-600 font-bold">{price}</p>
        </div>
    );
}