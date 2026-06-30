// "use client"; // To make using hooks safely.

// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// // import styles from './styles/adminLayoutStyles.css';
// import styles from "../../../styles/adminLayoutStyles.module.css";

// export default function AdminLayoutSidebarItems() {
//     const pathname = usePathname();

//     const isBooksActive = pathname === '/admin/books' || (pathname.startsWith('/admin/books/'));
//     const isDesktopActive = pathname === '/admin/desktop' || (pathname.startsWith('/admin/desktop/'));
//     const isManagersActive = pathname === '/admin/managers' || (pathname.startsWith('/admin/managers/'));
//     const isUsersActive = pathname === '/admin/users' || (pathname.startsWith('/admin/users/'));
//     const isRolesActive = pathname === '/admin/roles' || pathname.startsWith('/admin/roles/');
//     const isAnalyticsActive = pathname === '/admin/analytics' || pathname.startsWith('/admin/analytics/');
//     const isSystemActive = pathname === '/admin/system' || pathname.startsWith('/admin/system/');
//     const isComplaintsActive = pathname === '/admin/complaints' || pathname.startsWith('/admin/complaints/');
//     const isSettingsActive = pathname === '/admin/platform-settings' || pathname.startsWith('/admin/platform-settings/');
//     const isLogsActive = pathname === '/admin/logs' || pathname.startsWith('/admin/logs/');
//     const isMySettingsActive = pathname === '/admin/my-settings' || pathname.startsWith('/admin/my-settings/');
//     const isOrdersActive = pathname === '/admin/orders' || pathname.startsWith('/admin/orders/');
//     const isReviewsActive = pathname === '/admin/reviews' || pathname.startsWith('/admin/reviews/');
//     const isNewspaperActive = pathname === '/admin/newspaper' || pathname.startsWith('/admin/newspaper/');
    
    
//     console.log("Current path: " + pathname); // Added for checking pathes

//     return (
//         // <div className="absolute w-[260px] h-[625px] top-[104.76px]  left-[23.71px] gap-[21px] flex flex-col opacity-100">
//         <div className="relative w-full flex flex-col gap-2 overflow-hidden">

//             {/* Desktop */}
//             <div className="pb-[5px] last:pb-0">
//                 <Link
//                 href="/admin/desktop"
//                 className={`${styles.customTabLink} ${isDesktopActive ? styles.active : ''}`}
//                 >
//                 <div className={styles.shapeContainer}>
//                     {/* Left Part: Image Container */}
//                     <div className="relative w-[32px] h-[32px] flex-shrink-0">
//                     <Image
//                         src="/images/admin_manager_layout/desktop.svg"
//                         alt="Desktop icon"
//                         fill
//                         className={`${styles.icon} object-contain`}
//                     />
//                     </div>
//                     {/* Right Part: Text */}
//                     <span className={styles.linkText}>
//                     Робочий стіл
//                     </span>
//                 </div>
//                 </Link>
//             </div>

//             {/* Managers */}
//             <div className="pb-[5px] last:pb-0">
//             <Link
//                 href="/admin/managers"
//                 className={`${styles.customTabLink} ${isManagersActive ? styles.active : ''}`}
//             >
//                 <div className={styles.shapeContainer}>
                
//                 {/* Left Part: Image Container */}
//                 <div className="relative w-[32px] h-[32px] flex-shrink-0">
//                     <Image
//                     src="/images/admin_manager_layout/managers.svg"
//                     alt="Managers icon"
//                     fill
//                     className={`${styles.icon} object-contain`}
//                     />
//                 </div>

//                 {/* Right Part: Text */}
//                 <span className={styles.linkText}>
//                     Менеджери
//                 </span>

//                 </div>
//             </Link>
//             </div>

//             {/* Users */}
//             <div className="pb-[5px] last:pb-0">
//             <Link
//                 href="/admin/users"
//                 className={`${styles.customTabLink} ${isUsersActive ? styles.active : ''}`}
//             >
//                 <div className={styles.shapeContainer}>

//                 {/* Left Part: Image Container */}
//                 <div className="relative w-[32px] h-[32px] flex-shrink-0">
//                     <Image
//                     src="/images/admin_manager_layout/users.svg"
//                     alt="Users icon"
//                     fill
//                     className={`${styles.icon} object-contain`}
//                     />
//                 </div>

