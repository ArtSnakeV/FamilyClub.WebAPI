// import React from 'react';
// import type { Metadata } from "next";
// import "../../styles/globals.css";
// import { Source_Sans_3, Roboto_Mono } from 'next/font/google';
// import UpNavigation from "../(user-site)/layout/header/UpNavigation";
// import AdminLayoutSidebarItems from './layout/layoutNav';
// import "../../styles/globals.css";
// const sourceSans = Source_Sans_3({
//   subsets: ['cyrillic', 'latin'],
//   variable: '--font-sans', // Назва CSS змінної для використання шрифту в стилях
// });

// const robotoMono = Roboto_Mono({
//   subsets: ['cyrillic', 'latin'],
//   variable: '--font-mono',
// });

// export default async function AdminLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="uk" className={`${sourceSans.variable} ${robotoMono.variable}`} >
//       <body>
//         <header className="bg-[var(--background-main)] overflow-x-0 relative z-30 h-[62px] shadow-[0px_0px_15px_0px_#24242499]">
//           <div className="max-w-[1220px] mx-auto flex items-center px-4 lg:px-0">
//             <UpNavigation />
//           </div>
//         </header>

//         {/* LEFT PART (Fixed Sidebar) */}
//         <aside
//           className="fixed left-0 top-0 bottom-0 z-10 select-none pointer-events-auto"
//           style={{
//             width: '369px',
//             backgroundColor: '#C7A381',
//             opacity: 1,
//             transform: 'rotate(0deg)',
//           }}
//         >
//           {/* Our sidebar navigator */}
//           <div
//             className="absolute"
//             style={{
//               width: "315px",
//               minHeight: "880px",
//               height: "max-content",
//               top: "71.76px",
//               left: "49.71px",
//               border: "15px solid transparent",
//               opacity: 1,
//               backgroundImage: "url('/images/admin_manager_layout/sidebar_bg.png')",
//               backgroundSize: "100% 100%",
//               backgroundPosition: "center",
//               backgroundRepeat: "no-repeat",
//               display: "flex",
//             flexDirection: "row",
//             gap: "5px", //
//             }}
//           >
//             {/* Content of sidebar */}
//             <div className="flex items-center gap-4">
//               {/*First row*/}
//               <div
//                 className="fixed flex items-center"
//                 style={{
//                   width: "294px",
//                   height: "60px",
//                   top: "120.76px",
//                   left: "69.71px",
//                   paddingLeft: "25px",
//                   paddingRight: "25px",
//                   gap: "25px",
//                   opacity: 1,
//                 }}
//               >
//                 {/* LEFT PART — IMAGE */}
//                 <div
//                   style={{
//                     width: "60px",
//                     height: "60px",
//                     backgroundImage: "url('/images/admin_manager_layout/cat_circle.svg')",
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                     backgroundRepeat: "no-repeat",
//                     boxShadow: "0px 0px 10px 0px #24242400",
//                   }}
//                 ></div>
//                 {/* RIGHT PART — TEXT */}
//                 <div className="flex flex-col justify-center">
//                   {/* FIRST LINE */}
//                   <div
//                     style={{
//                       width: "106px",
//                       height: "36px",
//                       fontFamily: "var(--font-sans)",
//                       fontWeight: 600,
//                       fontSize: "24px",
//                       lineHeight: "150%",
//                       letterSpacing: "-1.1%",
//                       background: "bg-[var(--background-main)]",
//                       color: "text-foreground",
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     Ink & Echo
//                   </div>
//                   {/* SECOND LINE */}
//                   <div
//                     style={{
//                       width: "106px",
//                       height: "24px",
//                       fontFamily: "var(--font-sans)",
//                       fontWeight: 600,
//                       fontSize: "16px",
//                       lineHeight: "150%",
//                       letterSpacing: "-1.1%",
//                       background: "bg-[var(--background-main)]",
//                       color: "var(--font-sans)",
//                       display: "flex",
//                       alignItems: "center",
//                       opacity: "0.5",
//                     }}
//                   >
//                     Адміністратор
//                   </div>
//                 </div>
//               </div>

//               {/*List of items in sidebar*/}
//               <AdminLayoutSidebarItems/>

