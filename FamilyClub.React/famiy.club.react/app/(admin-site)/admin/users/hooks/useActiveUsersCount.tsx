import { useEffect, useState } from "react";
import { apiBasePath } from "@/lib/api/services";


export function useActiveUsersCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = () => {
      fetch(`${apiBasePath}/api/Presence/active-count`)
        .then((res) => res.json())
        .then((data) => setCount(data.count))
        .catch(() => setCount(null));
    };

    fetchCount();
    const interval = setInterval(fetchCount, 15000);
    return () => clearInterval(interval);
  }, []);

  return count;
}