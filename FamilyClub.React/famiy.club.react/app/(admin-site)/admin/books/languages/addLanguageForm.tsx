'use client';

import { useRef } from 'react';
import AddEditButton from '@/app/(admin-site)/common_elements/add_edit_button';
import { addLanguageAction } from './actions'; // Import our server action

export default function AddLanguageForm() {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (formData: FormData) => {
        // 1. Trigger the server action to save to the database
        await addLanguageAction(formData);
        
        // 2. Reset the input field instantly after the server responds
        formRef.current?.reset();
    };

    return (
        <form 
            ref={formRef}
            action={handleSubmit} 
            className="max-w-[1464px] w-full h-[75px] bg-[#F5F3EE] rounded-[9px] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] px-[24px] flex items-center justify-between"
        >
            <input
                type="text"
                name="languageName"
                placeholder="Введіть назву нової мови..."
                className="w-[334px] h-[40px] px-[16px] rounded-[16px] bg-white border border-gray-200 shadow-[0_0_10px_0_rgba(0,0,0,0.25)] focus:outline-none focus:border-blue-500 transition-all"
                required
            />

            <AddEditButton type="submit">Додати</AddEditButton>
        </form>
    );
}