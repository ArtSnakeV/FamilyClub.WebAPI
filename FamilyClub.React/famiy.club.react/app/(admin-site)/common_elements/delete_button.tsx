"use client";

interface DeleteButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function DeleteButton({
  children,
  onClick,
  type = "button",
}: DeleteButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="border-2 w-[100px] border-[var(--color-green)] text-[var(--color-green)] bg-transparent transition-all duration-200 hover:bg-[color-mix(in_srgb,var(--color-green)_10%,transparent)] active:scale-[0.98] h-[30px] rounded-[9px] flex items-center justify-center gap-4 text-[10px]"
    >
      <span
        aria-hidden
        className="w-[16px] h-[16px] bg-[var(--color-green)]"
        style={{
          maskImage: "url('/images/admin_manager_layout/delete_icon.svg')",
          WebkitMaskImage: "url('/images/admin_manager_layout/delete_icon.svg')",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      />
      <span className="transition-all duration-200">{children}</span>
    </button>
  );
}
