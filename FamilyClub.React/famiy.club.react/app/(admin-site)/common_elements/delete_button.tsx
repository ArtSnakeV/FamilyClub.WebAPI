interface AddButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function DeleteButton({ children, onClick, type = "button" }: AddButtonProps) 
{
  return (
    <button
      type={type}
      onClick={onClick}
      // className="w-[136.5px] h-[33px] bg-[var(--color-brand-white)] text-[var(--color-brand-green)] rounded-[9px] pt-[5px] pr-[20px] pb-[5px] pl-[20px] gap-[15px] flex items-center justify-center opacity-100 rotate-0 font-medium text-sm transition-all duration-200 hover:bg-[var(--color-brand-white)] hover:scale-x-[1.073] hover:scale-y-[1.303] border-[2px] border-[var(--color-brand-green)]"
      className="border-2 w-[100px] border-[#005B3380] text-[#005B33] bg-transparent transition-all duration-200 hover:bg-[#005B3310] active:scale-[0.98] h-[30px] rounded-[9px] flex items-center justify-center gap-4 text-[10px]"
    >
        <img
          src={"/images/admin_manager_layout/delete_icon.svg"}
          alt={""}
          className="w-[16px] h-[16px] object-contain"
        />
      <span className=" transition-all duration-200">
        {children}
      </span>
    </button>
  );
}