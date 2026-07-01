import { useEffect } from "react";
import { apiBasePath } from "@/lib/api/services";

// перший раз, коли відкриваємо сайт у браузері генерується унікальний UUIDі зберігається в localStorage.
//  при наступних заходах той самий id береться звідти
function getSessionId(): string {
  let id = localStorage.getItem("presence_session_id");
  if (!id) {
    id = crypto.randomUUID();
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