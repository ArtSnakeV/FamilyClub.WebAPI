// "use client";

// import {
//   Configuration,
//   ProductsApi,
//   AuthorsApi,
//   PublishersApi,
//   PublisherDto,
//   AuthorDTO,
//   CategoryDto,
//   CategoriesApi,
//   LanguageDto,
//   LanguagesApi,
//   AgeRestriction,
//   Availability,
//   FormatDto,
//   FormatsApi,
//   CoverType,
//   BookSizeDto,
//   BookSizesApi,
// } from "@/lib/api/generated";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import AuthorSelectForm from "./AuthorSelectForm";
// import PublisherSelectForm from "./PublisherSelectForm";
// import ISBNForm from "./ISBNForm";
// import LanguageSelectForm from "./LanguageSeletForm";
// import AgeRestrictions from "./AgeRestrictions";
// import CoverTypeSelect from "./CoverTypeSelect";
// import BookSizeSelectForm from "./BookSizeSelectForm";
// import FormatBook from "./FormatBook";
// import Image from "next/image";
// import ellipse from "@/public/images/addProducts/Ellipse 36.svg";
// import plus from "@/public/images/addProducts/plus-solid-full 1.svg";
// import CategoryList from "./CategoryList";
// import ButtonSubmitAddProduct from "./ButtonSubmitAddProduct";
// import AvailabilitySelector from "./AvailabilitySelector";

// /* ---------------- TYPES ---------------- */
// type ProductDto = {
//   productName: string;
//   price?: number;
//   discountPrice?: number;
//   description?: string;
//   publisherId?: number;
//   originalTitle?: string;
//   pageCount?: number;
//   publishingYear?: number;
//   originalLanguageId?: number;
//   isbn?: string;
//   promotionId?: number;
//   productCode?: string;
//   weightGrams?: number;
//   itemsInSet?: number;
//   ageRestrictions?: AgeRestriction;
//   categoryIds: number[];
//   languageId?: number;
//   coverType: CoverType;
//   availability?: Availability;
//   authorIds?: number[];
//   formatIds?: number[];
//   leaveOldImages: boolean;
//   quantityInStock?: number;
//   bookSizeIds: number[];
// };
// type FormState = {
//   dto: ProductDto;
// };

// export default function AddProductPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [authors, setAuthors] = useState<AuthorDTO[]>([]);
//   const [publishers, setPublishers] = useState<PublisherDto[]>([]);
//   const [categories, setCategories] = useState<CategoryDto[]>([]);
//   const [languages, setLanguages] = useState<LanguageDto[]>([]);
//   const [formats, setFormats] = useState<FormatDto[]>([]);
//   const [bookSize, setBookSizes] = useState<BookSizeDto[]>([]);

//   const [form, setForm] = useState<FormState>({
//     dto: {
//       productName: "",
//       description: "",
//       pageCount: undefined,
//       itemsInSet: 1,
//       ageRestrictions: undefined,
//       categoryIds: [],
//       languageId: undefined,
//       coverType: CoverType.NUMBER_0,
//       availability: undefined,
//       leaveOldImages: false,
//       quantityInStock: undefined,
//       bookSizeIds: [],
//       publisherId: undefined,
//       authorIds: [],
//       formatIds: [],
//       price: undefined,
//       discountPrice: undefined,
//       isbn: undefined,
//       publishingYear: undefined,
//     },
//   });

//   const api = new ProductsApi(
//     new Configuration({ basePath: "https://localhost:7069" }),
//   );

//   const authorsApi = new AuthorsApi(
//     new Configuration({ basePath: "https://localhost:7069" }),
//   );

//   const publishersApi = new PublishersApi(
//     new Configuration({ basePath: "https://localhost:7069" }),
//   );

//   const categoriesApi = new CategoriesApi(
//     new Configuration({ basePath: "https://localhost:7069" }),
//   );

