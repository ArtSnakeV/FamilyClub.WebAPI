"use client";

import { Configuration, ProductsApi } from "@/lib/api/generated";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    productName: "",
    price: "",
    description: "",
    isbn: "",
    publishingDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const api = new ProductsApi(
      new Configuration({ basePath: "https://localhost:7069" }),
    );

    try {
      setLoading(true);

      await api.apiProductsPost({
        productName: form.productName,
        price: Number(form.price),
        description: form.description,
        iSBN: form.isbn,
        publishingDate: form.publishingDate
          ? new Date(form.publishingDate)
          : undefined,
        leaveOldImages: false,
      });

      router.push("/products");
    } catch (err) {
      console.error(err);
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full flex flex-col justify-center bg-cover bg-center relative -top-[98px] pt-[72px] pb-[120px]"
      style={{
        backgroundImage: "url('/images/addProducts/Rectangle 312.svg')",
      }}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-[var(--color-black)] w-[800px] font-['Roboto_Mono'] font-bold text-[64px] leading-[150%] tracking-[-0.011em] text-center">
          Додати нову книгу
        </h1>
        <p className="text-[var(--color-black)] -mt-4 font-sans font-normal text-[32px] leading-[150%] tracking-[-0.011em] text-center align-middle">
          Заповни інформацію
        </p>
      </div>

      <div className="flex relative w-full justify-center gap-[8vw] pt-[48px]">
        <div
          className="w-[645px] h-[720px] bg-cover bg-center "
          style={{
            backgroundImage: "url('/images/addProducts/Rectangle 313.svg')",
          }}
        >
          <div
            className="-ml-[10px] mt-[48px] bg-cover bg-center w-[420px] h-[72px] flex items-center justify-center"
            style={{
              backgroundImage: "url('/images/addProducts/Rectangle 302.svg')",
            }}
          >
            <p className="text-[var(--color-white)] font-['Roboto_Mono'] font-semibold text-[30px] leading-[150%] tracking-[-0.011em] pb-[10px]">
              Основна інформація
            </p>
          </div>
        </div>
        <div
          className="w-[355px] h-[482px] bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/addProducts/Rectangle 305.svg')",
          }}
        ></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-[400px] flex flex-col gap-4 items-center"
      >
        <input
          name="productName"
          placeholder="Name"
          onChange={handleChange}
          className="input"
        />

        <input
          name="price"
          placeholder="Price"
          type="number"
          onChange={handleChange}
          className="input"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="input"
        />

        <input
          name="isbn"
          placeholder="ISBN"
          onChange={handleChange}
          className="input"
        />

        <input
          name="publishingDate"
          type="date"
          onChange={handleChange}
          className="input"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Saving..." : "Create"}
        </button>

        <style jsx>{`
          .input {
            width: 100%;
            border: 1px solid #ddd;
            padding: 8px;
            border-radius: 6px;
          }
        `}</style>
      </form>
    </div>
  );
}
