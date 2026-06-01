import BooksNav from '../booksNav';
import AddEditButton from '@/app/(admin-site)/common_elements/add_edit_button';
import DeleteButton from '@/app/(admin-site)/common_elements/delete_button';
import { LanguagesApi, Configuration } from '@/lib/api/generated';

export default async function LanguagesPage() {
    // Let's get data about our languages
    const config = new Configuration({
        basePath: "https://localhost:7069"
    });
    const api = new LanguagesApi(config);
    try {
        const languages = await api.apiLanguagesGet();

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

                    <p className="w-[373px] h-[30px] mb-[10px] opacity-100 font-sans font-semibold text-[20px] leading-[150%] tracking-[-0.011em] align-middle text-[var(--foreground-primary)]">
                        Додати мову:
                    </p>


                    <div className="max-w-[1464px] w-full h-[75px] bg-[#F5F3EE] rounded-[9px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] opacity-100 rotate-0 px-[24px] flex items-center justify-between">
                        {/* Ліва частина: Інпут */}
                        <input
                            type="text"
                            placeholder="Введіть назву нової мови..."
                            className="w-[334px] h-[40px] px-[16px] rounded-[16px] bg-white border border-gray-200 shadow-[0_0_10px_0_rgba(0,0,0,0.25)] focus:outline-none focus:border-blue-500 transition-all"
                        />

                        {/* Права частина: Кнопка з Figma */}
                        <AddEditButton>Додати</AddEditButton>
                    </div>

                    <p className="font-[Source_Sans_Pro] font-semibold text-[36px] leading-[150%] tracking-[-0.011em] align-middle">
                        Мови:
                    </p>

                    {/* Список усіх наявних мов */}
                    <div className="grid gap-4">
                        {languages.map((language) => (
                            <div
                                key={language.id}
                                className="max-w-[1464px] w-full h-[50px] bg-[#F5F3EE] rounded-[9px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] px-[24px] flex items-center justify-between"
                            >
                                {/* Left side: language name */}
                                <p className="font-sanspro font-semibold text-[20px] leading-[150%] tracking-[-0.011em] align-middle">
                                    {language.languageName || "Unnamed Language"}
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
                Failed to load products.
            </div>
        );
    }
}