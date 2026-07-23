"use client";

import { useEffect, useState } from "react";
import {
    ProductsApi,
    ClubMemberApi,
    ReviewsApi,
    OrdersApi,
    ComplaintsApi,
    AuthorsApi,
    CategoriesApi,
    Configuration,
    ProductDto,
    ClubMemberReadDto,
    ReviewDto,
    OrderDTO,
    ComplaintsReadDto,
    AuthorDTO,
    CategoryDto,
} from "@/lib/api/generated";
import { getAuthToken } from "@/lib/auth/tokenStorage";
import { apiBasePath } from "@/lib/api/services";
import { useAccessControl } from "@/lib/auth/useAccessControl";
import { normalizeRoleKey } from "@/app/(admin-site)/admin/roles/data/rolesData";
import type { AnalyticsPeriod } from "./utils/analyticsPeriod";
import AdminAnalyticsPanel from "./components/AdminAnalyticsPanel";
import ManagerAnalyticsPanel from "./components/ManagerAnalyticsPanel";

export default function AnalyticsPage() {
    const { roles: userRoles, loading: accessLoading } = useAccessControl();
    const isAdmin = userRoles.some((r) => normalizeRoleKey(r) === "Admin");

    const [period, setPeriod] = useState<AnalyticsPeriod>("30d");
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [members, setMembers] = useState<ClubMemberReadDto[]>([]);
    const [reviews, setReviews] = useState<ReviewDto[]>([]);
    const [orders, setOrders] = useState<OrderDTO[]>([]);
    const [complaints, setComplaints] = useState<ComplaintsReadDto[]>([]);
    const [authors, setAuthors] = useState<AuthorDTO[]>([]);
    const [categories, setCategories] = useState<CategoryDto[]>([]);
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

            const productsApi = new ProductsApi(config);
            const memberApi = new ClubMemberApi(config);
            const reviewsApi = new ReviewsApi(config);
            const ordersApi = new OrdersApi(config);
            const complaintsApi = new ComplaintsApi(config);
            const authorsApi = new AuthorsApi(config);
            const categoriesApi = new CategoriesApi(config);

            try {
                const results = await Promise.allSettled([
                    productsApi.apiProductsGet(),
                    memberApi.apiClubMemberGet(),
                    reviewsApi.apiReviewsGet(),
                    ordersApi.apiOrdersGet(),
                    complaintsApi.apiComplaintsGet(),
                    authorsApi.apiAuthorsGet(),
                    categoriesApi.apiCategoriesGet(),
                ]);

                if (cancelled) return;

                const [
                    productsResult,
                    membersResult,
                    reviewsResult,
                    ordersResult,
                    complaintsResult,
                    authorsResult,
                    categoriesResult,
                ] = results;

                if (productsResult.status === "fulfilled") {
                    setProducts(productsResult.value);
                }
                if (membersResult.status === "fulfilled") {
                    setMembers(membersResult.value);
                }
                if (reviewsResult.status === "fulfilled") {
                    setReviews(reviewsResult.value);
                }
                if (ordersResult.status === "fulfilled") {
                    setOrders(ordersResult.value);
                }
                if (complaintsResult.status === "fulfilled") {
                    setComplaints(complaintsResult.value);
                }
                if (authorsResult.status === "fulfilled") {
                    setAuthors(authorsResult.value);
                }
                if (categoriesResult.status === "fulfilled") {
                    setCategories(categoriesResult.value);
                }
            } catch (err) {
                if (!cancelled) {
                    console.error("ANALYTICS DATA FETCH ERROR:", err);
                }
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
                    {accessLoading ? (
                        <p className="text-[16px] text-[#6B6B6B]">
                            Завантаження аналітики...
                        </p>
                    ) : isAdmin ? (
                        <AdminAnalyticsPanel
                            members={members}
                            orders={orders}
                            products={products}
                            authors={authors}
                            categories={categories}
                            reviews={reviews}
                            period={period}
                            onPeriodChange={setPeriod}
                            isLoading={isLoading}
                        />
                    ) : (
                        <ManagerAnalyticsPanel
                            members={members}
                            orders={orders}
                            products={products}
                            authors={authors}
                            categories={categories}
                            reviews={reviews}
                            complaints={complaints}
                            period={period}
                            onPeriodChange={setPeriod}
                            isLoading={isLoading}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
