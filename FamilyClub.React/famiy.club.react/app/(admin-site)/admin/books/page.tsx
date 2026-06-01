import Link from 'next/link';
import BooksNav from './booksNav';
import Image from "next/image";
import { ProductsApi } from '@/lib/api/generated'; // To get info about our Books

export default async function AllBooks() {
    // Let's get data about our products
    const api = new ProductsApi();
    const products = await api.apiProductsGet();
    const productNames = products.map(p => p.productName);


    return (
        <>

            {/* Top part (Header)*/}
            {/* Links for entities pages */}
            {/* Ссилки на сторінки сутностей */}
            <BooksNav />


            {/* Main content part*/}
            <div
                className="absolute bg-cover bg-center bg-no-repeat overflow-hidden"
                style={{
                    width: '1492.88px',
                    height: '1062.04px',
                    backgroundImage: "url('/images/entities/main_field_background.svg')",
                }}
            >

                <div className="absolute inset-[25px] overflow-auto">

                    {/* Content goes here */}

                    {/* Search part */}
                    {/* search_icon.svg */}
                    <div
                        className="w-full flex items-center gap-[10px] p-[10px]"
                        style={{
                            opacity: '1',
                        }}
                    >
                        {/* Input Field:
                            - `flex-1`: Tells the input to grow and fill all available remaining space.
                            - `min-w-[100px]`: Prevents the input from shrinking smaller than 100px on tiny screens.
                            - `h-[49px]`: Sets the master height for the row elements.
                        */}
                        <div className="relative w-full max-w-[684px]">
                            <input
                                type="text"
                                placeholder="Введіть будь ласка назву книги для пошуку"
                                className="
                                    w-full
                                    h-[49px]
                                    border border-gray-300
                                    rounded-[9px]
                                    pl-4
                                    pr-12
                                    outline-none
                                    focus:border-[#005B33]
                                    transition-colors
                                "
                            />
                            <button
                                type="button"
                                // onClick={() => {
                                //     console.log("Search clicked");
                                // }}
                                className="
                                    absolute
                                    right-4
                                    top-1/2
                                    -translate-y-1/2
                                    flex
                                    items-center
                                    justify-center
                                    cursor-pointer
                                "
                                aria-label="Search"
                            >
                                <Image
                                    src="/images/common_icons/search_icon.svg"
                                    alt=""
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </div>
                        {/* Action Button:
                            - `h-[49px]`: Matches the input height exactly.
                            - `w-[164px]`: Keeps your fixed Figma width for the button action.
                            - `flex-shrink-0`: Prevents the button from squeezing or changing shape when the page gets small.
                        */}
                        {/* <button
                            type="submit"
                            className="flex-shrink-0 w-[164px] h-[49px] flex items-center justify-center bg-[#005B33] text-white font-medium hover:bg-[#004426] transition-all duration-200"
                            style={{
                                borderRadius: '9px',
                                padding: '10px 20px',
                                opacity: '1',
                            }}
                        >
                            <span>Додати</span>
                        </button> */}
                    </div>
                    

                    <h1>Books:</h1>
                    {/* List of Books */}
                    <div className="grid gap-4">
                        {products.map((product) => (
                            <div 
                                key={product.id} 
                                className="p-4 border border-brand-black/10 rounded shadow-sm bg-white"
                            >
                                <h2 className="text-lg font-semibold text-primary-action">
                                    {product.productName || "Unnamed Category"}
                                </h2>
                                <p className="text-brand-black opacity-70 font-mono text-sm">
                                    ID: {product.id}
                                </p>
                            </div>
                        ))}
                    </div>
                    




                    {/* Table Section */}
                    <div className="mt-8 px-[20px] w-full text-left">
                        {/* Table Header */}
                        <div className="flex border-none pb-4 font-bold text-lg">
                            <div className="flex-1 padding-10">Мова</div>
                            <div className="w-[338px] text-center">Дії</div>
                            {/* Width matches two buttons (164px * 2) + gap (10px) */}
                        </div>

                        {/* Table Body (List of Languages) */}
                        <div className="flex flex-col gap-4">
                            {["Українська", "English"].map((lang, index) => (
                                <div key={index} className="flex flex-wrap md:flex-nowrap items-center border-none gap-4">

                                    {/* Language Name - flex-1 makes this part shrink first */}
                                    <div className="flex-1 min-w-[150px] text-md truncate">
                                        {lang}
                                    </div>

                                    {/* Actions Wrapper */}
                                    <div className="flex gap-[10px] flex-shrink-0 flex-wrap sm:flex-nowrap">
                                        {/* Buttons stay 164px until the screen is very small */}
                                        <button className="w-full sm:w-[164px] h-[49px] bg-white border border-[#005B33] text-[#005B33] rounded-[9px]">
                                            Змінити
                                        </button>
                                        <button className="w-full sm:w-[164px] h-[49px] bg-[#D32F2F] text-white rounded-[9px]">
                                            Видалити
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}