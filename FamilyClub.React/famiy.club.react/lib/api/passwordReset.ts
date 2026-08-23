import { apiBasePath } from "./services";

async function readError(res: Response): Promise<string> {
  try {
    const data = await res.json();
    if (typeof data?.error === "string") return data.error;
    if (typeof data?.message === "string") return data.message;
    if (data?.errors) {
      const first = Object.values(data.errors).flat()[0];
      if (typeof first === "string") return first;
    }
  } catch {
    /* ignore */
  }
  return "Сталася помилка. Спробуйте ще раз.";
}

export async function requestPasswordResetCode(email: string): Promise<void> {
  const res = await fetch(`${apiBasePath}/api/AuthClubMember/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error(await readError(res));
}

export async function confirmPasswordReset(payload: {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<void> {
  const res = await fetch(`${apiBasePath}/api/AuthClubMember/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: payload.email,
      code: payload.code,
      newPassword: payload.newPassword,
      confirmPassword: payload.confirmPassword,
    }),
  });
  if (!res.ok) throw new Error(await readError(res));
}
