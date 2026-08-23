"use client";

import StatCard from "../../common_elements/StatCard";
import DonutDiagramChart from "../../common_elements/DonutDiagramChart";
import { buildDonutSegments } from "../../common_elements/donutDiagramUtils";
import RecentComplaintsPanel from "./components/RecentComplaintsPanel";
import RecentReviewsPanel from "./components/RecentReviewsPanel";
import SalesChartPanel from "./components/SalesChartPanel";
import TopBooksList from "./components/TopBooksList";
import GreetingBanner from "./components/GreetingBanner";
import { COMPLAINT_REASONS } from "@/lib/constants/complaintTypes";
import {
  ORDER_STATUS_GROUPS,
  normalizeOrderStatusGroup,
} from "@/lib/constants/orderStatusGroups";
import {
  ProductsApi,
  ClubMemberApi,
  ReviewsApi,
  OrdersApi,
  ComplaintsApi,
  AuthorsApi,
  Configuration,
  ProductDto,
  ClubMemberReadDto,
  ReviewDto,
  OrderDTO,
  ComplaintsReadDto,
  AuthorDTO,
} from "@/lib/api/generated";
import { useEffect, useMemo, useState } from "react";
import { getAuthToken } from "@/lib/auth/tokenStorage";
import { apiBasePath } from "@/lib/api/services";
import { useAccessControl } from "@/lib/auth/useAccessControl";
import { normalizeRoleKey } from "@/app/(admin-site)/admin/roles/data/rolesData";

