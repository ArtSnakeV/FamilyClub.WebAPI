import Link from 'next/link';
import BooksNav from './booksNav';
import Image from "next/image";
import { ProductsApi, Configuration } from '@/lib/api/generated'; // To get info about our Books


if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}


export default async function AllBooks() {
    // Let's get data about our products
    const config = new Configuration({
        basePath: "https://localhost:7069"
    });

    const api = new ProductsApi(config);

    try {
        const products = await api.apiProductsGet();

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




                        
                    </div>
                </div>


            </>
        );
    }
    catch (error) {
        console.error("API ERROR FULL:", error);
        return (
            <div>
                Failed to load products.
            </div>
        );
    }
}