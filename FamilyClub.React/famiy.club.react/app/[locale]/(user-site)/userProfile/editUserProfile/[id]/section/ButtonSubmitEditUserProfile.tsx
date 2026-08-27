type Props = {
  onSave?: () => void;
  onCancel?: () => void;
  loading?: boolean;
};

export default function ButtonSubmitEditUserProfile({
  onSave,
  onCancel,
  loading,
}: Props) {
  return (
    <div className="w-[530px] flex flex-col gap-4 text-[18px] font-medium">
      <button
        type="button"
        disabled={loading}
        onClick={onSave}
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
        Зберегти
      </button>

      <button
        type="button"
        onClick={onCancel}
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
