"use client";

import { useEffect, useState } from "react";
import { apiBasePath } from "@/lib/api/services";

export interface BlockReason {
    id: number;
    name: string;
    description?: string | null;
}

export default function useBlockReasons() {
    const [blockReasons, setBlockReasons] = useState<BlockReason[]>([]);
    const [loadingBlockReasons, setLoadingBlockReasons] = useState(true);

    useEffect(() => {
        const fetchReasons = async () => {
            try {
                const res = await fetch(`${apiBasePath}/api/BlockReasons`);
                const data = await res.json();
                setBlockReasons(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoadingBlockReasons(false);
            }
        };
        fetchReasons();
    }, []);

    return { blockReasons, loadingBlockReasons };
}