type Props = {
  value: string;
  loading: boolean;
  onChange: (v: string) => void;
  onLookup: () => void;
};

export default function ISBNForm({
  value,
  loading,
  onChange,
  onLookup,
}: Props) {
  return (
    <>
      <div className="flex items-baseline gap-2 h-[32px]">
        <span className="text-[24px] font-bold">ISBN</span>
        <span className="text-[#00000033] text-[18px]">(13 цифр)</span>
      </div>
      <div className="flex justify-between items-center w-full ">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="5649827409123"
          className="isbn-input rounded-[9px] bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] w-[150px] h-[44px] text-center"
        />
        <button
          type="button"
          onClick={onLookup}
          disabled={loading}
          className="isbn-btn rounded-[9px] bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] w-[250px] h-[44px]"
        >
          {loading ? "Пошук..." : "Автозаповнення за ISBN"}
        </button>
      </div>
    </>
  );
}
