import Link from "next/link";
import React from "react";

export default function CommunityPage() {
  return (
    <div className="min-h-[70vh] bg-[#f5f3ee] flex flex-col items-center justify-center px-4 py-16 text-[#242424]">
      <div className="max-w-md w-full text-center bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#242424]/10">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#005B33]/10 flex items-center justify-center text-[#005B33]">
          <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Спільнота читачів</h1>
        <p className="text-[#242424]/70 text-sm md:text-base mb-8 leading-relaxed">
          Ми активно працюємо над створенням інтерактивного простору, де ви зможете обговорювати улюблені книги, ділитися рецензіями та знаходити однодумців. Скоро тут з&apos;явиться багато цікавого!
        </p>
        <Link
          href="/products"
          className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[#005B33] text-[#f5f3ee] font-semibold text-sm transition-all duration-300 hover:bg-[#004627] hover:scale-105 shadow-[0_4px_14px_rgba(0,91,51,0.3)]"
        >
          Перейти до каталогу книг
        </Link>
      </div>
    </div>
  );
}
