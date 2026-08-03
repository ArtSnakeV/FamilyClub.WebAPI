import { useEffect } from "react";
import { apiBasePath } from "@/lib/api/services";
import { getAuthToken } from "@/lib/auth/tokenStorage";

// перший раз, коли відкриваємо сайт у браузері генерується унікальний UUID і зберігається в localStorage.
// при наступних заходах той самий id береться звідти
function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("presence_session_id");
  if (!id) {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      id = crypto.randomUUID();
    } else {
      id = `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
    }
    localStorage.setItem("presence_session_id", id);
  }
  return id;
}

export default function usePresenceHeartbeat() {
  useEffect(() => {
    const sessionId = getSessionId();

    const sendHeartbeat = () => {
      const token = getAuthToken();
      fetch(`${apiBasePath}/api/Presence/heartbeat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ sessionId }),
      }).catch(() => { });
    };

    sendHeartbeat(); // одразу при завантаженні
    const interval = setInterval(sendHeartbeat, 20000); // Кожні 20 секунд

    const handleAuthChange = () => {
      sendHeartbeat(); // пінг при зміні статусу авторизації (вхід/вихід)
    };

    window.addEventListener("auth-change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("auth-change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);
}