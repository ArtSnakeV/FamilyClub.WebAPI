import { apiBasePath } from "@/lib/api/services";
import { useEffect, useState } from "react";

export function useActiveUsers() {
    const [activeUsers, setActiveUsers] = useState<string[]>([]);

    useEffect(() => {
        const load = () => {
            fetch(`${apiBasePath}/api/Presence/active-users`)
                .then(r => r.json())
                .then(data => setActiveUsers(data.activeUserIds));
        };

        load();
        const interval = setInterval(load, 10000);

        return () => clearInterval(interval);
    }, []);

    return activeUsers;
}