//   const languagesApi = new LanguagesApi(
//     new Configuration({ basePath: "https://localhost:7069" }),
//   );
//   const formatsApi = new FormatsApi(
//     new Configuration({ basePath: "https://localhost:7069" }),
//   );
//   const bookSizesApi = new BookSizesApi(
//     new Configuration({ basePath: "https://localhost:7069" }),
//   );

//   useEffect(() => {
//     const loadData = async () => {
//       const [a, p, c, l, f, b] = await Promise.all([
//         authorsApi.apiAuthorsGet(),
//         publishersApi.apiPublishersGet(),
//         categoriesApi.apiCategoriesGet(),
//         languagesApi.apiLanguagesGet(),
//         formatsApi.apiFormatsGet(),
//         bookSizesApi.apiBookSizesGet(),
//       ]);
//       setAuthors(a);
//       setPublishers(p);
//       setCategories(c);
//       setLanguages(l);
//       setFormats(f);
//       setBookSizes(b);
//     };

//     loadData();
//   }, []);

//   /* ---------------- HELPERS ---------------- */
//   const setDto = <K extends keyof ProductDto>(key: K, value: ProductDto[K]) => {
//     setForm((prev) => ({
//       ...prev,
//       dto: {
//         ...prev.dto,
//         [key]: value,
//       },
//     }));
//   };

//   const toggleCategory = (id: number) => {
//     setDto(
//       "categoryIds",
//       form.dto.categoryIds.includes(id)
//         ? form.dto.categoryIds.filter((c) => c !== id)
//         : [...form.dto.categoryIds, id],
//     );
//   };

//   /* ---------------- FILES ---------------- */

//   const [mainImage, setMainImage] = useState<File | null>(null);
//   const [mainPreview, setMainPreview] = useState<string | null>(null);

//   const [gallery, setGallery] = useState<(File | null)[]>([
//     null,
//     null,
//     null,
//     null,
//   ]);

//   const handleMainChange = (file: File | null) => {
//     if (!file) return;
//     setMainImage(file);
//     setMainPreview(URL.createObjectURL(file));
//   };

//   const handleGalleryChange = (index: number, file: File | null) => {
//     const updated = [...gallery];
//     updated[index] = file;
//     setGallery(updated);
//   };

//   /* ---------------- ISBN ---------------- */

//   const handleIsbnLookup = async () => {
//     if (!form.dto.isbn || form.dto.isbn.length < 10) return;

//     setLoading(true);

//     try {
//       const res = await fetch(
//         `https://openlibrary.org/api/books?bibkeys=ISBN:${form.dto.isbn}&format=json&jscmd=data`,
//       );

//       const data = await res.json();
//       const book = data[`ISBN:${form.dto.isbn}`];

//       if (!book) return;

//       setForm((p) => ({
//         ...p,
//         dto: {
//           ...p.dto,
//           productName: book.title ?? p.dto.productName,
//           description:
//             typeof book.description === "string"
//               ? book.description
//               : (book.description?.value ?? p.dto.description),
//           pageCount: book.number_of_pages ?? p.dto.pageCount,
//         },
//       }));
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- SUBMIT---------------- */

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const productImageFiles: File[] = [];
//       const publishingDate = form.dto.publishingYear
//         ? `${form.dto.publishingYear}-01-01`
//         : undefined;

//       if (mainImage) productImageFiles.push(mainImage);
//       gallery.forEach((f) => f && productImageFiles.push(f));
//       await api.apiProductsPost({
//         // DTO
//         productName: form.dto.productName,
//         description: form.dto.description,
//         price: form.dto.price,
//         discountPrice: form.dto.discountPrice,
//         pageCount: form.dto.pageCount,
//         publishingDate: publishingDate as unknown as Date,
//         weightGrams: form.dto.weightGrams,
//         itemsInSet: form.dto.itemsInSet,
//         availability: form.dto.availability,
//         ageRestriction: form.dto.ageRestrictions,
//         formatIds: form.dto.formatIds,
//         languageIds: form.dto.languageId ? [form.dto.languageId] : undefined,
//         publisherId: form.dto.publisherId,
//         categoryIds: form.dto.categoryIds,
//         coverType: form.dto.coverType,
//         authorIds: form.dto.authorIds,
//         bookSizeIds: form.dto.bookSizeIds,
//         quantityInStock: form.dto.quantityInStock,
//         iSBN: form.dto.isbn,
//         productImageFiles,
//       });

