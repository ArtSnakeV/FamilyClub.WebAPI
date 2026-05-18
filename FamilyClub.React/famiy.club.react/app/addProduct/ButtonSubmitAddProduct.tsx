export default function ButtonSubmitAddProduct() {
  return (
    <div className="w-[355px] flex flex-col gap-4 text-[20px] font-medium">
      <button
        type="button"
        className="
          w-full h-[60px]
          rounded-[55px]
          bg-[var(--color-green)]
          text-[var(--color-white)]
          transition-all duration-200
          hover:opacity-90
          hover:shadow-[0px_0px_20px_0px_#00000080]
          active:scale-[0.98]
        "
      >
        Опублікувати
      </button>

      <button
        type="button"
        className="
          w-full h-[60px]
          rounded-[55px]
          border-2 border-[#005B3380]
          text-[#005B33]
          bg-transparent
          transition-all duration-200
          hover:bg-[#005B3310]
          active:scale-[0.98]
        "
      >
        Зберегти як чернетку
      </button>

      <button
        type="button"
        className="
          w-full h-[60px]
          rounded-[55px]
          bg-[#24242480]
          text-white
          transition-all duration-200
          hover:bg-[#D62121]
          active:scale-[0.98]
        "
      >
        Скасувати
      </button>
    </div>
  );
}
