"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { complaintsService } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";
import { ResponseError } from "@/lib/api/generated/runtime";
import type { ComplaintReason } from "./useComplaintForm";
import type { useComplaintImages } from "./useComplaintImages";

type ImagesApi = Pick<
  ReturnType<typeof useComplaintImages>,
  "toCreateDtos"
>;

type SubmitParams = {
  reason: ComplaintReason;
  description: string;
  clubMemberId: string;
  images: ImagesApi;
};

async function parseApiError(err: unknown): Promise<string> {
  if (!(err instanceof ResponseError)) {
    return "Не вдалося надіслати скаргу. Спробуйте ще раз.";
  }

  const status = err.response.status;
  let body = "";
  try {
    body = await err.response.text();
  } catch {
    /* ignore */
  }

  console.error("Complaint API error:", status, body);

  if (status === 401) {
    return "Сесію закінчено. Увійдіть знову та спробуйте ще раз.";
  }
  if (status === 415) {
    return "Помилка формату запиту. Спробуйте оновити сторінку та надіслати знову.";
  }
  if (status === 413) {
    return "Фото занадто великі. Спробуйте менші зображення (до 4 МБ кожне).";
  }
  if (status === 400) {
    if (body.includes("ClubMember") || body.includes("club_member")) {
      return "Обліковий запис не знайдено. Увійдіть знову.";
    }
    return "Невірні дані форми. Перевірте опис та спробуйте ще раз.";
  }
  if (status >= 500) {
    return "Помилка сервера. Переконайтесь, що API запущено, і спробуйте без фото.";
  }

  return `Не вдалося надіслати скаргу (код ${status}).`;
}

export function useSubmitComplaint() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async ({
    reason,
    description,
    clubMemberId,
    images,
  }: SubmitParams) => {
    setSubmitting(true);
    setError(null);

    try {
      const token = typeof window !== "undefined" ? getAuthToken() : null;

      const imageDtos = await images.toCreateDtos();

      await complaintsService.apiComplaintsPost(
        {
          complaintsCreateDto: {
            complaintText: description.trim(),
            complaintType: reason,
            clubMemberId,
            images: imageDtos.length > 0 ? imageDtos : undefined,
          },
        },
        token
          ? async ({ init }) => ({
              headers: {
                ...init.headers,
                Authorization: `Bearer ${token}`,
              },
            })
          : undefined
      );

      setSuccess(true);
      setTimeout(() => router.push("/orders"), 2500);
    } catch (err) {
      console.error("Failed to submit complaint:", err);
      setError(await parseApiError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return { submit, submitting, error, success };
}
