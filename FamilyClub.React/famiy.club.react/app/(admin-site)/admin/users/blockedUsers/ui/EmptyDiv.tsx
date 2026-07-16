export default function EmptyDiv() {
    return (
        <div
            className="w-[78.3vw] max-w-full h-auto min-h-[900px] rounded-1xl text-center overflow-hidden"
            style={{
                backgroundImage: "url('/images/usersPageAdmin/Rectangle 793.png')",
                backgroundSize: "100% 100%",
            }}
        >
            <p className="text-lg relative text-gray-500 mt-[10vh] items-center">Користувачів немає</p>
        </div>
    );
}