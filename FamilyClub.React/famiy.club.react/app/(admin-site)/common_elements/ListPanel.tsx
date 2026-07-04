export default function ListPanel({ title, href }: { title: string; href: string }) {
    return (
        <div className="flex items-center gap-4 px-5 py-4 bg-[var(--color-white)] rounded-[10px] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.25)]">
            {/* <img src={"/images/admin_manager/desktop/CardBackground.png"} className="w-10 h-10" alt="" /> */}
            <div>
                <p className="text-sm opacity-70">{title}</p>
            </div>
        </div>
    );
}