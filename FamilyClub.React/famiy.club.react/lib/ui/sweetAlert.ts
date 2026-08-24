import Swal, { type SweetAlertIcon, type SweetAlertOptions } from "sweetalert2";

type AlertOptions = {
  title?: string;
  icon?: SweetAlertIcon;
  confirmText?: string;
};

type ConfirmOptions = AlertOptions & {
  cancelText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
};

type PromptOptions = ConfirmOptions & {
  inputPlaceholder?: string;
  inputValue?: string;
};

const baseOptions: SweetAlertOptions = {
  customClass: { popup: "librellis-swal" },
  buttonsStyling: true,
  confirmButtonColor: "#005B33",
  cancelButtonColor: "#7E4D1E",
  backdrop: "rgba(36, 36, 36, 0.45)",
};

/** Replaces window.alert() */
export async function showAlert(
  message: string,
  options: AlertOptions = {},
): Promise<void> {
  await Swal.fire({
    ...baseOptions,
    title: options.title ?? "Повідомлення",
    text: message,
    icon: options.icon ?? "info",
    confirmButtonText: options.confirmText ?? "Гаразд",
  });
}

/** Replaces window.confirm() — returns true if user confirmed */
export async function showConfirm(
  message: string,
  options: ConfirmOptions = {},
): Promise<boolean> {
  const result = await Swal.fire({
    ...baseOptions,
    title: options.title ?? "Підтвердження",
    text: message,
    icon: options.icon ?? "warning",
    showCancelButton: true,
    confirmButtonText: options.confirmText ?? "Так",
    cancelButtonText: options.cancelText ?? "Ні",
    reverseButtons: true,
    focusCancel: true,
    ...(options.confirmButtonColor
      ? { confirmButtonColor: options.confirmButtonColor }
      : {}),
    ...(options.cancelButtonColor
      ? { cancelButtonColor: options.cancelButtonColor }
      : {}),
  });

  return result.isConfirmed;
}

/** Replaces window.prompt() — returns string or null if cancelled */
export async function showPrompt(
  message: string,
  options: PromptOptions = {},
): Promise<string | null> {
  const result = await Swal.fire({
    ...baseOptions,
    title: options.title ?? "Введіть значення",
    text: message,
    icon: options.icon ?? "question",
    input: "text",
    inputPlaceholder: options.inputPlaceholder,
    inputValue: options.inputValue ?? "",
    showCancelButton: true,
    confirmButtonText: options.confirmText ?? "OK",
    cancelButtonText: options.cancelText ?? "Скасувати",
    reverseButtons: true,
    inputValidator: (value: string) => {
      if (!value?.trim()) return "Поле не може бути порожнім";
      return undefined;
    },
  });

  if (!result.isConfirmed) return null;
  return String(result.value ?? "");
}

/** Shortcuts for common cases */
export const alertSuccess = (message: string, title = "Готово") =>
  showAlert(message, { title, icon: "success" });

export const alertError = (message: string, title = "Помилка") =>
  showAlert(message, { title, icon: "error" });

export const alertWarning = (message: string, title = "Увага") =>
  showAlert(message, { title, icon: "warning" });
