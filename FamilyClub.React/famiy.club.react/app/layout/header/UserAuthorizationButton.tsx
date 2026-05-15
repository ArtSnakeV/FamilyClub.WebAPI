export default function UserAuthorizationButton() {
  return (
    <div className="group flex items-center justify-center">
      <div
        className="flex row w-full w-[130px] h-[40px]
          items-center
          justify-center
          rounded-full
          transition-all
          duration-300
          group-hover:bg-[var-(--color-white)]
          group-hover:shadow-[0px_0px_15px_0px_#242424CC]"
      >
        <button className="w-[130px] h-[40px] text-[var(--color-black)] font-normal text-[16px] leading-[150%] tracking-[-0.011em] text-center relative">
          Авторизуватися
        </button>
      </div>
    </div>
  );
}
