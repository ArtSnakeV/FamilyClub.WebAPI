import { ReactNode } from "react";
import Link from "next/link"; 

interface StatCardProps<T> {
  title: string;
  items: T[];                 
  isLoading: boolean;
  icon: string;
  getDate: (item: T) => Date | string | null | undefined; 
  href?: string; 
}

export default function StatCard<T>({ 
  title, 
  items, 
  isLoading, 
  icon, 
  getDate,
  href
}: StatCardProps<T>) {

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let addedTodayCount = 0;
  let latestTime = 0;

  // 1. Calculate items added today and find the latest record timestamp
  if (!isLoading && items.length > 0) {
    items.forEach((item) => {
      const rawDate = getDate(item);
      if (!rawDate) return;
      const itemDate = new Date(rawDate);
      const itemTime = itemDate.getTime();
      if (!isNaN(itemTime)) {
        if (itemDate >= startOfToday) addedTodayCount++;
        if (itemTime > latestTime) latestTime = itemTime;
      }
    });
  }

  // 2. If nothing was added today, figure out how many were added on the most recent activity date
  let lastAddedAmount = 0;
  if (!isLoading && addedTodayCount === 0 && latestTime > 0) {
    const latestDateObj = new Date(latestTime);
    const startOfLatestDay = new Date(latestDateObj.getFullYear(), latestDateObj.getMonth(), latestDateObj.getDate());
    const endOfLatestDay = new Date(latestDateObj.getFullYear(), latestDateObj.getMonth(), latestDateObj.getDate() + 1);

    items.forEach((item) => {
      const rawDate = getDate(item);
      if (!rawDate) return;
      const itemDate = new Date(rawDate);
      if (itemDate >= startOfLatestDay && itemDate < endOfLatestDay) {
        lastAddedAmount++;
      }
    });
  }

  // 3. Format the status information label
  let deltaText = "Немає записів";
  if (isLoading) {
    deltaText = "Оновлення...";
  } else if (addedTodayCount > 0) {
    deltaText = `+${addedTodayCount} нових сьогодні`;
  } else if (latestTime > 0) {
    const lastDateString = new Date(latestTime).toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "short",
    });
    deltaText = `Ост: +${lastAddedAmount} (${lastDateString})`;
  }

  // 4. Styles & Component Layout Variables
  const cardClasses = "group relative flex items-center gap-4 px-5 py-4 cursor-pointer overflow-hidden select-none w-full";
  const bgImageUrl = "/images/admin_manager/desktop/cut_edge_rectangle.png";

  const cardContent = (
    <>
      {/* LAYER 1: Base Background Graphic Sheet */}
      <div 
        style={{ backgroundImage: `url('${bgImageUrl}')` }}
        className="absolute inset-0 bg-no-repeat bg-center bg-[length:100%_100%] z-0"
      />

      {/* LAYER 2: Masked Hover Tint Overlap Layer */}
      <div 
        style={{ 
          maskImage: `url('${bgImageUrl}')`,
          WebkitMaskImage: `url('${bgImageUrl}')`, 
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat'
        }}
        className="absolute inset-0 bg-[#E3FEE5] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-multiply pointer-events-none" 
      />

      {/* LAYER 3: User Interface Metrics & Graphics */}
      <div className="relative z-20 flex-shrink-0 w-16 h-16 flex items-center justify-center">
        <img src={icon} className="max-w-full max-h-full object-contain" alt="" />
      </div>
      
      <div className="relative z-20 min-w-0">
        <p className="text-sm opacity-100 truncate">{title}</p>
        <p className="text-2xl font-semibold tracking-tight">
          {isLoading ? "Завантаження..." : items.length.toString()}
        </p>
        <p className="text-xs text-[var(--color-green)] whitespace-nowrap">{deltaText}</p>
      </div>
    </>
  );

  // 5. Conditional standard DOM element wrapper output
  if (href) {
    return (
      <Link href={href} className={cardClasses}>
        {cardContent}
      </Link>
    );
  }

  return (
    <div className={cardClasses}>
      {cardContent}
    </div>
  );
}