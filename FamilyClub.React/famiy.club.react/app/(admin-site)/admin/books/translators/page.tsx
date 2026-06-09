import BooksNav from '../booksNav';
import AddEditButton from '@/app/(admin-site)/common_elements/add_edit_button';
import DeleteButton from '@/app/(admin-site)/common_elements/delete_button';
import { TranslatorsApi, Configuration } from '@/lib/api/generated';

export default async function PublishersPage() {
    // Let's get data about our languages
    const config = new Configuration({
        basePath: "https://localhost:7069"
    });
    const api = new TranslatorsApi(config);
    try {
        const translators = await api.apiTranslatorsGet();

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
                        backgroundImage: "url('/images/entities/main_field_background.svg')",
                    }}
                >

                    {/* Додавання нового видавництва */}
                    <form className="max-w-[1464px] w-full h-[75px] bg-[#F5F3EE] rounded-[9px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] px-[24px] flex items-center justify-between">
                        <p className="w-[373px] opacity-100 font-sans font-semibold text-[20px] leading-[150%] tracking-[-0.011em] text-[var(--foreground-primary)]">
                            Додати перекладача:
                        </p>
                        <AddEditButton type="submit">Додати</AddEditButton>
                    </form>

                    <p className="font-[Source_Sans_Pro] font-semibold text-[36px] leading-[150%] tracking-[-0.011em] align-middle">
                        Перекладачі:
                    </p>

                    {/* Список усіх наявних перекладачів */}
                    <div className="grid gap-4">
                        {translators.map((translator) => (
                            <div
                                key={translator.id}
                                className="max-w-[1464px] w-full h-[50px] bg-[#F5F3EE] rounded-[9px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] px-[24px] flex items-center justify-between"
                            >
                                {/* Left side: translator name */}
                                <p className="font-sanspro font-semibold text-[20px] leading-[150%] tracking-[-0.011em] align-middle">
                                    {translator.translatorName || "Unnamed Language"}
                                </p>

                                {/* Right side: buttons */}
                                <div className="flex items-center gap-[20px]">
                                    <AddEditButton>Редагувати</AddEditButton>
                                    <DeleteButton>Видалити</DeleteButton>
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
                Failed to load translators.
            </div>
        );
    }
}