import { useEffect } from "react";
import { apiBasePath } from "@/lib/api/services";

// перший раз, коли відкриваємо сайт у браузері генерується унікальний UUIDі зберігається в localStorage.
//  при наступних заходах той самий id береться звідти
function getSessionId(): string {
  let id = localStorage.getItem("presence_session_id");
  if (!id) {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      id = crypto.randomUUID();
    } else {
      // Фоллбек для HTTP (небезпечний контекст), доступу по IP або старіших браузерів
      id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
    localStorage.setItem("presence_session_id", id);
  }
  return id;
}

export default function usePresenceHeartbeat() {
  useEffect(() => {
    const sessionId = getSessionId();

    const sendHeartbeat = () => {
      fetch(`${apiBasePath}/api/Presence/heartbeat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      }).catch(() => { });
    };

    sendHeartbeat(); // одразу при завантаженні
    const interval = setInterval(sendHeartbeat, 20000); // Кожні 20 секунд фронт "пінгує" бекенд
    // бекенд PresenceService записує час останнього пінгу
    return () => clearInterval(interval);
  }, []);
}