type Props = {
    show: boolean;
    onToggle: () => void;
};

export default function PasswordToggleButton({ show, onToggle }: Props) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="absolute right-4 top-1/2 -translate-y-1/2"
            aria-label="Показати/сховати пароль"
        >
            <img
                src={`/images/addManagerPageAdmin/${show ? "eye-solid-full 1.png" : "eye-slash-solid-full.png"}`}
                alt=""
                className="w-5 h-5 object-contain opacity-60"
            />
        </button>
    );
}