//             </div>
//           </div>
//         </aside>

//         {/* RIGHT PART (Main Content Area) */}
//         <main
//           className="flex-1 min-h-screen overflow-y-auto overflow-x-hidden flex flex-col"
//           style={{
//             marginLeft: '369px', // Pushes content to the right of the fixed sidebar
//             backgroundColor: '#DBD7CD',
//             border: '10px solid transparent', // Creates the 10px border space
//             boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.50)', // #00000080 in RGBA
//           }}
//         >
//           {/* Inner container to hold our actual page views */}
//           <div className="w-full flex-1 p-6">
//             {children}
//           </div>
//         </main>

//         {/* <footer></footer> */}
//       </body>
//     </html>
//   );
// }

import React from "react";
import "../../styles/globals.css";
import { Source_Sans_3, Roboto_Mono } from "next/font/google";
import UpNavigation from "../(user-site)/layout/header/UpNavigation";
import AdminLayoutSidebarItems from "./layout/layoutNav";

const sourceSans = Source_Sans_3({
  subsets: ["cyrillic", "latin"],
  variable: "--font-sans",
});

const robotoMono = Roboto_Mono({
  subsets: ["cyrillic", "latin"],
  variable: "--font-mono",
});

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${sourceSans.variable} ${robotoMono.variable}`}>
      <body style={{ margin: 0, padding: 0 }}>
        {/* HEADER — fixed */}
        <header
          className="bg-[var(--background-main)] flex flex-row z-30"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "62px",
            boxShadow: "0px 0px 15px 0px #24242499",
          }}
        >
          <div className="max-w-[1220px] mx-auto flex items-center ml-8 lg:px-0">
            <UpNavigation />
          </div>
        </header>

        {/* SIDEBAR — fixed */}
        <aside
          className="fixed left-0 z-20 flex flex-col"
          style={{
            top: "62px",
            bottom: 0,
            width: "260px",
            backgroundColor: "#C7A381",
          }}
        >
          {/* Our sidebar navigator */}
          <div
            className="absolute"
            style={{
              width: "258px",
              minHeight: "596px",
              height: "max-content",
              top: "-10px",
              left: "10px",
              border: "15px solid transparent",
              opacity: 1,
              backgroundImage:
                "url('/images/admin_manager_layout/sidebar_bg.png')",
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {/* Content of sidebar */}
            <div className="flex items-center">
              {/*First row*/}
              <div
                className="fixed flex items-center"
                style={{
                  width: "200px",
                  height: "30px",
                  top: "76px",
                  left: "69.71px",
                  paddingLeft: "5px",
                  paddingRight: "10px",
                  gap: "25px",
                  opacity: 1,
                }}
              >
                {/* LEFT PART — IMAGE */}
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundImage:
                      "url('/images/admin_manager_layout/cat_circle.svg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    boxShadow: "0px 0px 10px 0px #24242400",
                  }}
                ></div>
                {/* RIGHT PART — TEXT */}
                <div className="flex flex-col justify-center mt-2">
                  {/* FIRST LINE */}
                  <div
                    style={{
                      width: "106px",
                      height: "18px",
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "150%",
                      letterSpacing: "-1.1%",
                      background: "bg-[var(--background-main)]",
                      color: "text-foreground",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Ink & Echo
                  </div>
                  {/* SECOND LINE */}
                  <div
                    style={{
                      width: "106px",
                      height: "24px",
                      fontFamily: "var(--font-sans)",
                      fontWeight: 400,
                      fontSize: "15px",
                      lineHeight: "150%",
                      letterSpacing: "-1.1%",
                      background: "bg-[var(--background-main)]",
                      color: "var(--font-sans)",
                      display: "flex",
                      alignItems: "center",
                      opacity: "0.5",
                    }}
                  >
                    Адміністратор
                  </div>
                </div>
              </div>

              {/*List of items in sidebar*/}
              <AdminLayoutSidebarItems />
            </div>
          </div>
        </aside>

        <main
          className="min-h-screen flex flex-col"
          style={{
            marginLeft: "245px",
            marginTop: "62px",
            backgroundColor: "#DBD7CD",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.50)",
          }}
        >
          <div className="w-full flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
