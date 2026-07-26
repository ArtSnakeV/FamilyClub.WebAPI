const STORAGE_KEY = "familyclub.mySettings.prefs.v1";

/** MOCK / FUTURE — коли зʼявиться API сповіщень */
export type NotificationPrefs = {
  newOrders: boolean;
  newComplaints: boolean;
  reviews: boolean;
  newspaper: boolean;
  email: boolean;
};

export type WorkPrefs = {
  language: string;
  autoRefreshOrders: boolean;
  aiAssistant: boolean;
  // MOCK / FUTURE: pushNotifications: boolean;
};

export type MySettingsPrefs = {
  // MOCK / FUTURE: notifications: NotificationPrefs;
  work: WorkPrefs;
};

export const DEFAULT_PREFS: MySettingsPrefs = {
  // notifications: {
  //   newOrders: true,
  //   newComplaints: true,
  //   reviews: true,
  //   newspaper: true,
  //   email: true,
  // },
  work: {
    language: "uk",
    autoRefreshOrders: true,
    aiAssistant: true,
    // pushNotifications: true,
  },
};

export function loadMySettingsPrefs(): MySettingsPrefs {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<MySettingsPrefs>;
    return {
      // notifications: {
      //   ...DEFAULT_PREFS.notifications,
      //   ...parsed.notifications,
      // },
      work: { ...DEFAULT_PREFS.work, ...parsed.work },
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function saveMySettingsPrefs(prefs: MySettingsPrefs): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}
