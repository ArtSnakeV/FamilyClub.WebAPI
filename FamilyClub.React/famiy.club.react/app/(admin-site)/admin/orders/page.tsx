"use client";

import { useEffect, useState } from "react";
import {
    ClubMemberApi,
    Configuration,
    ClubMemberReadDto,
    OrderDTO,
    OrdersApi,
    ProductDto,
    ProductsApi,
} from "@/lib/api/generated";
import { getAuthToken } from "@/lib/auth/tokenStorage";
import { apiBasePath } from "@/lib/api/services";
import AdminOrdersPanel from "./components/AdminOrdersPanel";

export default function OrdersPage() {
    const [orders, setOrders] = useState<OrderDTO[]>([]);
    const [members, setMembers] = useState<ClubMemberReadDto[]>([]);
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            const token = getAuthToken();
            if (!token) {
                setIsLoading(false);
                return;
            }

            const config = new Configuration({
                basePath: apiBasePath,
                headers: { Authorization: `Bearer ${token}` },
            });
            const ordersApi = new OrdersApi(config);
            const memberApi = new ClubMemberApi(config);
            const productsApi = new ProductsApi(config);

            try {
                const results = await Promise.allSettled([
                    ordersApi.apiOrdersGet(),
                    memberApi.apiClubMemberGet(),
                    productsApi.apiProductsGet(),
                ]);

                if (cancelled) return;

                const [ordersResult, membersResult, productsResult] = results;

                if (ordersResult.status === "fulfilled") {
                    setOrders(ordersResult.value ?? []);
                }
                if (membersResult.status === "fulfilled") {
                    setMembers(membersResult.value ?? []);
                }
                if (productsResult.status === "fulfilled") {
                    setProducts(productsResult.value ?? []);
                }
            } catch (err) {
                console.error("Не вдалося завантажити замовлення", err);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="w-full min-h-screen overflow-x-hidden relative m-0 p-0">
            <div
                className="relative min-h-screen pb-10"
                style={{ marginLeft: "-1rem", width: "calc(100% + 2rem)" }}
            >
                <img
                    src="/images/usersPageAdmin/Rectangle 675.png"
                    className="absolute pointer-events-none"
                    style={{
                        width: "calc(100% + 20px)",
                        height: "calc(100% + 40px)",
                        top: "-40px",
                        left: "-20px",
                        objectFit: "fill",
                    }}
                    alt=""
                />

                <div className="relative z-10 mt-24 px-10 pb-6 flex flex-col gap-6 box-border">
                    {isLoading && orders.length === 0 ? (
                        <p className="text-[16px] text-[#6B6B6B]">
                            Завантаження замовлень...
                        </p>
                    ) : (
                        <AdminOrdersPanel
                            orders={orders}
                            members={members}
                            products={products}
                            isLoading={isLoading}
                            onOrdersChange={setOrders}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