//       router.push("/products");
//     } catch (err: unknown) {
//       console.error("FULL ERROR:", err);

//       if (typeof err === "object" && err !== null && "response" in err) {
//         const response = (err as { response?: Response }).response;

//         const text = await response?.text?.();

//         console.error("SERVER RESPONSE:", text);
//       }

//       alert("Помилка при створенні продукту");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen flex flex-col">
//       <div
//         className="relative w-[1200px] pb-[60px] -mt-[68px] mx-auto bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: "url('/images/addProducts/Rectangle 312.svg')",
//         }}
//       >
//         <div className="flex flex-col items-center mt-[100px]">
//           <h1 className="text-[var(--color-black)] w-[800px] font-['Roboto_Mono'] font-bold text-[64px] leading-[150%] tracking-[-0.011em] text-center">
//             Додати нову книгу
//           </h1>
//           <p className="text-[var(--color-black)] -mt-4 font-sans font-normal text-[32px] leading-[150%] tracking-[-0.011em] text-center align-middle">
//             Заповни інформацію
//           </p>
//         </div>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleSubmit();
//           }}
//         >
//           <div className="w-full flex mt-[48px] gap-[4vw] justify-center">
//             {/* --- Лівий блок --- */}
//             <div className="w-[645px] flex flex-col ">
//               <div className="w-full h-[720px] flex">
//                 <div
//                   className="w-full h-full bg-cover bg-center"
//                   style={{
//                     backgroundImage:
//                       "url('/images/addProducts/Rectangle 313.svg')",
//                   }}
//                 >
//                   <div
//                     className="-ml-[10px] mt-[48px] bg-cover bg-center w-[420px] h-[72px] flex items-center justify-center"
//                     style={{
//                       backgroundImage:
//                         "url('/images/addProducts/Rectangle 302.svg')",
//                     }}
//                   >
//                     <p className="text-[var(--color-white)] font-['Roboto_Mono'] font-semibold text-[24px] leading-[150%] tracking-[-0.011em] pb-[10px]">
//                       Основна інформація
//                     </p>
//                   </div>

//                   <div className="w-[560px] mt-[6px] ml-[38px] flex flex-col gap-2">
//                     <div className="flex flex-col gap-1">
//                       <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
//                         Назва книги *
//                       </p>
//                       <input
//                         name="productName"
//                         placeholder="Назва"
//                         value={form.dto.productName}
//                         onChange={(e) => setDto("productName", e.target.value)}
//                         className={`input rounded-[9px] px-3 bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px] placeholder:text-gray-500 placeholder:px-3`}
//                       />
//                     </div>

//                     <div className="flex flex-col gap-1">
//                       <AuthorSelectForm
//                         authors={authors}
//                         value={form.dto.authorIds}
//                         onChange={(ids) => setDto("authorIds", ids)}
//                       />
//                     </div>

//                     <div className="flex flex-col gap-1">
//                       <PublisherSelectForm
//                         publishers={publishers}
//                         value={form.dto.publisherId}
//                         onChange={(id) => setDto("publisherId", id)}
//                       />
//                     </div>

//                     <div className="flex flex-col gap-1">
//                       <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
//                         Опис *
//                       </p>
//                       <textarea
//                         name="description"
//                         placeholder="Опис книги"
//                         onChange={(e) => setDto("description", e.target.value)}
//                         className="px-2 input-field h-[120px] resize-none input rounded-[9px] bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040]"
//                       />
//                     </div>