export default function Desktop() {
  const { roles: userRoles, loading: accessLoading } = useAccessControl();
  const isAdmin = userRoles.some((r) => normalizeRoleKey(r) === "Admin");

  const [products, setProducts] = useState<ProductDto[]>([]);
  const [members, setMembers] = useState<ClubMemberReadDto[]>([]);
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [complaints, setComplaints] = useState<ComplaintsReadDto[]>([]);
  const [authors, setAuthors] = useState<AuthorDTO[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const managerMembers = useMemo(
    () => members.filter((m) => m.roles?.some((r) => ["Manager", "Admin"].includes(r))),
    [members]
  );
  useEffect(() => {
    let cancelled = false;

    const loadDashboard = async () => {
      const token = getAuthToken();

      if (!token) {
        setError(new Error("Not authenticated"));
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

      try {
        const results = await Promise.allSettled([
          productsApi.apiProductsGet(),
          memberApi.apiClubMemberGet(),
          reviewsApi.apiReviewsGet(),
          ordersApi.apiOrdersGet(),
          complaintsApi.apiComplaintsGet(),
          authorsApi.apiAuthorsGet(),
        ]);

        if (cancelled) return;

        const [
          productsResult,
          membersResult,
          reviewsResult,
          ordersResult,
          complaintsResult,
          authorsResult,
        ] = results;

        if (productsResult.status === "fulfilled") {
          setProducts(productsResult.value);
        } else {
          console.error("Failed to load products:", productsResult.reason);
        }

        if (membersResult.status === "fulfilled") {
          setMembers(membersResult.value);
        } else {
          console.error("Failed to load members:", membersResult.reason);
        }

        if (reviewsResult.status === "fulfilled") {
          setReviews(reviewsResult.value);
        } else {
          console.error("Failed to load reviews:", reviewsResult.reason);
        }

        if (ordersResult.status === "fulfilled") {
          setOrders(ordersResult.value);
        } else {
          console.error("Failed to load orders:", ordersResult.reason);
        }

        if (complaintsResult.status === "fulfilled") {
          setComplaints(complaintsResult.value);
        } else {
          console.error("Failed to load complaints:", complaintsResult.reason);
        }

        if (authorsResult.status === "fulfilled") {
          setAuthors(authorsResult.value);
        } else {
          console.error("Failed to load authors:", authorsResult.reason);
        }

        const allFailed = results.every((r) => r.status === "rejected");
        if (allFailed) {
          setError(new Error("Failed to load dashboard data"));
        }
      } catch (err) {
        if (!cancelled) {
          console.error("DASHBOARD DATA FETCH ERROR:", err);
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  const complaintChartSegments = useMemo(
    () =>
      buildDonutSegments(
        complaints,
        COMPLAINT_REASONS.map((r) => ({
          id: r.value,
          label: r.label,
          color: r.color,
        })),
        (c) => c.complaintType ?? "other"
      ),
    [complaints]
  );

  const orderChartSegments = useMemo(
    () =>
      buildDonutSegments(
        orders,
        ORDER_STATUS_GROUPS.map((g) => ({
          id: g.id,
          label: g.label,
          color: g.color,
        })),
        (o) => normalizeOrderStatusGroup(o.status)
      ),
    [orders]
  );

  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* A. Привітання — для всіх */}
      <div className="px-6 pt-6">
        <GreetingBanner />
      </div>

      <div
        className="min-h-screen overflow-hidden relative m-0 p-0"
        style={{ marginLeft: "-1rem", width: "calc(100% + 2rem)" }}
      >
        <div className="w-full flex-1 relative overflow-hidden m-0 p-0">
          <img
            src="/images/authorPageAdmin/Rectangle 675.png"
            className="absolute top-0 left-0 w-full h-auto pointer-events-none"
            alt=""
          />

          <div className="relative z-10 flex flex-col gap-6 p-10">
            {accessLoading ? (
              <p className="text-[16px] text-[#6B6B6B]">Завантаження панелі...</p>
            ) : isAdmin ? (
              <>
                <h1 className="text-2xl font-bold mb-4">Панель адміністратора</h1>
                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
                  <StatCard
                    title="Менеджери"
                    items={ managerMembers }
                    isLoading={isLoading}
                    icon="/images/admin_manager/desktop/user-tie-solid-full 1.svg"
                    getDate={(member) => member.id || ""}
                    href="/admin/managers"
                  />
                  <StatCard
                    title="Продажі"
                    items={reviews}
                    isLoading={isLoading}
                    icon="/images/admin_manager/desktop/tag-solid-full (1) 1.svg"
                    getDate={(review) => review.createdAt}
                    href="/admin/reviews"
                  />
                  <StatCard
                    title="Користувачі"
                    items={members}
                    isLoading={isLoading}
                    icon="/images/admin_manager/desktop/user-group-solid-full 1.svg"
                    getDate={(member) => member.dateOfBirth}
                    href="/admin/users"
                  />
                  <StatCard
                    title="Замовлення"
                    items={orders}
                    isLoading={isLoading}
                    icon="/images/admin_manager/desktop/shopping-cart-solid-full 1.svg"
                    getDate={(order) => order.orderDate}
                    href="/admin/orders"
                  />
                  <StatCard
                    title="Скарги"
                    items={complaints}
                    isLoading={isLoading}
                    icon="/images/admin_manager/desktop/chart-simple-solid-full 1.svg"
                    getDate={(complaint) => complaint.createdAt}
                    href="/admin/complaints"
                  />
                </section>
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <DonutDiagramChart
                    title="Скарги за типами"
                    segments={complaintChartSegments}
                    isLoading={isLoading}
                    href="/admin/complaints"
                    emptyLabel="Немає скарг"
                  />
                  <DonutDiagramChart
                    title="Замовлення за статусами"
                    segments={orderChartSegments}
                    isLoading={isLoading}
                    href="/admin/orders"
                    emptyLabel="Немає замовлень"
                  />
                </section>
                <RecentComplaintsPanel
                  complaints={complaints}
                  isLoading={isLoading}
                  href="/admin/complaints"
                />
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-4">Панель менеджера</h1>
                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
                  <StatCard
                    title="Книги"
                    items={products}
                    isLoading={isLoading}
                    icon="/images/admin_manager/desktop/book-open-solid-full 1.svg"
                    getDate={(book) => book.publishingDate}
                    href="/admin/books"
                  />
                  <StatCard
                    title="Відгуки"
                    items={reviews}
                    isLoading={isLoading}
                    icon="/images/admin_manager/desktop/newspaper-solid-full 1.svg"
                    getDate={(review) => review.createdAt}
                    href="/admin/reviews"
                  />
                  <StatCard
                    title="Користувачі"
                    items={members}
                    isLoading={isLoading}
                    icon="/images/admin_manager/desktop/user-group-solid-full 1.svg"
                    getDate={(member) => member.dateOfBirth}
                    href="/admin/users"
                  />
                  <StatCard
                    title="Замовлення"
                    items={orders}
                    isLoading={isLoading}
                    icon="/images/admin_manager/desktop/shopping-cart-solid-full 1.svg"
                    getDate={(order) => order.orderDate}
                    href="/admin/orders"
                  />
                  <StatCard
                    title="Скарги"
                    items={complaints}
                    isLoading={isLoading}
                    icon="/images/admin_manager/desktop/chart-simple-solid-full 1.svg"
                    getDate={(complaint) => complaint.createdAt}
                    href="/admin/complaints"
                  />
                </section>
                <RecentReviewsPanel
                  reviews={reviews}
                  products={products}
                  members={members}
                  isLoading={isLoading}
                  href="/admin/reviews"
                  limit={5}
                />
                <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <SalesChartPanel
                    orders={orders}
                    isLoading={isLoading}
                    className="xl:col-span-2"
                  />
                  <TopBooksList
                    orders={orders}
                    products={products}
                    authors={authors}
                    isLoading={isLoading}
                    href="/admin/books"
                    limit={5}
                  />
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
