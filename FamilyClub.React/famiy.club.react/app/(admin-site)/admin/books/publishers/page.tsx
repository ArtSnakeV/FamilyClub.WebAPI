import BooksNav from '../booksNav';
import AddEditButton from '@/app/(admin-site)/common_elements/add_edit_button';
import DeleteButton from '@/app/(admin-site)/common_elements/delete_button';
import { PublishersApi, Configuration } from '@/lib/api/generated';
import ItemActions from "@/app/(admin-site)/common_elements/item_actions";

export default async function PublishersPage() {
    // Let's get data about our languages
    const config = new Configuration({
        basePath: "https://localhost:7069"
    });
    const api = new PublishersApi(config);
    try {
        const publishers = await api.apiPublishersGet();

        return (
            <div>
                <BooksNav />
                {/* Main content part*/}
                <div
                    className="absolute bg-cover bg-center bg-no-repeat overflow-hidden"
                    style={{
                        width: '1492.88px',
                        height: '1062.04px',
                        padding: '35px',
                        // backgroundImage: "url('/images/entities/main_field_background.svg')",
                    }}
                >
                    <img
                        src="/images/authorPageAdmin/Rectangle 708.png"
                        alt=""
                        className="absolute top-0 left-0 w-full h-full object-fill z-[0]"
                    />

                    {/* Додавання нового видавництва */}
                    <form className="z-10 max-w-[1464px] w-full h-[75px] bg-[#F5F3EE] rounded-[9px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] px-[24px] flex items-center justify-between">
                        <p className="w-[373px] opacity-100 font-sans font-semibold text-[20px] leading-[150%] tracking-[-0.011em] text-[var(--foreground-primary)]">
                            Додати видавництво:
                        </p>
                        <AddEditButton type="submit">Додати</AddEditButton>
                    </form>

                    <p className="z-10 font-[Source_Sans_Pro] font-semibold text-[36px] leading-[150%] tracking-[-0.011em] align-middle">
                        Видавництва:
                    </p>

                    {/* Список усіх наявних видавництв */}
                    <div className="z-10 grid gap-4">
                        {publishers.map((publisher) => (
                            <div
                                key={publisher.id}
                                className="max-w-[1464px] w-full h-[50px] bg-[#F5F3EE] rounded-[9px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] px-[24px] flex items-center justify-between"
                            >
                                {/* Left side: publisher name */}
                                <p className="font-sanspro font-semibold text-[20px] leading-[150%] tracking-[-0.011em] align-middle">
                                    {publisher.publisherName || "Unnamed Language"}
                                </p>

                                {/* Right side: buttons */}
                                <div className="flex items-center gap-[20px]">
                                    <ItemActions id={publisher.id} type="publisher" />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        );
    }
    catch (error) {
        console.error("API ERROR FULL:", error);
        return (
            <div>
                Failed to load publishers.
            </div>
        );
    }
}