//                     <div className="flex flex-col gap-1 h-[88px] pb-[20px]">
//                       <ISBNForm
//                         value={form.dto.isbn ?? ""}
//                         loading={loading}
//                         onChange={(v) => setDto("isbn", v)}
//                         onLookup={handleIsbnLookup}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* --- Характеристики --- */}
//               <div className="w-full h-[950px] flex mt-[48px]">
//                 <div
//                   className="w-full h-full bg-cover bg-center"
//                   style={{
//                     backgroundImage:
//                       "url('/images/addProducts/Rectangle 314.svg')",
//                   }}
//                 >
//                   <div
//                     className="-ml-[10px] mt-[48px] bg-cover bg-center w-[420px] h-[72px] flex items-center justify-center"
//                     style={{
//                       backgroundImage:
//                         "url('/images/addProducts/Rectangle 302.svg')",
//                     }}
//                   >
//                     <p className="text-[var(--color-white)] font-['Roboto_Mono'] font-semibold text-[24px] leading-[150%] tracking-[-0.011em] pb-[10px]">
//                       Характеристики
//                     </p>
//                   </div>

//                   <div className="w-[560px]  mt-[6px] ml-[38px] flex flex-col gap-2">
//                     <div className="flex flex-row gap-4 justify-between p-2 h-[88px]">
//                       <div className="flex flex-col gap-1 w-[250px]">
//                         <LanguageSelectForm
//                           languages={languages}
//                           value={form.dto.languageId}
//                           onChange={(id) => setDto("languageId", id)}
//                         />
//                       </div>
//                       <div className="flex flex-col gap-1 w-[250px]">
//                         <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
//                           Рік видання *
//                         </p>
//                         <input
//                           className="input-field px-4 rounded-[9px] bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px]"
//                           type="number"
//                           placeholder={String(new Date().getFullYear())}
//                           value={form.dto.publishingYear ?? ""}
//                           onChange={(e) =>
//                             setDto(
//                               "publishingYear",
//                               e.target.value === ""
//                                 ? undefined
//                                 : Number(e.target.value),
//                             )
//                           }
//                         />
//                       </div>
//                     </div>

//                     <div className="flex flex-row gap-4 justify-between p-2 h-[88px]">
//                       <div className="flex flex-col gap-1 w-[250px]">
//                         <AgeRestrictions
//                           value={form.dto.ageRestrictions}
//                           onChange={(v) => setDto("ageRestrictions", v)}
//                         />
//                       </div>
//                       <div className="flex flex-col gap-1 w-[250px]">
//                         <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
//                           Кількість сторінок *
//                         </p>
//                         <input
//                           className="input-field rounded-[9px] px-4 bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px]"
//                           type="number"
//                           placeholder="567"
//                           value={form.dto.pageCount ?? ""}
//                           onChange={(e) =>
//                             setDto(
//                               "pageCount",
//                               e.target.value === ""
//                                 ? undefined
//                                 : Number(e.target.value),
//                             )
//                           }
//                         />
//                       </div>
//                     </div>

//                     <div className="flex flex-row gap-4 justify-between p-2 h-[88px]">
//                       <div className="flex flex-col gap-1 w-[250px]">
//                         <BookSizeSelectForm
//                           value={form.dto.bookSizeIds?.[0]}
//                           formats={bookSize}
//                           onChange={(id) =>
//                             setDto("bookSizeIds", id ? [id] : [])
//                           }
//                         />
//                       </div>
//                       <div className="flex flex-col gap-1 w-[250px]">
//                         <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
//                           Вага
//                         </p>
//                         <input
//                           className="input-field rounded-[9px] px-4 bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px]"
//                           type="number"
//                           placeholder="1180g"
//                           value={form.dto.weightGrams ?? ""}
//                           onChange={(e) =>
//                             setDto(
//                               "weightGrams",
//                               e.target.value === ""
//                                 ? undefined
//                                 : Number(e.target.value),
//                             )
//                           }
//                         />
//                       </div>
//                     </div>

