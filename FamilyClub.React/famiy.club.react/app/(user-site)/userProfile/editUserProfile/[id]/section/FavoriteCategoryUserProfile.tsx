export default function FavoriteCategoryUserProfile() {

    return (
        <div className="w-[560px] h-[712px]"
            style={{
                backgroundImage: "url('/images/userProfile/editUserProfile/Rectangle 314.png')",
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
            }}>
            <div className="relative w-[470px] mt-12">
                <img
                    src="/images/userProfile/editUserProfile/Rectangle 304.png"
                    alt="green"
                    className="w-full h-[74px] object-fill"
                />
                <div className="absolute inset-0 -mt-1 flex flex-col justify-center pl-14">
                    <h3 className="text-[24px] text-[var(--color-white)] font-semibold">Улюблені жанри</h3>
                    <p className="text-[13px] -mt-1 text-[var(--color-white)]">(можна обрати декілька)</p>
                </div>
            </div>
        </div>
    )
}