const TOKEN_KEY = "token";
const USER_ID_KEY = "userId";
const TOKEN_EXPIRY_KEY = "tokenExpiresAt";

const FOURTEEN_DAYS_MS = 14 * 24 * 60 * 60 * 1000;

function clearStorage(storage: Storage) {
  storage.removeItem(TOKEN_KEY);
  storage.removeItem(USER_ID_KEY);
}

export function setAuthSession(
  token: string,
  userId: string | undefined,
  rememberMe: boolean,
) {
  clearStorage(localStorage);
  clearStorage(sessionStorage);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);

  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(TOKEN_KEY, token);
  if (userId) {
    storage.setItem(USER_ID_KEY, userId);
  }

  if (rememberMe) {
    localStorage.setItem(TOKEN_EXPIRY_KEY, String(Date.now() + FOURTEEN_DAYS_MS));
  }
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;

  const sessionToken = sessionStorage.getItem(TOKEN_KEY);
  if (sessionToken) return sessionToken;

  const persistedToken = localStorage.getItem(TOKEN_KEY);
  if (!persistedToken) return null;

  const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (expiry && Date.now() > Number(expiry)) {
    clearAuthSession();
    return null;
  }

  return persistedToken;
}

export function getAuthUserId(): string | null {
  if (typeof window === "undefined") return null;

  return sessionStorage.getItem(USER_ID_KEY) ?? localStorage.getItem(USER_ID_KEY);
}

export function clearAuthSession(dispatchEvent = true) {
  clearStorage(localStorage);
  clearStorage(sessionStorage);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);

  if (dispatchEvent) {
    window.dispatchEvent(new Event("auth-change"));
  }
}