//                     <div className="flex flex-col gap-1 p-2 h-[88px]">
//                       <CoverTypeSelect
//                         value={form.dto.coverType}
//                         onChange={(v) => setDto("coverType", v)}
//                       />
//                     </div>

//                     <div className="flex flex-row gap-1 h-[164px] justify-between p-2">
//                       <div className="flex flex-col gap-1 w-[250px]">
//                         <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
//                           Кількість товару в наявності
//                         </p>
//                         <input
//                           className="input-field rounded-[9px] px-4 bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px]"
//                           type="number"
//                           value={form.dto.quantityInStock ?? ""}
//                           onChange={(e) =>
//                             setDto(
//                               "quantityInStock",
//                               e.target.value === ""
//                                 ? undefined
//                                 : Number(e.target.value),
//                             )
//                           }
//                         />
//                       </div>
//                       <div className="flex flex-col gap-1 w-[250px]">
//                         <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
//                           Кількість товару в наборі
//                         </p>
//                         <input
//                           className="input-field rounded-[9px] px-4 bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px]"
//                           type="number"
//                           value={form.dto.itemsInSet ?? ""}
//                           onChange={(e) =>
//                             setDto(
//                               "itemsInSet",
//                               e.target.value === ""
//                                 ? undefined
//                                 : Number(e.target.value),
//                             )
//                           }
//                         />
//                       </div>
//                     </div>

//                     <div className="flex flex-col h-[200px] pb-[20px]">
//                       <FormatBook
//                         value={form.dto.formatIds}
//                         formats={formats}
//                         onChange={(ids) => setDto("formatIds", ids)}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* --- Жанри --- */}
//               <div className="w-[645px] h-[622px] flex mt-[48px]">
//                 <div
//                   className="w-full h-full bg-cover bg-center"
//                   style={{
//                     backgroundImage:
//                       "url('/images/addProducts/Rectangle 314.png')",
//                   }}
//                 >
//                   <div
//                     className="-ml-[10px] mt-[48px] bg-cover bg-center w-[312px] h-[77px] text-[var(--color-white)]"
//                     style={{
//                       backgroundImage:
//                         "url('/images/addProducts/Rectangle 304.png')",
//                     }}
//                   >
//                     <div className="ml-[60px] w-[262px] gap-4 flex flex-col">
//                       <p className="h-[25px] font-['Roboto_Mono'] font-semibold text-[32px] leading-[150%] tracking-[-0.011em] ">
//                         Жанри
//                       </p>
//                       <p className="h-[12px]">(можна обрати декілька)</p>
//                     </div>
//                     <CategoryList
//                       categories={categories}
//                       selectedIds={form.dto.categoryIds}
//                       onToggle={toggleCategory}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* --- Правий блок --- */}

//             <div className="w-[355px] flex flex-col gap-[48px]">
//               <div className="flex justify-center items-center">
//                 <p className="font-['Roboto_Mono'] font-bold text-[48px] leading-[150%] tracking-[-0.011em] text-center">
//                   Головне фото
//                 </p>
//               </div>
//               <div
//                 className="h-[482px] bg-cover bg-center flex flex-col items-center justify-center"
//                 style={{
//                   backgroundImage:
//                     "url('/images/addProducts/Rectangle 305.svg')",
//                 }}
//               >
//                 <label className="flex gap-[30px] flex-col items-center justify-center cursor-pointer">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     hidden
//                     onChange={(e) =>
//                       handleMainChange(
//                         e.target.files ? e.target.files[0] : null,
//                       )
//                     }
//                   />

