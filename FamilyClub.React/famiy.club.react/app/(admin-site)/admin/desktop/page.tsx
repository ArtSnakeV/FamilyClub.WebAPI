
"use client";

import TornCard from "../../common_elements/TornCard";
import StatCard from "../../common_elements/StatCard";
import ListPanel from "../../common_elements/ListPanel";
import GreetingBanner from "./components/GreetingBanner";
import {
  ProductDto,
  ClubMemberReadDto
} from '@/lib/api/generated';
import {
  productService,
  clubMemberService,
  reviewService,
  orderService,
} from '@/lib/api/services';
import { useEffect, useState } from "react";

// app/(admin-site)/admin/desktop/page.tsx


export default function Desktop() {

  // 1. Establish state for all 5 dataset categories
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [members, setMembers] = useState<ClubMemberReadDto[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);       // Added for Orders
  const [complaints, setComplaints] = useState<any[]>([]); // Added for Complaints

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    Promise.all([
      productService.apiProductsGet(),
      clubMemberService.apiClubMemberGet(),
      reviewService.apiReviewsGet(),
      orderService.apiOrdersGet(),
      Promise.resolve([])
    ])
      .then(([productsData, membersData, reviewsData, ordersData, complaintsData]) => {
        setProducts(productsData);
        setMembers(membersData);
        setReviews(reviewsData);
        setOrders(ordersData);
        setComplaints(complaintsData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("DASHBOARD DATA FETCH ERROR:", err);
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return (

    <div className="relative w-full min-h-screen flex flex-col">

      {/* A. Привітання */}
      <div className="px-6 pt-6">
        <GreetingBanner />
      </div>

      <div
        className="min-h-screen overflow-hidden relative m-0 p-0"
        style={{ marginLeft: '-1rem', width: 'calc(100% + 2rem)' }}
      >
        {/* <div className="w-[100vw] min-h-screen relative"> */}
        <div className="w-full flex-1 relative overflow-hidden m-0 p-0">
          <img
            src="/images/authorPageAdmin/Rectangle 675.png"
            // className="absolute"
            // className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            // style={{ width: "110vw", height: "auto", top: "0px", left: "-5px" }}
            className="absolute top-0 left-0 w-full h-auto pointer-events-none"
            alt=""
          />


          {/* All page content sits above the decoration */}
          <div className="relative z-10 flex flex-col gap-6 p-6">

{/* ///////////////////////////////////////////////////////////////////////////////// */}
{/* Part if we work with Admin */}
            <h1 className="text-2xl font-bold mb-4">Панель адміністратора</h1>
            {/* B. Статистика — 5 однакових карток */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
              {/* 1. Books Card */}
              <StatCard
                title="Managers"
                items={products}
                isLoading={isLoading}
                icon="/images/admin_manager/desktop/book-open-solid-full 1.svg"
                getDate={(book) => book.publishingDate}
                href="/admin/books"
              />

              {/* 2. Reviews Card */}
              <StatCard
                title="Відгуки"
                items={reviews}
                isLoading={isLoading}
                icon="/images/admin_manager/desktop/newspaper-solid-full 1.svg"
                getDate={(review) => review.createdAt}
                href="/admin/reviews"
              />

              {/* 3. Club Members Card */}
              <StatCard
                title="Користувачі"
                items={members}
                isLoading={isLoading}
                icon="/images/admin_manager/desktop/user-group-solid-full 1.svg"
                getDate={(member) => member.dateOfBirth}
                href="/admin/users"
              />

              {/* 4. Orders Card */}
              <StatCard
                title="Замовлення"
                items={orders}
                isLoading={isLoading}
                icon="/images/admin_manager/desktop/shopping-cart-solid-full 1.svg"
                getDate={(order) => order.orderDate || order.createdAt} // Fallback to your order structure field
                href="/admin/orders"
              />

              {/* 5. Complaints Card */}
              <StatCard
                title="Скарги"
                items={complaints}
                isLoading={isLoading}
                icon="/images/admin_manager/desktop/chart-simple-solid-full 1.svg"
                getDate={(complaint) => complaint.submissionDate || complaint.createdAt}
                href="/admin/complaints"
              />
            </section>
{/* C. Середній ряд — 2 колонки */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ListPanel title="Нові газети" href="/admin/newspaper" />
              <ListPanel title="Відгуки" href="/admin/reviews" />
              
            </section>





{/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <h1 className="text-2xl font-bold mb-4">Панель менеджера</h1>
            {/* B. Статистика — 5 однакових карток */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
              {/* 1. Books Card */}
              <StatCard
                title="Книги"
                items={products}
                isLoading={isLoading}
                icon="/images/admin_manager/desktop/book-open-solid-full 1.svg"
                getDate={(book) => book.publishingDate}
                href="/admin/books"
              />

              {/* 2. Reviews Card */}
              <StatCard
                title="Відгуки"
                items={reviews}
                isLoading={isLoading}
                icon="/images/admin_manager/desktop/newspaper-solid-full 1.svg"
                getDate={(review) => review.createdAt}
                href="/admin/reviews"
              />

              {/* 3. Club Members Card */}
              <StatCard
                title="Користувачі"
                items={members}
                isLoading={isLoading}
                icon="/images/admin_manager/desktop/user-group-solid-full 1.svg"
                getDate={(member) => member.dateOfBirth}
                href="/admin/users"
              />

              {/* 4. Orders Card */}
              <StatCard
                title="Замовлення"
                items={orders}
                isLoading={isLoading}
                icon="/images/admin_manager/desktop/shopping-cart-solid-full 1.svg"
                getDate={(order) => order.orderDate || order.createdAt} // Fallback to your order structure field
                href="/admin/orders"
              />

              {/* 5. Complaints Card */}
              <StatCard
                title="Скарги"
                items={complaints}
                isLoading={isLoading}
                icon="/images/admin_manager/desktop/chart-simple-solid-full 1.svg"
                getDate={(complaint) => complaint.submissionDate || complaint.createdAt}
                href="/admin/complaints"
              />
            </section>

            {/* C. Середній ряд — 3 колонки */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* <ListPanel title="Нові газети" href="/admin/newspaper" /> // Left for future implementation */}
              <ListPanel title="Відгуки" href="/admin/reviews" />
              <ListPanel title="Останні книги на модерації" href="/admin/books" />
            </section>

            {/* D. Нижній ряд — 2:1 */}
            <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <TornCard className="xl:col-span-2 p-6">
                {/* графік продажів */}
                <p>Графік продажів</p>
              </TornCard>
              <TornCard className="p-6">
                {/* топ книг */}
                <p>Топ книг</p>
              </TornCard>
            </section>

          </div>{/* end relative z-10 content */}
        </div>{/* end cut-edge wrapper */}
      </div>
    </div>
  );
}








// "use client";

// import TornCard from "./components/TornCard";
// import StatCard from "./components/StatCard";
// import ListPanel from "./components/ListPanel";
// import GreetingBanner from "./components/GreetingBanner";
// import {
//   ProductsApi,
//   ClubMemberApi,
//   ReviewsApi,
//   OrdersApi,
//   // ComplaintsApi,
//   Configuration,
//   ProductDto,
//   ClubMemberReadDto
// } from '@/lib/api/generated';
// import { useEffect, useState } from "react";

// // app/(admin-site)/admin/desktop/page.tsx


// export default function Desktop() {

//   // 1. Establish state for all 5 dataset categories
//   const [products, setProducts] = useState<ProductDto[]>([]);
//   const [members, setMembers] = useState<ClubMemberReadDto[]>([]);
//   const [reviews, setReviews] = useState<any[]>([]);
//   const [orders, setOrders] = useState<any[]>([]);       // Added for Orders
//   const [complaints, setComplaints] = useState<any[]>([]); // Added for Complaints

//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<unknown>(null);

//   useEffect(() => {
//     const config = new Configuration({ basePath: "https://localhost:7069" });

//     const productsApi = new ProductsApi(config);
//     const memberApi = new ClubMemberApi(config);
//     const reviewsApi = new ReviewsApi(config);
//     const ordersApi = new OrdersApi(config);
//     // const complaintsApi = new ComplaintsApi(config);

//     // Concurrent fetching for all metrics
//     Promise.all([
//       productsApi.apiProductsGet(),
//       memberApi.apiClubMemberGet(),
//       reviewsApi.apiReviewsGet(), // Assuming this is the correct method for fetching reviews
//       ordersApi.apiOrdersGet(), // Assuming this is the correct method for fetching orders
//       Promise.resolve([])  // Temporary placeholder for Complaints
//     ])
//       .then(([productsData, membersData, reviewsData, ordersData, complaintsData]) => {
//         setProducts(productsData);
//         setMembers(membersData);
//         setReviews(reviewsData);
//         setOrders(ordersData);
//         setComplaints(complaintsData);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.error("DASHBOARD DATA FETCH ERROR:", err);
//         setError(err);
//         setIsLoading(false);
//       });
//   }, []);

//   return (
//     <div className="relative w-full min-h-screen flex flex-col overflow-x-hidden">

//       {/* A. Привітання */}
//       <div className="px-6 pt-6">
//         <GreetingBanner />
//       </div>

//       {/* Content area with cut-edge decoration at the top */}
//       <div className="relative flex-1 overflow-hidden">
//         {/* Cut-edge decorative image — same pattern as authors/books pages */}
//         <img
//           src="/images/authorPageAdmin/Rectangle 675.png"
//           className="absolute"
//           style={{ width: "100vw", height: "auto", top: "0px", left: "0px", zIndex: 0 }}
//           alt=""
//         />



//         {/* All page content sits above the decoration */}
//         <div className="relative z-10 flex flex-col gap-6 p-6">

//           <h1 className="text-2xl font-bold mb-4">Панель адміністратора</h1>




//           <h1 className="text-2xl font-bold mb-4">Панель менеджера</h1>
//           {/* B. Статистика — 5 однакових карток */}
//           <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
//             {/* 1. Books Card */}
//             <StatCard
//               title="Книги"
//               items={products}
//               isLoading={isLoading}
//               icon="/images/admin_manager/desktop/book-open-solid-full 1.svg"
//               getDate={(book) => book.publishingDate}
//               href="/admin/books"
//             />

//             {/* 2. Reviews Card */}
//             <StatCard
//               title="Відгуки"
//               items={reviews}
//               isLoading={isLoading}
//               icon="/images/admin_manager/desktop/newspaper-solid-full 1.svg"
//               getDate={(review) => review.createdAt}
//               href="/admin/reviews"
//             />

//             {/* 3. Club Members Card */}
//             <StatCard
//               title="Користувачі"
//               items={members}
//               isLoading={isLoading}
//               icon="/images/admin_manager/desktop/user-group-solid-full 1.svg"
//               getDate={(member) => member.dateOfBirth}
//               href="/admin/users"
//             />

//             {/* 4. Orders Card */}
//             <StatCard
//               title="Замовлення"
//               items={orders}
//               isLoading={isLoading}
//               icon="/images/admin_manager/desktop/shopping-cart-solid-full 1.svg"
//               getDate={(order) => order.orderDate || order.createdAt} // Fallback to your order structure field
//               href="/admin/orders"
//             />

//             {/* 5. Complaints Card */}
//             <StatCard
//               title="Скарги"
//               items={complaints}
//               isLoading={isLoading}
//               icon="/images/admin_manager/desktop/chart-simple-solid-full 1.svg"
//               getDate={(complaint) => complaint.submissionDate || complaint.createdAt}
//               href="/admin/complaints"
//             />
//           </section>

//           {/* C. Середній ряд — 3 колонки */}
//           <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <ListPanel title="Нові газети" href="/admin/newspaper" />
//             <ListPanel title="Відгуки" href="/admin/reviews" />
//             <ListPanel title="Останні книги на модерації" href="/admin/books" />
//           </section>

//           {/* D. Нижній ряд — 2:1 */}
//           <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//             <TornCard className="xl:col-span-2 p-6">
//               {/* графік продажів */}
//               <p>Графік продажів</p>
//             </TornCard>
//             <TornCard className="p-6">
//               {/* топ книг */}
//               <p>Топ книг</p>
//             </TornCard>
//           </section>

//         </div>{/* end relative z-10 content */}
//       </div>{/* end cut-edge wrapper */}
//     </div>
//   );
// }