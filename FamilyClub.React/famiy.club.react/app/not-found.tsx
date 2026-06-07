import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F5F3EE] text-[#242424] overflow-hidden">
      <div className="relative isolate px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-[380px] bg-[radial-gradient(circle_at_top,_rgba(0,91,51,0.18),_transparent_48%)]" />
        <div className="absolute inset-y-0 left-0 w-72 bg-[radial-gradient(circle,_rgba(0,0,0,0.08),_transparent_65%)] blur-3xl opacity-40" />
        <div className="absolute inset-y-0 right-0 w-72 bg-[radial-gradient(circle,_rgba(126,77,30,0.18),_transparent_60%)] blur-3xl opacity-50" />

        <div className="relative mx-auto max-w-6xl">
          <div className="rounded-[32px] border border-[#E8E1D9] bg-white/95 shadow-[0_40px_100px_rgba(0,0,0,0.08)] backdrop-blur-xl overflow-hidden">
            <div className="relative overflow-hidden bg-[#F3EFE8] px-6 py-16 sm:px-12 lg:px-16">
              <div className="absolute inset-0 bg-[url('/images/addProducts/Rectangle 312.svg')] bg-cover bg-center opacity-10 pointer-events-none" />
              <div className="relative flex flex-col items-center text-center gap-8">
                <div className="space-y-4">
                  <p className="text-sm font-semibold tracking-[0.24em] uppercase text-[#7E4D1E] opacity-80">Помилка</p>
                  <h1 className="text-4xl font-semibold sm:text-5xl">Такої сторінки не існує</h1>
                  <p className="mx-auto max-w-xl text-base leading-7 text-[#272727]/90 sm:text-lg">
                    Схоже, ви потрапили на сторінку, якої вже немає або яка ще не створена.
                    Перейдіть на головну або спробуйте знайти потрібний розділ із меню.
                  </p>
                </div>

                <div className="relative rounded-[28px] border-4 border-[#005B33] bg-[#F5F3EE] px-8 py-10 shadow-[0_24px_60px_rgba(0,0,0,0.12)] w-full max-w-3xl">
                  <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                    <div className="space-y-6">
                      <div className="flex items-center justify-center gap-3 rounded-full bg-[#F5F3EE] px-4 py-2 text-sm font-medium uppercase tracking-[0.18em] text-[#005B33] shadow-[0_10px_30px_rgba(0,91,51,0.08)]">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#005B33] text-white">404</span>
                        Сторінку не знайдено
                      </div>
                      <div className="flex flex-col gap-3">
                        <p className="text-3xl font-bold leading-tight text-[#242424]">Сторінка загубилася серед сторінок і книг.</p>
                        <p className="text-sm leading-6 text-[#272727]/85">Можливо, у вас неправильне посилання або сторінка була видалена.</p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                        <Link href="/" className="inline-flex items-center justify-center rounded-full bg-[#005B33] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#00452a]">
                          Перейти на головну
                        </Link>
                        <Link href="/products" className="inline-flex items-center justify-center rounded-full border border-[#005B33] bg-white px-8 py-4 text-sm font-semibold text-[#005B33] transition hover:bg-[#F1F7F1]">
                          Перейти до каталогу
                        </Link>
                      </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[320px]">
                      <div className="relative rounded-[30px] border-2 border-[#005B33] bg-[#EAF0ED] p-5 shadow-[0_24px_40px_rgba(0,0,0,0.08)]">
                        <div className="grid grid-cols-[1fr_1fr] gap-4">
                          <div className="rounded-[20px] bg-[#F5F3EE] p-5">
                            <div className="h-32 rounded-[18px] border border-[#D9D2C7] bg-white" />
                          </div>
                          <div className="rounded-[20px] bg-[#F5F3EE] p-5">
                            <div className="h-32 rounded-[18px] border border-[#D9D2C7] bg-white" />
                          </div>
                        </div>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] rounded-3xl border-2 border-[#005B33] bg-white/90 px-4 py-3 text-center shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                          <p className="text-5xl font-bold tracking-[-0.04em] text-[#005B33]">404</p>
                          <p className="text-xs uppercase tracking-[0.24em] text-[#7E4D1E]">Помилка</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
