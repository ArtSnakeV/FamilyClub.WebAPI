"use client";

import Image from "next/image";
import Link from "next/link";
import ellipse from "@/public/images/userProfile/Ellipse 36.png";
import plus from "@/public/images/userProfile/plus-solid-full 1.png";
import { usePathname } from "next/navigation";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  AuthorDTO,
  AuthorsApi,
  Configuration,
  ProductDto,
  ProductsApi,
} from "@/lib/api/generated";
import { authorService, productService } from "@/lib/api/services";

type Props = {
  subscriptions?: () => void;
  onLibrary?: () => void;
  community?: () => void;
};

export default function UserSideBArProfile({
  subscriptions,
  onLibrary,
  community,
}: Props) {
  const pathname = usePathname();
  const [selected, setSelected] = useState("Бібліотека");
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [authors, setAuthors] = useState<AuthorDTO[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   console.log("API BASE:", productService);

  //   productService
  //     .apiProductsGet()
  //     .then((res) => {
  //       console.log("PRODUCTS RAW:", res);
  //       setProducts(res);
  //     })
  //     .catch(console.error);

  //   authorService
  //     .apiAuthorsGet()
  //     .then((res) => {
  //       console.log("AUTHORS RAW:", res);
  //       setAuthors(res);
  //     })
  //     .catch(console.error);
  // }, []);
  useEffect(() => {
    const config = new Configuration({ basePath: "https://localhost:7069" });

    new ProductsApi(config)
      .apiProductsGet()
      .then(setProducts)
      .catch(console.error);
    new AuthorsApi(config)
      .apiAuthorsGet()
      .then(setAuthors)
      .catch(console.error);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  function getProductAuthors(product: ProductDto): AuthorDTO[] {
    if (!product.authorIds?.length) return [];
    return authors.filter((a) => product.authorIds!.includes(a.id!));
  }

  function authorFullName(a: AuthorDTO): string {
    return a.authorName ?? "";
  }

  const q = search.toLowerCase();

  const filteredAuthors =
    search.trim() === ""
      ? []
      : authors.filter((a) => a.authorName?.toLowerCase().includes(q));

  const filteredProducts =
    search.trim() === ""
      ? []
      : products.filter((p) => p.productName?.toLowerCase().includes(q));

  const hasResults = filteredAuthors.length > 0 || filteredProducts.length > 0;

  const handleSelect = (value: string, action?: () => void) => {
    setSelected(value);
    action?.();
  };

  return (
    <div
      className="w-[268px] left-0 absolute"
      style={{
        top: "40px",
        width: "268px",
        height: "100%",
        backgroundImage: "url('/images/userProfile/Rectangle 360.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      {/* ── Верхній блок з фоном (Додати газету + Меню) ── */}
      <div
        className="w-[248px] left-0 relative"
        style={{
          top: "60px",
          width: "248px",
          height: "220px",
          backgroundImage: "url('/images/userProfile/Rectangle 313.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      >
        {/* Блок "Додати газету" */}
        <div className="relative flex flex-col top-[20px] items-center justify-center">
          <p className="font-source-sans font-semibold text-[16px] leading-[150%] tracking-[-0.011em] text-center align-middle">
            Додати газету
          </p>
          <div className="relative flex z-50 items-center justify-center mt-2">
            <Image src={ellipse} alt="ellipse" className="w-[36px] h-[36px]" />
            <Image
              src={plus}
              alt="plus"
              className="absolute w-[26px] h-[26px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>

        {/* Блок Випадаючого Меню */}
        <div
          className="w-[260px] relative top-[30px] z-30"
          style={{ width: "100%", left: "-8px" }}
        >
          <Menu as="div" className="relative w-full">
            {({ open: menuOpen }) => (
              <div className="w-full bg-[#F5F3EE]  rounded-2xl overflow-hidden transition-all duration-300 ease-in-out">
                <MenuButton
                  style={{ paddingLeft: "88px" }}
                  className="w-full flex items-center justify-between px-4 py-3 text-[16px] font-semibold text-black outline-none"
                >
                  <span>{selected}</span>
                  <img
                    src="/images/header/Vector.svg"
                    alt="arrow"
                    className={`w-[14px] h-[8px] transition-transform duration-200 ${
                      menuOpen ? "rotate-180" : ""
                    }`}
                  />
                </MenuButton>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-150"
                  enterFrom="opacity-0 -translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 -translate-y-1"
                >
                  <MenuItems className="outline-none pb-4">
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={() =>
                            handleSelect("Підписки", subscriptions)
                          }
                          className={`w-full px-4 py-4 text-left text-[16px] font-semibold ${
                            active ? "bg-[#ECE7DF]" : ""
                          } ${selected === "Підписки" ? "font-bold text-[#A87E52]" : ""}`}
                          style={{ textAlign: "center" }}
                        >
                          Підписки
                        </button>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={() =>
                            handleSelect("Групи спільнот", community)
                          }
                          className={`w-full px-4 py-2.5 text-left text-[16px] font-semibold ${
                            active ? "bg-[#ECE7DF]" : ""
                          } ${selected === "Групи спільнот" ? "font-bold text-[#A87E52]" : ""}`}
                          style={{ textAlign: "center" }}
                        >
                          Групи спільнот
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </div>
            )}
          </Menu>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative flex items-center"
        style={{ top: "0px", left: "38px" }}
      >
        <div className="flex items-center bg-[var(--color-white)] rounded-[25px] px-2 h-[30px] w-[160px] shadow-[0px_0px_10px_0px_#24242466] hover:shadow-[0px_0px_15px_0px_#242424CC] transition-all duration-300">
          {/* INPUT */}
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpen(true);
            }}
            onClick={(e) => e.stopPropagation()}
            placeholder="Пошук за назвою"
            className="w-full h-full bg-transparent text-[12px] text-[#272727] outline-none px-2"
          />

          {/* ICON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
            className="w-[22px] h-[22px] flex items-center justify-center flex-shrink-0"
          >
            <Image
              src="/images/header/zoom_out_24px.png"
              alt="search"
              width={22}
              height={22}
              className="object-contain"
              priority
            />
          </button>
        </div>

        {/* RESULTS */}
        {open && hasResults && (
          <div className="absolute top-[38px] left-0 w-[220px] max-h-[260px] overflow-y-auto rounded-[20px] bg-[#F5F3EE] shadow-[0px_0px_15px_0px_#24242433] p-2 z-50">
            {filteredAuthors.length > 0 && (
              <>
                <p className="text-[11px] text-[#272727]/40 px-3 pt-1 pb-1">
                  Автори
                </p>
                {filteredAuthors.map((a) => (
                  <Link
                    key={a.id}
                    href={`/authors/${a.id}`}
                    onClick={() => {
                      setOpen(false);
                      setSearch("");
                    }}
                    className="flex items-center px-3 py-2 rounded-[14px] text-[13px] text-[#272727] hover:bg-white transition-all"
                  >
                    {a.authorName}
                  </Link>
                ))}
              </>
            )}

            {filteredAuthors.length > 0 && filteredProducts.length > 0 && (
              <div className="border-t border-[#272727]/10 my-1" />
            )}

            {filteredProducts.length > 0 && (
              <>
                <p className="text-[11px] text-[#272727]/40 px-3 pt-1 pb-1">
                  Книги
                </p>
                {filteredProducts.map((p) => {
                  const productAuthors = getProductAuthors(p);
                  return (
                    <Link
                      key={p.id}
                      href={`/products/${p.id}`}
                      onClick={() => {
                        setOpen(false);
                        setSearch("");
                      }}
                      className="flex flex-col px-3 py-2 rounded-[14px] hover:bg-white transition-all"
                    >
                      <span className="text-[13px] text-[#272727]">
                        {p.productName}
                      </span>
                      {productAuthors.length > 0 && (
                        <span className="text-[11px] text-[#272727]/50">
                          {productAuthors.map(authorFullName).join(", ")}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        )}

        {/* EMPTY */}
        {open && search.trim() !== "" && !hasResults && (
          <div className="absolute top-[38px] left-0 w-[220px] rounded-[20px] bg-[#F5F3EE] shadow-[0px_0px_15px_0px_#24242433] p-4 text-[13px] text-[#272727] z-50">
            Не знайдено
          </div>
        )}
      </div>
    </div>
  );
}
