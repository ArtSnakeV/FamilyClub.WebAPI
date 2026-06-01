import { useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { PublisherDto } from "@/app/addPublisher/types";
import { publisherApi } from "@/app/addPublisher/api/publisherApiClient";

type Props = {
  id: number;
  form: PublisherDto;
  router: AppRouterInstance;
};

export default function useSubmitEditPublisher({ id, form, router }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await publisherApi.apiPublishersIdPut({
        id,
        publisherDto: {
          publisherName: form.publisherName,
        },
      });

      router.push("/publishers");
    } catch (e) {
      console.error(e);
      alert("Помилка при редагуванні видавництва");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    const confirmDelete = confirm("Ви точно хочете видалити це видавництво?");
    if (!confirmDelete) return;

    try {
      await publisherApi.apiPublishersIdDelete({
        id: Number(id),
      });
      router.push("/publishers");
    } catch (e) {
      console.error(e);
      alert("Помилка при видаленні");
    }
  };
  return { handleSubmit, loading, handleDelete };
}