//                 {/* Right Part: Text */}
//                 <span className={styles.linkText}>
//                     Користувачі
//                 </span>

//                 </div>
//             </Link>
//             </div>

//             {/* Roles and access */}
//             <div className="pb-[5px] last:pb-0">
//                 <Link
//                     href="/admin/roles"
//                     className={`${styles.customTabLink} ${isRolesActive ? styles.active : ''}`}
//                 >
//                     <div className={styles.shapeContainer}>
//                         {/* Left Part: Image Container */}
//                         <div className="relative w-[32px] h-[32px] flex-shrink-0">
//                             <Image
//                                 src="/images/admin_manager_layout/roles.svg"
//                                 alt="Roles icon"
//                                 fill
//                                 className={`${styles.icon} object-contain`}
//                             />
//                         </div>

//                         {/* Right Part: Text */}
//                         <span className={styles.linkText}>
//                             Ролі та доступи
//                         </span>
//                     </div>
//                 </Link>
//             </div>

//             {/* Analytics */}
//             <div className="pb-[5px] last:pb-0">
//                 <Link
//                     href="/admin/analytics"
//                     className={`${styles.customTabLink} ${isAnalyticsActive ? styles.active : ''}`}
//                 >
//                     <div className={styles.shapeContainer}>
//                         {/* Left Part: Image Container */}
//                         <div className="relative w-[32px] h-[32px] flex-shrink-0">
//                             <Image
//                                 src="/images/admin_manager_layout/analitics.svg"
//                                 alt="Analytics icon"
//                                 fill
//                                 className={`${styles.icon} object-contain`}
//                             />
//                         </div>

//                         {/* Right Part: Text */}
//                         <span className={styles.linkText}>
//                             Аналітика
//                         </span>
//                     </div>
//                 </Link>
//             </div>

//             {/* System and safety */}
//             <div className="pb-[5px] last:pb-0">
//                 <Link
//                     href="/admin/system"
//                     className={`${styles.customTabLink} ${isSystemActive ? styles.active : ''}`}
//                 >
//                     <div className={styles.shapeContainer}>
//                         {/* Left Part: Image Container */}
//                         <div className="relative w-[32px] h-[32px] flex-shrink-0">
//                             <Image
//                                 src="/images/admin_manager_layout/system_and_safety.svg"
//                                 alt="System and safety icon"
//                                 fill
//                                 className={`${styles.icon} object-contain`}
//                             />
//                         </div>

//                         {/* Right Part: Text */}
//                         <span className={styles.linkText}>
//                             Система і безпека
//                         </span>
//                     </div>
//                 </Link>
//             </div>

//             {/* Platform complaints */}
//             <div className="pb-[5px] last:pb-0">
//                 <Link
//                     href="/admin/complaints"
//                     className={`${styles.customTabLink} ${isComplaintsActive ? styles.active : ''}`}
//                 >
//                     <div className={styles.shapeContainer}>
//                         {/* Left Part: Image Container */}
//                         <div className="relative w-[32px] h-[32px] flex-shrink-0">
//                             <Image
//                                 src="/images/admin_manager_layout/platform_complaints.svg"
//                                 alt="Platform complaints icon"
//                                 fill
//                                 className={`${styles.icon} object-contain`}
//                             />
//                         </div>

//                         {/* Right Part: Text */}
//                         <span className={styles.linkText}>
//                             Скарги платформи
//                         </span>
//                     </div>
//                 </Link>
//             </div>

//             {/* Platform settings */}
//             <div className="pb-[5px] last:pb-0">
//                 <Link
//                     href="/admin/platform-settings"
//                     className={`${styles.customTabLink} ${isSettingsActive ? styles.active : ''}`}
//                 >
//                     <div className={styles.shapeContainer}>
//                         {/* Left Part: Image Container */}
//                         <div className="relative w-[32px] h-[32px] flex-shrink-0">
//                             <Image
//                                 src="/images/admin_manager_layout/platform_settings.svg"
//                                 alt="Platform settings icon"
//                                 fill
//                                 className={`${styles.icon} object-contain`}
//                             />
//                         </div>

//                         {/* Right Part: Text */}
//                         <span className={styles.linkText}>
//                             Налаштування платформи
//                         </span>
//                     </div>
//                 </Link>
//             </div>

