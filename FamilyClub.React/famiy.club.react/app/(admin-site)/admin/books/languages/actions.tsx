'use server';

import { revalidatePath } from 'next/cache';
import { LanguagesApi, Configuration } from '@/lib/api/generated';
import { LanguageDto } from '@/lib/api/generated';

export async function addLanguageAction(formData: FormData) {
    const languageName = formData.get('languageName') as string;

    if (!languageName || languageName.trim() === '') {
        return { error: 'Назва мови не може бути порожньою' };
    }

    const config = new Configuration({
        basePath: "https://localhost:7069"
    });
    const api = new LanguagesApi(config);

    try {
        await api.apiLanguagesPost({
            languageDto: {
                id: 0,
                languageName: languageName.trim()
            }
        });
        // This refreshes the Server Component cache, instantly showing the new language!
        revalidatePath('/languages'); 
    } catch (error) {
        console.error("Failed to add language:", error);
        return { error: 'Помилка при додаванні мови' };
    }
}