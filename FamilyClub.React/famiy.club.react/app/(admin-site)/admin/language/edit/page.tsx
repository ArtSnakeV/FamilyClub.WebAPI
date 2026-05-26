'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock initial data structure
interface Language {
    id: number;
    name: string;
}

export default function AdminEditPage() {
    // State to manage your languages list
    const [languages, setLanguages] = useState<Language[]>([
        { id: 1, name: "Українська" },
        { id: 2, name: "English" }
    ]);

    // Tracking state for inline editing
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>("");

    // Trigger edit mode for a row
    const startEditing = (lang: Language) => {
        setEditingId(lang.id);
        setEditValue(lang.name);
    };

    // Save handler (Plug your API updates here)
    const handleSave = (id: number) => {
        setLanguages(prev =>
            prev.map(item => item.id === id ? { ...item, name: editValue } : item)
        );
        setEditingId(null);
    };

    // Cancel edit mode
    const handleCancel = () => {
        setEditingId(null);
        setEditValue("");
    };

    // Delete handler
    const handleDelete = (id: number) => {
        setLanguages(prev => prev.filter(item => item.id !== id));
    };

    return (
        <>
            {/* Top part (Header) */}
            <div
                className="
                    w-screen
                    relative
                    left-1/2
                    -translate-x-1/2
                    bg-center 
                    bg-no-repeat
                    py-8
                    flex 
                    justify-center
                    items-center
                "
                style={{
                    backgroundImage: "url('/images/entities/top_part_to_write.svg')",
                    backgroundSize: "calc(100% + 10px) 100%"
                }}
            >
                <h1 className="text-[family-name:var(--font-sans)] text-2xl font-bold text-center">Редагування мов</h1>
            </div>

            {/* Main content part */}
            <div
                className="absolute bg-cover bg-center bg-no-repeat overflow-hidden"
                style={{
                    width: '1492.88px',
                    height: '1062.04px',
                    backgroundImage: "url('/images/entities/main_field_background.svg')",
                }}
            >
                <div className="absolute inset-[25px] overflow-auto">

                    {/* Table Section */}
                    <div className="mt-4 px-[20px] w-full text-left">
                        
                        {/* Table Header */}
                        <div className="flex border-none pb-4 font-bold text-lg">
                            <div className="flex-1 padding-10">Мова</div>
                            <div className="w-[338px] text-center">Дії</div>
                        </div>

                        {/* Table Body (List of Languages with dynamic Edit states) */}
                        <div className="flex flex-col gap-4">
                            {languages.map((lang) => (
                                <div key={lang.id} className="flex flex-wrap md:flex-nowrap items-center border-none gap-4">
                                    
                                    {/* Language Column (Text or Input Field) */}
                                    <div className="flex-1 min-w-[150px] text-md">
                                        {editingId === lang.id ? (
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="w-full h-[49px] border border-[#005B33] rounded-[9px] px-4 outline-none focus:ring-1 focus:ring-[#005B33] transition-colors"
                                                autoFocus
                                            />
                                        ) : (
                                            <div className="truncate py-3">
                                                {lang.name}
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions Wrapper */}
                                    <div className="flex gap-[10px] flex-shrink-0 flex-wrap sm:flex-nowrap">
                                        {editingId === lang.id ? (
                                            <>
                                                {/* Save Button */}
                                                <button 
                                                    onClick={() => handleSave(lang.id)}
                                                    className="w-full sm:w-[164px] h-[49px] bg-[#005B33] text-white rounded-[9px] font-medium hover:bg-[#004426] transition-all duration-200"
                                                >
                                                    Зберегти
                                                </button>
                                                
                                                {/* Cancel Button */}
                                                <button 
                                                    onClick={handleCancel}
                                                    className="w-full sm:w-[164px] h-[49px] bg-white border border-gray-300 text-gray-700 rounded-[9px] hover:bg-gray-50 transition-all duration-200"
                                                >
                                                    Скасувати
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                {/* Edit Trigger Button */}
                                                <button 
                                                    onClick={() => startEditing(lang)}
                                                    className="w-full sm:w-[164px] h-[49px] bg-white border border-[#005B33] text-[#005B33] rounded-[9px] font-medium hover:bg-green-50 transition-all duration-200"
                                                >
                                                    Змінити
                                                </button>
                                                
                                                {/* Delete Button */}
                                                <button 
                                                    onClick={() => handleDelete(lang.id)}
                                                    className="w-full sm:w-[164px] h-[49px] bg-[#D32F2F] text-white rounded-[9px] font-medium hover:bg-[#b71c1c] transition-all duration-200"
                                                >
                                                    Видалити
                                                </button>
                                            </>
                                        )}
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