//             {/* Log */}
//             <div className="pb-[5px] last:pb-0">
//                 <Link
//                     href="/admin/logs"
//                     className={`${styles.customTabLink} ${isLogsActive ? styles.active : ''}`}
//                 >
//                     <div className={styles.shapeContainer}>
//                         {/* Left Part: Image Container */}
//                         <div className="relative w-[32px] h-[32px] flex-shrink-0">
//                             <Image
//                                 src="/images/admin_manager_layout/actions_log.svg"
//                                 alt="Actions log icon"
//                                 fill
//                                 className={`${styles.icon} object-contain`}
//                             />
//                         </div>

//                         {/* Right Part: Text */}
//                         <span className={styles.linkText}>
//                             Журнал дій
//                         </span>
//                     </div>
//                 </Link>
//             </div>

//             {/* My settings */}
//             <div className="pb-[5px] last:pb-0">
//                 <Link
//                     href="/admin/my-settings"
//                     className={`${styles.customTabLink} ${isMySettingsActive ? styles.active : ''}`}
//                 >
//                     <div className={styles.shapeContainer}>
//                         {/* Left Part: Image Container */}
//                         <div className="relative w-[32px] h-[32px] flex-shrink-0">
//                             <Image
//                                 src="/images/admin_manager_layout/my_settings.svg"
//                                 alt="My settings icon"
//                                 fill
//                                 className={`${styles.icon} object-contain`}
//                             />
//                         </div>

//                         {/* Right Part: Text */}
//                         <span className={styles.linkText}>
//                             Мої налаштування
//                         </span>
//                     </div>
//                 </Link>
//             </div>

//             {/* Books */}
//             <div className="pb-[5px] last:pb-0">
//                 <Link
//                     href="/admin/books"
//                     className={`${styles.customTabLink} ${isBooksActive ? styles.active : ''}`}
//                 >
//                     <div className={styles.shapeContainer}>
//                         {/* Left Part: Image Container */}
//                         <div className="relative w-[32px] h-[32px] flex-shrink-0">
//                             <Image
//                                 src="/images/admin_manager_layout/books.svg"
//                                 alt="Books icon"
//                                 fill
//                                 className={`${styles.icon} object-contain`}
//                             />
//                         </div>

//                         {/* Right Part: Text */}
//                         <span className={styles.linkText}>
//                             Книги
//                         </span>
//                     </div>
//                 </Link>
//             </div>

//             {/* Orders */}
//             <div className="pb-[5px] last:pb-0">
//                 <Link
//                     href="/admin/orders"
//                     className={`${styles.customTabLink} ${isOrdersActive ? styles.active : ''}`}
//                 >
//                     <div className={styles.shapeContainer}>
//                         {/* Left Part: Image Container */}
//                         <div className="relative w-[32px] h-[32px] flex-shrink-0">
//                             <Image
//                                 src="/images/admin_manager_layout/orders.svg"
//                                 alt="Orders icon"
//                                 fill
//                                 className={`${styles.icon} object-contain`}
//                             />
//                         </div>

//                         {/* Right Part: Text */}
//                         <span className={styles.linkText}>
//                             Замовлення
//                         </span>
//                     </div>
//                 </Link>
//             </div>

//             {/* Reviews */}
//             <div className="pb-[5px] last:pb-0">
//                 <Link
//                     href="/admin/reviews"
//                     className={`${styles.customTabLink} ${isReviewsActive ? styles.active : ''}`}
//                 >
//                     <div className={styles.shapeContainer}>
//                         {/* Left Part: Image Container */}
//                         <div className="relative w-[32px] h-[32px] flex-shrink-0">
//                             <Image
//                                 src="/images/admin_manager_layout/reviews.svg"
//                                 alt="Reviews icon"
//                                 fill
//                                 className={`${styles.icon} object-contain`}
//                             />
//                         </div>

//                         {/* Right Part: Text */}
//                         <span className={styles.linkText}>
//                             Відгуки
//                         </span>
//                     </div>
//                 </Link>
//             </div>

