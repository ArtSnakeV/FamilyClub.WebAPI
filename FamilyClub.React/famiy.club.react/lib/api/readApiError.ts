import { ResponseError } from "@/lib/api/generated/runtime";

/** Reads a human-readable message from API / OpenAPI client errors. */
export async function readApiErrorMessage(
  err: unknown,
  fallback = "Сталася помилка. Спробуйте ще раз."
): Promise<string> {
  if (err instanceof ResponseError) {
    try {
      const data = await err.response.clone().json();
      if (typeof data?.error === "string" && data.error.trim()) {
        return data.error;
      }
      if (typeof data?.message === "string" && data.message.trim()) {
        return data.message;
      }
      if (data?.errors && typeof data.errors === "object") {
        const first = Object.values(data.errors).flat()[0];
        if (typeof first === "string") return first;
      }
      if (typeof data?.title === "string" && data.title.trim()) {
        return data.title;
      }
    } catch {
      /* ignore non-JSON bodies */
    }
    if (err.response.status === 400) {
      return "Перевірте введені дані (пароль, телефон, email).";
    }
  }
  if (err instanceof Error && err.message) {
    return err.message;
  }
  return fallback;
}