//                   {mainPreview ? (
//                     <div className="w-full h-full relative  overflow-hidden">
//                       <img
//                         src={mainPreview}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   ) : (
//                     <div className="w-full flex flex-col items-center justify-center">
//                       <div className="relative w-[146px] h-[146px] flex items-center justify-center">
//                         <Image src={ellipse} alt="ellipse" />
//                         <Image
//                           src={plus}
//                           alt="plus"
//                           className="absolute w-[88px] h-[88px]"
//                         />
//                       </div>
//                       <div className="w-full mt-[20px]">
//                         <p className="mt-4 text-[18px] text-center">
//                           JPG, PNG, max 5MB, 345x500px
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </label>
//               </div>

//               <div className="h-[540px] flex flex-col items-center">
//                 <div className="w-full flex justify-center items-center mb-4">
//                   <p className="font-['Roboto_Mono'] font-bold text-[24px] leading-[150%] tracking-[-0.011em] text-center">
//                     Додаткові фото
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-[46px]">
//                   {gallery.map((item, index) => (
//                     <label
//                       key={index}
//                       className="w-[157px] h-[213px]  border-[#242424] rounded-[9px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
//                       style={{
//                         backgroundImage:
//                           "url('/images/addProducts/Rectangle 305.svg')",
//                       }}
//                     >
//                       <input
//                         type="file"
//                         accept="image/*"
//                         hidden
//                         onChange={(e) =>
//                           handleGalleryChange(
//                             index,
//                             e.target.files ? e.target.files[0] : null,
//                           )
//                         }
//                       />

//                       {item ? (
//                         <img
//                           src={URL.createObjectURL(item)}
//                           className="w-full h-full object-contain"
//                         />
//                       ) : (
//                         <div className="relative flex items-center justify-center">
//                           <Image
//                             src={ellipse}
//                             alt="ellipse"
//                             className="w-[64px] h-[64px]"
//                           />
//                           <Image
//                             src={plus}
//                             alt="plus"
//                             className="absolute w-[38px] h-[38px]"
//                           />
//                         </div>
//                       )}
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               <div className="w-full h-[594px] flex mt-[120px] text-[var(--color-white)] ">
//                 <div
//                   className="w-full h-full bg-cover bg-center"
//                   style={{
//                     backgroundImage:
//                       "url('/images/addProducts/Rectangle 315.svg')",
//                   }}
//                 >
//                   <div className="w-full h-full flex flex-col items-center  -ml-[6px] mt-[38px]">
//                     <div className="relative w-[308px] h-[116px] -ml-[40px]">
//                       <img
//                         src="/images/addProducts/Rectangle 304.svg"
//                         alt=""
//                         className="w-full h-full"
//                         style={{ objectFit: "fill" }}
//                       />
//                       <div className="absolute inset-0 -mt-[14px] flex items-center ml-[40px] justify-start">
//                         <p className="font-['Roboto_Mono'] font-semibold text-[28px] leading-[100%] tracking-[-0.011em]">
//                           Продаж та наявність
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex flex-col gap-1 w-[250px]">
//                       <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
//                         Ціна *
//                       </p>
//                       <input
//                         className="input-field w-full rounded-[9px] text-[var(--color-black)] px-4 bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px]"
//                         id="price"
//                         name="price"
//                         type="number"
//                         placeholder=""
//                         value={form.dto.price ?? ""}
//                         onChange={(e) =>
//                           setDto(
//                             "price",
//                             e.target.value === ""
//                               ? undefined
//                               : Number(e.target.value),
//                           )
//                         }
//                       />
//                     </div>

//                     <div className="flex flex-col gap-1 w-[250px] mt-8">
//                       <p className="text-[var(--color-black)] font-sans-pro font-normal text-[24px] leading-[150%] tracking-[-0.011em]">
//                         Знижка *
//                       </p>