//             {/* Newspaper */}
//             <div className="pb-[5px] last:pb-0">
//                 <Link
//                     href="/admin/newspaper"
//                     className={`${styles.customTabLink} ${isNewspaperActive ? styles.active : ''}`}
//                 >
//                     <div className={styles.shapeContainer}>
//                         {/* Left Part: Image Container */}
//                         <div className="relative w-[32px] h-[32px] flex-shrink-0">
//                             <Image
//                                 src="/images/admin_manager_layout/books.svg"
//                                 alt="Newspaper icon"
//                                 fill
//                                 className={`${styles.icon} object-contain`}
//                             />
//                         </div>

//                         {/* Right Part: Text */}
//                         <span className={styles.linkText}>
//                             Газета
//                         </span>
//                     </div>
//                 </Link>
//             </div>

//         </div>
//     );


// }


"use client"; // To make using hooks safely.

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import styles from './styles/adminLayoutStyles.css';
import styles from "../../../styles/adminLayoutStyles.module.css";

export default function AdminLayoutSidebarItems() {
    const pathname = usePathname();

    const isBooksActive = pathname === '/admin/books' || (pathname.startsWith('/admin/books/'));
    const isDesktopActive = pathname === '/admin/desktop' || (pathname.startsWith('/admin/desktop/'));
    const isManagersActive = pathname === '/admin/managers' || (pathname.startsWith('/admin/managers/'));
    const isUsersActive = pathname === '/admin/users' || (pathname.startsWith('/admin/users/'));
    const isRolesActive = pathname === '/admin/roles' || pathname.startsWith('/admin/roles/');
    const isAnalyticsActive = pathname === '/admin/analytics' || pathname.startsWith('/admin/analytics/');
    const isSystemActive = pathname === '/admin/system' || pathname.startsWith('/admin/system/');
    const isComplaintsActive = pathname === '/admin/complaints' || pathname.startsWith('/admin/complaints/');
    const isSettingsActive = pathname === '/admin/platform-settings' || pathname.startsWith('/admin/platform-settings/');
    const isLogsActive = pathname === '/admin/logs' || pathname.startsWith('/admin/logs/');
    const isMySettingsActive = pathname === '/admin/my-settings' || pathname.startsWith('/admin/my-settings/');
    const isOrdersActive = pathname === '/admin/orders' || pathname.startsWith('/admin/orders/');
    const isReviewsActive = pathname === '/admin/reviews' || pathname.startsWith('/admin/reviews/');
    const isNewspaperActive = pathname === '/admin/newspaper' || pathname.startsWith('/admin/newspaper/');
    
    

    return (
        // <div className="absolute w-[260px] h-[625px] top-[104.76px]  left-[23.71px] gap-[21px] flex flex-col opacity-100">
        <div className="relative w-full flex flex-col gap-[5px] overflow-visible">

            {/* Desktop */}
            <div className="pb-[0px] last:pb-0">
                <Link
                href="/admin/desktop"
                className={`${styles.customTabLink} ${isDesktopActive ? styles.active : ''}`}
                >
                <div className={styles.shapeContainer}>
                    {/* Left Part: Image Container */}
                    <div className="relative w-[32px] h-[32px] flex-shrink-0">
                    <Image
                        src="/images/admin_manager_layout/desktop.svg"
                        alt="Desktop icon"
                        fill
                        className={`${styles.icon} object-contain`}
                    />
                    </div>
                    {/* Right Part: Text */}
                    <span className={styles.linkText}>
                    Робочий стіл
                    </span>
                </div>
                </Link>
            </div>

            {/* Managers */}
            <div className="pb-[0px] last:pb-0">
            <Link
                href="/admin/managers"
                className={`${styles.customTabLink} ${isManagersActive ? styles.active : ''}`}
            >
                <div className={styles.shapeContainer}>
                
                {/* Left Part: Image Container */}
                <div className="relative w-[32px] h-[32px] flex-shrink-0">
                    <Image
                    src="/images/admin_manager_layout/managers.svg"
                    alt="Managers icon"
                    fill
                    className={`${styles.icon} object-contain`}
                    />
                </div>

                {/* Right Part: Text */}
                <span className={styles.linkText}>
                    Менеджери
                </span>

                </div>
            </Link>
            </div>

            {/* Users */}
            <div className="pb-[0px] last:pb-0">
            <Link
                href="/admin/users"
                className={`${styles.customTabLink} ${isUsersActive ? styles.active : ''}`}
            >
                <div className={styles.shapeContainer}>

                {/* Left Part: Image Container */}
                <div className="relative w-[32px] h-[32px] flex-shrink-0">
                    <Image
                    src="/images/admin_manager_layout/users.svg"
                    alt="Users icon"
                    fill
                    className={`${styles.icon} object-contain`}
                    />
                </div>

                {/* Right Part: Text */}
                <span className={styles.linkText}>
                    Користувачі
                </span>

                </div>
            </Link>
            </div>

            {/* Roles and access */}
            <div className="pb-[0px] last:pb-0">
                <Link
                    href="/admin/roles"
                    className={`${styles.customTabLink} ${isRolesActive ? styles.active : ''}`}
                >
                    <div className={styles.shapeContainer}>
                        {/* Left Part: Image Container */}
                        <div className="relative w-[32px] h-[32px] flex-shrink-0">
                            <Image
                                src="/images/admin_manager_layout/roles.svg"
                                alt="Roles icon"
                                fill
                                className={`${styles.icon} object-contain`}
                            />
                        </div>

                        {/* Right Part: Text */}
                        <span className={styles.linkText}>
                            Ролі та доступи
                        </span>
                    </div>
                </Link>
            </div>

            {/* Analytics */}
            <div className="pb-[0px] last:pb-0">
                <Link
                    href="/admin/analytics"
                    className={`${styles.customTabLink} ${isAnalyticsActive ? styles.active : ''}`}
                >
                    <div className={styles.shapeContainer}>
                        {/* Left Part: Image Container */}
                        <div className="relative w-[32px] h-[32px] flex-shrink-0">
                            <Image
                                src="/images/admin_manager_layout/analitics.svg"
                                alt="Analytics icon"
                                fill
                                className={`${styles.icon} object-contain`}
                            />
                        </div>

                        {/* Right Part: Text */}
                        <span className={styles.linkText}>
                            Аналітика
                        </span>
                    </div>
                </Link>
            </div>

            {/* System and safety */}
            <div className="pb-[0px] last:pb-0">
                <Link
                    href="/admin/system"
                    className={`${styles.customTabLink} ${isSystemActive ? styles.active : ''}`}
                >
                    <div className={styles.shapeContainer}>
                        {/* Left Part: Image Container */}
                        <div className="relative w-[32px] h-[32px] flex-shrink-0">
                            <Image
                                src="/images/admin_manager_layout/system_and_safety.svg"
                                alt="System and safety icon"
                                fill
                                className={`${styles.icon} object-contain`}
                            />
                        </div>

                        {/* Right Part: Text */}
                        <span className={styles.linkText}>
                            Система і безпека
                        </span>
                    </div>
                </Link>
            </div>

            {/* Platform complaints */}
            <div className="pb-[0px] last:pb-0">
                <Link
                    href="/admin/complaints"
                    className={`${styles.customTabLink} ${isComplaintsActive ? styles.active : ''}`}
                >
                    <div className={styles.shapeContainer}>
                        {/* Left Part: Image Container */}
                        <div className="relative w-[32px] h-[32px] flex-shrink-0">
                            <Image
                                src="/images/admin_manager_layout/platform_complaints.svg"
                                alt="Platform complaints icon"
                                fill
                                className={`${styles.icon} object-contain`}
                            />
                        </div>

                        {/* Right Part: Text */}
                        <span className={styles.linkText}>
                            Скарги платформи
                        </span>
                    </div>
                </Link>
            </div>

            {/* Platform settings */}
            <div className="pb-[0px] last:pb-0">
                <Link
                    href="/admin/platform-settings"
                    className={`${styles.customTabLink} ${isSettingsActive ? styles.active : ''}`}
                >
                    <div className={styles.shapeContainer}>
                        {/* Left Part: Image Container */}
                        <div className="relative w-[32px] h-[32px] flex-shrink-0">
                            <Image
                                src="/images/admin_manager_layout/platform_settings.svg"
                                alt="Platform settings icon"
                                fill
                                className={`${styles.icon} object-contain`}
                            />
                        </div>

                        {/* Right Part: Text */}
                        <span className={styles.linkText}>
                            Налаштування платформи
                        </span>
                    </div>
                </Link>
            </div>

            {/* Log */}
            <div className="pb-[0px] last:pb-0">
                <Link
                    href="/admin/logs"
                    className={`${styles.customTabLink} ${isLogsActive ? styles.active : ''}`}
                >
                    <div className={styles.shapeContainer}>
                        {/* Left Part: Image Container */}
                        <div className="relative w-[32px] h-[32px] flex-shrink-0">
                            <Image
                                src="/images/admin_manager_layout/actions_log.svg"
                                alt="Actions log icon"
                                fill
                                className={`${styles.icon} object-contain`}
                            />
                        </div>

                        {/* Right Part: Text */}
                        <span className={styles.linkText}>
                            Журнал дій
                        </span>
                    </div>
                </Link>
            </div>

            {/* My settings */}
            <div className="pb-[0px] last:pb-0">
                <Link
                    href="/admin/my-settings"
                    className={`${styles.customTabLink} ${isMySettingsActive ? styles.active : ''}`}
                >
                    <div className={styles.shapeContainer}>
                        {/* Left Part: Image Container */}
                        <div className="relative w-[32px] h-[32px] flex-shrink-0">
                            <Image
                                src="/images/admin_manager_layout/my_settings.svg"
                                alt="My settings icon"
                                fill
                                className={`${styles.icon} object-contain`}
                            />
                        </div>

                        {/* Right Part: Text */}
                        <span className={styles.linkText}>
                            Мої налаштування
                        </span>
                    </div>
                </Link>
            </div>

            {/* Books */}
            <div className="pb-[0px] last:pb-0">
                <Link
                    href="/admin/books"
                    className={`${styles.customTabLink} ${isBooksActive ? styles.active : ''}`}
                >
                    <div className={styles.shapeContainer}>
                        {/* Left Part: Image Container */}
                        <div className="relative w-[32px] h-[32px] flex-shrink-0">
                            <Image
                                src="/images/admin_manager_layout/books.svg"
                                alt="Books icon"
                                fill
                                className={`${styles.icon} object-contain`}
                            />
                        </div>

                        {/* Right Part: Text */}
                        <span className={styles.linkText}>
                            Книги
                        </span>
                    </div>
                </Link>
            </div>

            {/* Orders */}
            <div className="pb-[0px] last:pb-0">
                <Link
                    href="/admin/orders"
                    className={`${styles.customTabLink} ${isOrdersActive ? styles.active : ''}`}
                >
                    <div className={styles.shapeContainer}>
                        {/* Left Part: Image Container */}
                        <div className="relative w-[32px] h-[32px] flex-shrink-0">
                            <Image
                                src="/images/admin_manager_layout/orders.svg"
                                alt="Orders icon"
                                fill
                                className={`${styles.icon} object-contain`}
                            />
                        </div>

                        {/* Right Part: Text */}
                        <span className={styles.linkText}>
                            Замовлення
                        </span>
                    </div>
                </Link>
            </div>

            {/* Reviews */}
            <div className="pb-[0px] last:pb-0">
                <Link
                    href="/admin/reviews"
                    className={`${styles.customTabLink} ${isReviewsActive ? styles.active : ''}`}
                >
                    <div className={styles.shapeContainer}>
                        {/* Left Part: Image Container */}
                        <div className="relative w-[32px] h-[32px] flex-shrink-0">
                            <Image
                                src="/images/admin_manager_layout/reviews.svg"
                                alt="Reviews icon"
                                fill
                                className={`${styles.icon} object-contain`}
                            />
                        </div>

                        {/* Right Part: Text */}
                        <span className={styles.linkText}>
                            Відгуки
                        </span>
                    </div>
                </Link>
            </div>

            {/* Newspaper */}
            <div className="pb-[0px] last:pb-0">
                <Link
                    href="/admin/newspaper"
                    className={`${styles.customTabLink} ${isNewspaperActive ? styles.active : ''}`}
                >
                    <div className={styles.shapeContainer}>
                        {/* Left Part: Image Container */}
                        <div className="relative w-[32px] h-[32px] flex-shrink-0">
                            <Image
                                src="/images/admin_manager_layout/books.svg"
                                alt="Newspaper icon"
                                fill
                                className={`${styles.icon} object-contain`}
                            />
                        </div>

                        {/* Right Part: Text */}
                        <span className={styles.linkText}>
                            Газета
                        </span>
                    </div>
                </Link>
            </div>

        </div>
    );


}












