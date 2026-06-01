import { useEffect, useState } from "react";
import { PublisherDto } from "@/app/addPublisher/types";
import { publisherApi } from "@/app/addPublisher/api/publisherApiClient";

const emptyForm: PublisherDto = {
  publisherName: "",
};

export default function useEditPublisherForm(id: number) {
  const [form, setForm] = useState<PublisherDto>(emptyForm);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publisherApi
      .apiPublishersIdGet({ id })
      .then((publisher) => {
        setForm({
          publisherName: publisher.publisherName ?? "",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const setField = <K extends keyof PublisherDto>(
    key: K,
    value: PublisherDto[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return { form, setField, loading };
}