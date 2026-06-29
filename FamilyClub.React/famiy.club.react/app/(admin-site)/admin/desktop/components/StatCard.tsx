import { ReactNode } from "react";

interface StatCardProps<T> {
  title: string;
  items: T[];                 
  isLoading: boolean;
  icon: string;
  getDate: (item: T) => Date | string | null | undefined; 
}

export default function StatCard<T>({ 
  title, 
  items, 
  isLoading, 
  icon, 
  getDate 
}: StatCardProps<T>) {

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  let addedTodayCount = 0;
  let latestTime = 0;

  // 1. First pass: Find today's count and locate the absolute latest timestamp
  if (!isLoading && items.length > 0) {
    items.forEach((item) => {
      const rawDate = getDate(item);
      if (!rawDate) return;

      const itemDate = new Date(rawDate);
      const itemTime = itemDate.getTime();

      if (!isNaN(itemTime)) {
        if (itemDate >= startOfToday) {
          addedTodayCount++;
        }
        if (itemTime > latestTime) {
          latestTime = itemTime;
        }
      }
    });
  }

  // 2. Second pass: If today is 0, count how many items match that latest date boundary
  let lastAddedAmount = 0;
  if (!isLoading && addedTodayCount === 0 && latestTime > 0) {
    const latestDateObj = new Date(latestTime);
    // Create boundaries for just that specific latest day (ignoring hours/minutes)
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

  // 3. Dynamic delta text generation
  let deltaText = "Немає записів";

  if (isLoading) {
    deltaText = "Оновлення...";
  } else if (addedTodayCount > 0) {
    // If items were added today
    deltaText = `+${addedTodayCount} нових сьогодні`;
  } else if (latestTime > 0) {
    // If today is 0, format: "last added {amount} on {date}"
    const lastDateString = new Date(latestTime).toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "short",
    });
    deltaText = `Ост: +${lastAddedAmount} (${lastDateString})`;
  }

  return (
    <div 
      style={{ backgroundImage: "url('/images/admin/desktop/cut_edge_rectangle.png')" }}
      className="flex items-center gap-4 px-5 py-4 bg-no-repeat bg-center bg-[length:100%_100%]"
    > 
      {/* Icon */}
      <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
        <img src={icon} className="max-w-full max-h-full object-contain" alt="" />
      </div>
      
      {/* Text Content */}
      <div className="min-w-0">
        <p className="text-sm opacity-100 truncate">{title}</p>
        <p className="text-2xl font-semibold tracking-tight">
          {isLoading ? "Завантаження..." : items.length.toString()}
        </p>
        <p className="text-xs text-[var(--color-green)] whitespace-nowrap">{deltaText}</p>
      </div>
    </div>
  );
}


// Simple verion
// export default function StatCard({ title, value, delta, icon }: { title: string; value: string; delta: string; icon: string }) {
//     return (
//         <div 
//             style={{ backgroundImage: "url('/images/admin/desktop/cut_edge_rectangle.png')" }}
//             className="flex items-center gap-4 px-5 py-4 bg-no-repeat bg-center bg-[length:100%_100%]"
//         > 
//             {/* Icon - Wrapped in a div with fixed sizes to prevent stretching */}
//             <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
//                 <img src={icon} className="max-w-full max-h-full object-contain" alt="" />
//             </div>
            
//             {/* Text content */}
//             <div className="min-w-0">
//                 <p className="text-sm opacity-100 truncate">{title}</p>
//                 <p className="text-2xl font-semibold tracking-tight">{value}</p>
//                 <p className="text-xs text-[var(--color-green)] whitespace-nowrap">{delta}</p>
//             </div>
//         </div>
//     );
// }