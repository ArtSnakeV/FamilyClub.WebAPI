interface AddButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function AddEditButton({ children, onClick, type = "button" }: AddButtonProps) 
{
  return (
    <button
      type={type}
      onClick={onClick}
      // className="w-[136.5px] h-[33px] bg-[var(--color-brand-green)] text-white rounded-[9px] pt-[5px] pr-[20px] pb-[5px] pl-[20px] gap-[15px] flex items-center justify-center opacity-100 rotate-0 font-medium text-sm transition-all duration-200 hover:bg-[var(--color-brand-green)] hover:scale-x-[1.073] hover:scale-y-[1.303]"
      className="transition-all duration-200 hover:opacity-90 hover:shadow-[0px_0px_20px_0px_#00000080] active:scale-[0.98] w-[100px] cursor-pointer h-[30px] rounded-[9px] bg-[var(--color-green)] text-[var(--color-white)] flex items-center justify-center gap-2 text-[10px]"
    >
        <img
          src={"/images/admin_manager_layout/add_edit_icon.svg"}
          alt={""}
          className="w-[16px] h-[16px] object-contain"
        />
      <span className=" transition-all duration-200">
        {children}
      </span>
    </button>
  );
}