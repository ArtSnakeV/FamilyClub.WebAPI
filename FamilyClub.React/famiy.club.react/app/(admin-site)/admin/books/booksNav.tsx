"use client"; // For using Hooks safely

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BooksNav() {
  const pathname = usePathname();
  // Calculate separate active states for each link
  const isBooksActive = pathname === "/admin/books";
  const isLanguagesActive = pathname === "/admin/books/languages";
  const isAuthorsActive = pathname === "/admin/books/authors";

  {
    /*
    This page works on creating a 'navigation bar' related to book entities and allows you to highlight the current entity, depending on the url address
    Дана сторінка працює над створенням 'навігаційної панелі' пов'язаної з сутностями книг і дозволяє виділяти поточну сутність, залежно від url-адреси    
  */
  }

  return (
    <div
      className="
                    w-screen
                    relative
                    left-1/2
                    -translate-x-1/2
                    bg-center 
                    bg-no-repeat
                    py-4
                    flex 
                    justify-center
                    items-center
                    gap-5
                "
      style={{
        backgroundImage: "url('/images/entities/books/top_frame.svg')",
        opacity: 1,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
      }}
    >
      {/* Books */}
      {/* Книги */}
      <Link
        href="/admin/books"
        className={`
                    font-['Source_Sans_Pro'] font-normal text-[20px] leading-[125%] tracking-[-0.011em] align-middle no-underline                    
                    px-5 py-2.5 rounded-[9px]                    
                    hover:text-[var(--foreground-on-dark)] hover:bg-[var(--color-brand-green)]                    
                    transition-colors duration-200 ease-in-out
                    ${
                      isBooksActive
                        ? "text-[var(--foreground-on-dark)] bg-[var(--color-brand-green)]"
                        : "text-[var(--foreground-primary)] bg-transparent"
                    }
                `}
      >
        Книги
      </Link>

      {/* Languages */}
      {/* Мови */}
      <Link
        href="/admin/books/languages"
        className={`
                    font-['Source_Sans_Pro'] font-normal text-[20px] leading-[125%] tracking-[-0.011em] align-middle no-underline                    
                    px-5 py-2.5 rounded-[9px]                    
                    hover:text-[var(--foreground-on-dark)] hover:bg-[var(--color-brand-green)]                    
                    transition-colors duration-200 ease-in-out
                    ${
                      isLanguagesActive
                        ? "text-[var(--foreground-on-dark)] bg-[var(--color-brand-green)]"
                        : "text-[var(--foreground-primary)] bg-transparent"
                    }
                `}
      >
        Мови
      </Link>

      {/* Authors */}
      {/* Автори */}
      <Link
        href="/admin/books/authors"
        className={`
                    font-['Source_Sans_Pro'] font-normal text-[20px] leading-[125%] tracking-[-0.011em] align-middle no-underline                    
                    px-5 py-2.5 rounded-[9px]                    
                    hover:text-[var(--foreground-on-dark)] hover:bg-[var(--color-brand-green)]                    
                    transition-colors duration-200 ease-in-out
                    ${
                      isAuthorsActive
                        ? "text-[var(--foreground-on-dark)] bg-[var(--color-brand-green)]"
                        : "text-[var(--foreground-primary)] bg-transparent"
                    }
                `}
      >
        Автори
      </Link>
      
    </div>
  );
}
