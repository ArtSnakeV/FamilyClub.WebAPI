"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import {
    DEFAULT_PLATFORM_SETTINGS,
    fetchPlatformSettings,
    updatePlatformSettings,
    type PlatformSettings,
} from "@/lib/platformSettings/platformSettingsApi";

type Ctx = {
    settings: PlatformSettings;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    save: (next: PlatformSettings) => Promise<PlatformSettings>;
};

const PlatformSettingsContext = createContext<Ctx | null>(null);

export function PlatformSettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<PlatformSettings>(
        DEFAULT_PLATFORM_SETTINGS
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        try {
            setError(null);
            const data = await fetchPlatformSettings();
            setSettings(data);
        } catch (e) {
            console.error(e);
            setError("Не вдалося завантажити налаштування платформи");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void refresh();
    }, [refresh]);

    const save = useCallback(async (next: PlatformSettings) => {
        const saved = await updatePlatformSettings(next);
        setSettings(saved);
        return saved;
    }, []);

    const value = useMemo(
        () => ({ settings, loading, error, refresh, save }),
        [settings, loading, error, refresh, save]
    );

    return (
        <PlatformSettingsContext.Provider value={value}>
            {children}
        </PlatformSettingsContext.Provider>
    );
}

export function usePlatformSettings() {
    const ctx = useContext(PlatformSettingsContext);
    if (!ctx) {
        throw new Error(
            "usePlatformSettings must be used within PlatformSettingsProvider"
        );
    }
    return ctx;
}

/** Safe hook when provider may be missing (returns defaults). */
export function usePlatformSettingsOptional(): Ctx {
    const ctx = useContext(PlatformSettingsContext);
    if (ctx) return ctx;
    return {
        settings: DEFAULT_PLATFORM_SETTINGS,
        loading: false,
        error: null,
        refresh: async () => {},
        save: async (next) => next,
    };
}
