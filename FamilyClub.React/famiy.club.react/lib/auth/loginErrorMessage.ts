import { readApiErrorMessage } from "@/lib/api/readApiError";

/** Maps login API errors to short Ukrainian UI copy. */
export async function loginErrorMessage(err: unknown): Promise<string> {
  const raw = await readApiErrorMessage(err, "Невірний email або пароль");
  if (/locked/i.test(raw)) {
    return "Акаунт тимчасово заблоковано. Спробуйте пізніше.";
  }
  if (/wrong email or password/i.test(raw) || /unauthorized/i.test(raw)) {
    return "Невірний email або пароль";
  }
  return raw;
}