//                       <input
//                         className="input-field w-full rounded-[9px] text-[var(--color-black)] px-4 bg-[var(--color-white)] shadow-[0px_0px_10px_0px_#00000040] h-[44px]"
//                         id="discountPrice"
//                         name="discountPrice"
//                         type="number"
//                         placeholder="0"
//                         value={form.dto.discountPrice ?? ""}
//                         onChange={(e) =>
//                           setDto(
//                             "discountPrice",
//                             e.target.value === ""
//                               ? undefined
//                               : Number(e.target.value),
//                           )
//                         }
//                       />
//                     </div>

//                     <div className="flex flex-col items-center w-[250px] mt-0">
//                       <AvailabilitySelector
//                         value={form.dto.availability}
//                         onChange={(value) => setDto("availability", value)}
//                       />
//                     </div>
//                     <div className="relative flex flex-col items-center mt-[140px]">
//                       <ButtonSubmitAddProduct
//                         loading={loading}
//                         onPublish={handleSubmit}
//                         onSaveDraft={() => console.log("draft")}
//                         onCancel={() => router.push("/products")}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { useProductForm } from "./hooks/useProductForm";
import { useProductData } from "./hooks/useProductData";
import { useImageUpload } from "./hooks/useImageUpload";
import { useSubmitProduct } from "./hooks/useSubmitProduct";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { CharacteristicsSection } from "./sections/CharacteristicsSection";
import { GenresSection } from "./sections/GenresSection";
import { ImageUploadSection } from "./sections/ImageUploadSection";
import { SaleSection } from "./sections/SaleSection";
import { useISBNLookup } from "./hooks/useISBNLookup";
import { useEffect } from "react";

export default function AddProductPage() {
  const router = useRouter();
  const { form, setField, toggleCategory, saveDraft, clearDraft } =
    useProductForm();
  const data = useProductData();
  const images = useImageUpload();
  const { handleSubmit, loading } = useSubmitProduct({
    form,
    images,
    router,
    clearDraft,
  });
  const { isbnLoading, handleIsbnLookup } = useISBNLookup({
    form,
    setField,
  });
  useEffect(() => {
    document.body.style.backgroundImage =
      "url('/images/addProducts/Rectangle 326.png')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundAttachment = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
    };
  }, []);
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div
        className="relative w-[900px] pb-[60px] ml-[16.8vw] -mt-[68px] mx-auto bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/addProducts/Rectangle 312.svg')",
        }}
      >
        <div className="flex flex-col items-center mt-[100px]">
          <h1 className="text-[var(--color-black)] w-[600px] font-['Roboto_Mono'] font-bold text-[44px] leading-[150%] tracking-[-0.011em] text-center">
            Додати нову книгу
          </h1>
          <p className="text-[var(--color-black)] -mt-2 font-sans font-normal text-[22px] leading-[150%] tracking-[-0.011em] text-center">
            Заповни інформацію
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="w-full flex mt-[30px] gap-[4vw] relative z-10 justify-center">
            <div className="w-[450px] flex flex-col">
              <BasicInfoSection
                form={form}
                setField={setField}
                authors={data.authors}
                publishers={data.publishers}
                loading={loading}
                onIsbnLookup={handleIsbnLookup}
                isbnLoading={isbnLoading}
              />
              <CharacteristicsSection
                form={form}
                setField={setField}
                languages={data.languages}
                formats={data.formats}
                bookSizes={data.bookSizes}
                ageRestrictions={data.ageRestrictions}
              />
              <GenresSection
                categories={data.categories}
                selectedIds={form.categoryIds}
                onToggle={toggleCategory}
              />
            </div>

            <div className="w-[300px] flex flex-col mt-1 relative left-3 gap-[40px]">
              <ImageUploadSection images={images} />
              <SaleSection
                form={form}
                setField={setField}
                loading={loading}
                onPublish={handleSubmit}
                onSaveDraft={saveDraft}
                onCancel={() => {
                  clearDraft();
                  router.push("/products");
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
