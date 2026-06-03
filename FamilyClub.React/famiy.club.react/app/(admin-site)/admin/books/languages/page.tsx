import BooksNav from '../booksNav';
import AddEditButton from '@/app/(admin-site)/common_elements/add_edit_button';
import DeleteButton from '@/app/(admin-site)/common_elements/delete_button';
import { LanguagesApi, Configuration } from '@/lib/api/generated';
import AddLanguageForm from './addLanguageForm'; // Import the new form wrapper
import DeleteLanguageAction from './deleteLanguageAction';

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
                    {/* Clean & Interactive Form Component to add new language */}
                    <AddLanguageForm />

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
                                    {language.id !== undefined && (
                                        <DeleteLanguageAction 
                                            languageId={language.id} 
                                            languageName={language.languageName || "Невідома мова"} 
                                        />
                                    )}
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