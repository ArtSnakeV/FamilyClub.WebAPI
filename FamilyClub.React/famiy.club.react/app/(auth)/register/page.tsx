"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { authService } from "@/lib/api/services";
import { AsYouType } from 'libphonenumber-js';
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';
import { RegisterClubMemberDtoFromJSONTyped } from "@/lib/api/generated";

export default function RegistrationPage() {
    const router = useRouter();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    // For phone input
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [phone, setPhone] = useState("");
    const [detectedCountry, setDetectedCountry] = useState("ua"); // Default to Ukraine
    const [hasMatch, setHasMatch] = useState(true);
    // Specific 7 countries for the dropdown
    const manualCountries = [
        { code: "ua", dial: "+380" },
        { code: "pl", dial: "+48" },
        { code: "es", dial: "+34" },
        { code: "fr", dial: "+33" },
        { code: "cz", dial: "+420" },
        { code: "ie", dial: "+353" },
        { code: "gb", dial: "+44" },
    ];
    // For password `eye` images
    const [isHovered, setIsHovered] = useState(false);

    const selectCountry = (code: string, dial: string) => {
        setDetectedCountry(code);
        setPhone(dial); // Fills the input with the prefix
        setIsDropdownOpen(false);
    };

    // Creating form
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        agreeToTerms: false,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // For phone input formatting and country detection
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        // Allowed characters for phone number
        const allowedChars = /^[0-9+\-().\s]*$/;

        // Filter input to contain only allowed characters
        if (allowedChars.test(input)) {
            const parser = new AsYouType();
            const formatted = parser.input(input);
            const country = parser.getCountry();

            setPhone(formatted);

            if (country) {
                setDetectedCountry(country.toLowerCase());
                setHasMatch(true);
            } else if (input.length === 0) {
                setDetectedCountry("ua"); // Reset to default if empty
                setHasMatch(true);
            } else {
                setHasMatch(false); // No match found
            }
            formData.phoneNumber = input; // Store raw input for registration
        }
    };
    const handleRegister = async () => {
        setError(""); // Reset error before validation
        if (!formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.password ||
            formData.password !== formData.confirmPassword ||
            !formData.phoneNumber) {
            setError("Please check your input and ensure passwords match.");
            return;
        }
        console.log("FirstName: ", formData.firstName);
        setLoading(true);
        try {
            // Logic for registration would go here
            const response = await authService.apiAuthClubMemberRegisterPost({
                registerClubMemberDto: {
                    email: formData.email,
                    password: formData.password, 
                    phoneNumber: phone,
                    name: formData.firstName,
                    surname: formData.lastName,
                }
            })
            // If we succeed
            console.log("Registering:", response);
            router.push("/login");
        } catch (err) {
            setError("Registration failed.");
        } finally {
            setLoading(false);
        }

    };

    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    return (

        // <div className="fixed inset-0 z-[100] flex justify-end backdrop-blur-sm">
        <div className="fixed inset-0 z-[100] flex justify-end backdrop-blur-sm">

            {/* LEFT SIDE: Background Image */}
            <div
                className="absolute inset-0 z-[-1]" // flex-grow takes remaining space
                style={{
                    backgroundImage: 'url("images/login register/background.png")', // Replace with your path
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />
            {/* Right Panel:
        - Width: Fits 50% of the screen, minimum 400px.
        - Background: Exact Figma linear gradient.
        - Shadow: Custom hex with 80 (50% opacity).
      */}
            <div
                style={{
                    width: '50%',
                    minWidth: '600px', // Fallback for small screens
                    background: 'linear-gradient(193.17deg, #C7A381 0%, #E0C3A9 54.33%, #B7895E 82.69%, #BF8D5D 100%)'
                }}
                className="relative h-full shadow-[0px_0px_30px_0px_#24242480]"
            >

                {/* Back Button:
          - Top: 70px
          - Left: 65px (Calculated from Figma 668px - Panel Start 603px)
        */}
                <button
                    onClick={() => router.back()}
                    className="absolute w-[50px] h-[50px] rounded-full flex items-center justify-center text-[24px] transition-all hover:bg-[#F5F3EE] active:scale-95"
                    style={{
                        top: '70px',
                        left: '65px',
                        backgroundColor: '#F5F3EE80',
                        color: 'var(--color-black)',
                        opacity: 0.5,
                    }}
                >
                    ←
                </button>
                {/* Main Content Area Container */}
                <div
                    style={{
                        position: 'absolute',
                        top: '10px', // Start exactly where Libria starts -30px to account for the gap
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '505px',
                        // We don't set a hard height here so it can grow with your form
                    }}
                    className="flex flex-col items-center"
                >

                    {/* Block for Name Input (Блок для вводу імені)*/}
                    <div style={{
                        width: '505px',
                        height: '101px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        marginTop: '10px' // Adding spacing between blocks
                    }}>
                        <label style={{
                            width: '505px',
                            height: '30px',
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 600,
                            fontSize: '24px',
                            lineHeight: '100%',
                            color: 'var(--color-black)',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            Ваше ім'я *
                        </label>
                        <input
                            type="text"
                            placeholder="Введіть ім'я"
                            className="custom-placeholder"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            style={{
                                width: '505px',
                                height: '56px',
                                borderRadius: '9px',
                                padding: '10px 20px',
                                backgroundColor: 'var(--color-white)',
                                boxShadow: '0px 0px 10px 0px #00000040', // 40% прозрачности тени
                                outline: 'none',
                                border: 'none',

                                // Текст, который вводит пользователь
                                fontFamily: 'var(--font-sans)',
                                fontWeight: 400,
                                fontSize: '24px',
                                lineHeight: '150%',
                                letterSpacing: '-0.011em',
                                color: 'var(--color-black)'
                            }}
                        />

                    </div>

                    {/* Block for Surname Input (Блок для вводу прізвища)*/}
                    <div
                        style={{
                            width: '505px',
                            height: '101px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px',
                            opacity: 1,
                            marginTop: '10px' // Adding spacing between blocks
                        }}
                    >
                        {/* Label: Ваше прізвище * */}
                        <label
                            style={{
                                width: '505px',
                                height: '30px',
                                fontFamily: 'var(--font-sans)', // Использует Source Sans Pro из твоих настроек
                                fontWeight: 600,
                                fontSize: '24px',
                                lineHeight: '100%',
                                color: 'var(--color-black)', // Соответствует #242424
                                display: 'flex',
                                alignItems: 'center', // vertical-align: middle
                                letterSpacing: '0%',
                            }}
                        >
                            Ваше прізвище *
                        </label>

                        {/* Input Field */}
                        <input
                            type="text"
                            name="lastName"
                            className="lastname-input" // Added class for custom placeholder styling
                            placeholder="Прізвище"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            style={{
                                // Dimensions and opacity (Розміри та прозорість)
                                width: '505px',
                                height: '56px',
                                opacity: 1,

                                // Internal spacing (Внутрішні відступи)
                                paddingTop: '10px',
                                paddingRight: '20px',
                                paddingBottom: '10px',
                                paddingLeft: '20px',

                                // Rounding and background (Скруглення і фон)
                                borderRadius: '9px',
                                backgroundColor: 'var(--color-white)',

                                // Effects (Ефекти)
                                boxShadow: '0px 0px 10px 0px #00000040',

                                // Styles for text that user types (Стилі для тексту, що вводить користувач)
                                fontFamily: 'var(--font-sans)',
                                fontWeight: 400,
                                fontSize: '24px',
                                lineHeight: '150%',
                                letterSpacing: '-0.011em',
                                color: 'var(--color-black)',
                            }}
                        />

                    </div>

                    {/* Block for Phone Number Input */}
                    <div
                        style={{
                            width: '505px',
                            height: '101px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px',
                            opacity: 1,
                            position: 'relative', // Для позиционирования выпадающего меню
                            marginTop: '10px' // Adding spacing between blocks
                        }}
                    >
                        {/* Label */}
                        <label
                            style={{
                                width: '505px',
                                height: '30px',
                                fontFamily: 'var(--font-sans)',
                                fontWeight: 600,
                                fontSize: '24px',
                                lineHeight: '100%',
                                color: 'var(--color-black)',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            Номер телефону *
                        </label>

                        {/* Input Group */}
                        <div style={{ display: 'flex', width: '505px', height: '56px', position: 'relative' }}>
                            {/* Left Combo Box with Flag */}
                            {/* Left Select Box */}
                            <div
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                style={{
                                    width: '118px',
                                    height: '56px',
                                    borderTopLeftRadius: '9px',
                                    /* 2. Remove bottom radius when open for a "joined" look */
                                    borderBottomLeftRadius: isDropdownOpen ? '0px' : '9px',
                                    background: '#F5F3EE',
                                    boxShadow: '0px 0px 10px 0px #00000040',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    zIndex: 11
                                }}
                            >
                                <div style={{ width: '32px', height: '24px', borderRadius: '4px', overflow: 'hidden' }}>
                                    {hasMatch && <span className={`fi fi-${detectedCountry}`} style={{ width: '100%', height: '100%' }}></span>}
                                </div>
                                <span style={{
                                    marginLeft: '10px',
                                    width: '0', height: '0',
                                    borderLeft: '5px solid transparent',
                                    borderRight: '5px solid transparent',
                                    borderTop: '7px solid #242424',
                                    transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.2s'
                                }}></span>
                            </div>

                            {/* Right Input */}
                            <input
                                type="tel"
                                value={phone}
                                onChange={handlePhoneChange}
                                placeholder="+380"
                                style={{
                                    width: '387px',
                                    height: '56px',
                                    borderTopRightRadius: '9px',
                                    borderBottomRightRadius: '9px',
                                    background: '#F5F3EE',
                                    boxShadow: '0px 0px 10px 0px #00000040',
                                    padding: '10px 17px',
                                    fontFamily: 'var(--font-sans)',
                                    fontSize: '24px',
                                    border: 'none',
                                    outline: 'none',
                                }}
                            />
                        </div>
                        {/* Flag-Only Dropdown */}
                        {isDropdownOpen && (
                            <>
                                {/* Backdrop to close menu */}
                                <div style={{ position: 'fixed', inset: 0, zIndex: 10 }} onClick={() => setIsDropdownOpen(false)} />

                                <div style={{
                                    position: 'absolute',
                                    /* 3. This forces it to go DOWN exactly 56px from the top */
                                    top: '56px',
                                    left: 0,
                                    width: '118px',
                                    backgroundColor: '#F5F3EE',
                                    borderBottomLeftRadius: '9px',
                                    borderBottomRightRadius: '9px',
                                    /* 4. Shadow only on the sides and bottom */
                                    boxShadow: '0px 10px 10px 0px #00000040',
                                    zIndex: 12,
                                    padding: '4px 0',
                                    // Optional: hide the top border of the dropdown so it merges with the box above
                                    borderTop: '1px solid rgba(0,0,0,0.05)'
                                }}>
                                    {manualCountries.map((c) => (
                                        <div
                                            key={c.code}
                                            onClick={() => {
                                                setDetectedCountry(c.code);
                                                setPhone(c.dial);
                                                setIsDropdownOpen(false);
                                            }}
                                            style={{
                                                height: '48px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer'
                                            }}
                                            className="hover-item"
                                        >
                                            <div style={{ width: '32px', height: '24px', borderRadius: '2px', overflow: 'hidden' }}>
                                                <span className={`fi fi-${c.code}`} style={{ width: '100%', height: '100%' }}></span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}


                    </div>
                    {/* Block for Email Input */}
                    <div
                        style={{
                            width: '505px',
                            height: '101px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px',
                            opacity: 1,
                            marginTop: '10px' // Adding spacing between blocks
                        }}
                    >
                        {/* Label: Електронна пошта * */}
                        <label
                            style={{
                                width: '505px',
                                height: '30px',
                                fontFamily: 'var(--font-sans)',
                                fontWeight: 600,
                                fontSize: '24px',
                                lineHeight: '100%',
                                color: 'var(--color-black)',
                                display: 'flex',
                                alignItems: 'center',
                                letterSpacing: '0%',
                            }}
                        >
                            Електронна пошта *
                        </label>

                        {/* Input Field */}
                        <input
                            type="email"
                            name="email"
                            placeholder="Введіть email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="email-input"
                            style={{
                                width: '505px',
                                height: '56px',
                                borderRadius: '9px',
                                padding: '10px 20px',
                                backgroundColor: '#F5F3EE', // Figma hex provided
                                boxShadow: '0px 0px 10px 0px #00000040',
                                outline: 'none',
                                border: 'none',

                                // Text user types
                                fontFamily: 'var(--font-sans)',
                                fontWeight: 400,
                                fontSize: '24px',
                                lineHeight: '150%',
                                letterSpacing: '-0.011em', // -1.1%
                                color: 'var(--color-black)',
                            }}
                        />


                    </div>
                    {/* PASSWORD SECTION START */}
                    <div className="flex flex-col mt-4">

                        {/* Label: Password */}
                        <label style={{
                            width: '505px', height: '30px', fontWeight: 600, fontSize: '24px',
                            lineHeight: '100%', color: '#242424', display: 'flex', alignItems: 'center'
                        }}>
                            Пароль *
                        </label>

                        {/* Instruction Text */}
                        <span style={{
                            width: '505px', height: '46px', fontWeight: 400, fontSize: '18px',
                            lineHeight: '100%', color: '#242424', display: 'flex', alignItems: 'center'
                        }}>
                            Не менше восьми знаків без урахування пробілів на початку та в кінці
                        </span>

                        {/* Double Input Block (Total Height 122px) */}
                        <div className="flex flex-col gap-[10px] w-[505px] h-[122px] mt-2">

                            {/* First Input: Enter Password */}
                            <div className="relative w-[505px] h-[56px]">
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    placeholder="Введіть пароль"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full h-full rounded-[9px] px-5 py-[10px] pr-[60px] bg-[#F5F3EE] shadow-[0px_0px_10px_0px_#00000040] outline-none text-[24px] leading-[150%] tracking-[-0.011em]"
                                />
                                {/* Eye Icon Button */}
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 w-[30px] h-[30px] flex items-center justify-center"
                                >
                                    <img
                                        src={
                                            isPasswordVisible
                                                ? (isHovered ? "/images/login register/eye-closed-hover.svg" : "/images/login register/eye-closed-default.svg")
                                                : (isHovered ? "/images/login register/eye-open-hover.svg" : "/images/login register/eye-open-default.svg")
                                        }
                                        alt="toggle visibility"

                                        style={{ width: '27.007px', height: '21px' }}
                                    />
                                </button>
                            </div>

                            {/* Second Input: Confirm Password */}
                            <div className="relative w-[505px] h-[56px]">
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    placeholder="Підтвердження паролю"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="w-full h-full rounded-[9px] px-5 py-[10px] pr-[60px] bg-[#F5F3EE] shadow-[0px_0px_10px_0px_#00000040] outline-none text-[24px] leading-[150%] tracking-[-0.011em]"
                                />
                                {/* Eye Icon Button */}
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 w-[30px] h-[30px] flex items-center justify-center"
                                >
                                    <img
                                        src={
                                            isPasswordVisible
                                                ? (isHovered ? "/images/login register/eye-closed-hover.svg" : "/images/login register/eye-closed-default.svg")
                                                : (isHovered ? "/images/login register/eye-open-hover.svg" : "/images/login register/eye-open-default.svg")
                                        }
                                        alt="toggle"
                                        style={{ width: '27.007px', height: '21px' }}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* PASSWORD SECTION END */}

                    {/* Terms of Use Checkbox Section */}
                    {/* Round Terms of Use Toggle */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '505px',
                        marginTop: '10px',
                        gap: '15px'
                    }}>
                        {/* The Round Button Container */}
                        <div
                            onClick={() => setFormData({ ...formData, agreeToTerms: !formData.agreeToTerms })}
                            style={{
                                width: '30px',
                                height: '30px',
                                position: 'relative',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {/* The Outer Circle (Transparent Background, Black Border) */}
                            <div style={{
                                width: '20px', // Approximating 19.99px
                                height: '20px',
                                borderRadius: '50%', // Makes it a perfect circle
                                border: '3px solid #242424', // Black border
                                backgroundColor: 'transparent', // Transparent background
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease'
                            }}>
                                {/* The Inner "Tick" (Larger, breaking the circle) */}
                                {formData.agreeToTerms && (
                                    <div style={{
                                        position: 'absolute', // Allows us to ignore parent padding/centering
                                        width: '10px',        // Increased from 6px
                                        height: '20px',       // Increased from 11px

                                        /* Shape */
                                        border: 'solid #242424',
                                        borderWidth: '0 3.5px 3.5px 0', // Thicker lines to match the larger size

                                        /* Position & Rotation */
                                        transform: 'rotate(45deg)',
                                        top: '0px',          // Moves it up so the right side "exits" the circle
                                        left: '14px',          // Shifts it right

                                        animation: 'tickPop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                    }} />
                                )}
                            </div>
                        </div>

                        {/* The Text Label */}
                        <span style={{
                            width: '391px',
                            height: '36px',
                            fontFamily: 'Source Sans Pro',
                            fontWeight: 400,
                            fontSize: '24px',
                            lineHeight: '150%',
                            letterSpacing: '-1.1%',
                            color: '#242424',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            userSelect: 'none'
                        }}
                            onClick={() => setFormData({ ...formData, agreeToTerms: !formData.agreeToTerms })}
                        >
                            Погоджуюсь з умовами використання
                        </span>

                    </div>
                    {/* Legal Disclaimer Block */}
                    <div style={{
                        width: '505px',
                        height: '54px',
                        marginTop: '10px', // Spacing from the element above
                        fontFamily: 'Source Sans Pro',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '130%', // Adjusted slightly from 100% for better readability in 3 lines
                        color: '#242424',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center', // vertical-align: middle
                        opacity: 1
                    }}>
                        Реєструючись, ви погоджуєтеся на зберігання і використання компанією “Libria”
                        наданих вами особистих даних відповідно до чинного законодавства України
                        про недоторканність особистої інформації.
                    </div>
                    {/* Registration Submit Button */}
                    <button
                        type="submit"
                        onClick={handleRegister}
                        disabled={loading}
                        style={{
                            width: '505px',
                            height: '56px',
                            marginTop: '10px', // Spacing from the legal text
                            backgroundColor: '#005B33',
                            borderRadius: '50px',
                            padding: '10px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            boxShadow: '0px 0px 10px 0px #00000040',
                            border: 'none',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            transition: 'all 0.2s ease',
                        }}
                        className="hover:brightness-110 active:scale-[0.98]"
                    >
                        {/* Text Inside Button */}
                        <span style={{
                            width: '465px',
                            height: '36px',
                            fontFamily: 'Source Sans Pro',
                            fontWeight: 400,
                            fontSize: '24px',
                            lineHeight: '150%',
                            letterSpacing: '-0.011em',
                            color: '#F5F3EE', // Figma background property for text is the fill color
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {loading ? "Завантаження..." : "Зареєструватися"}
                        </span>
                    </button>

                    {/* Login Link Block */}
                    <div style={{
                        width: '505px',
                        height: '36px',
                        marginTop: '10px', // Відступ від тексту реєстрації
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: 1,
                        // Angle: 0 deg (не потребує додаткових стилів)
                    }}>
                        <p style={{
                            fontFamily: 'Source Sans Pro, sans-serif',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            fontSize: '24px',
                            lineHeight: '150%',
                            letterSpacing: '-0.011em', // -1.1%
                            textAlign: 'center',
                            color: '#242424', // чорний
                            margin: 0
                        }}>
                            Вже маєте акаунт?{' '}
                            <Link
                                href="/login"
                                style={{
                                    // fontWeight: 600, // Робимо "Увійти" трохи жирнішим для акценту
                                    // textDecoration: 'underline',
                                    cursor: 'pointer',
                                    color: 'var(--color-green)' // Використовуємо зелений з кольорів бренду
                                }}
                            >
                                Увійти
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
<style jsx>{`
.custom-placeholder::placeholder,
    .lastname-input::placeholder,
    .email-input::placeholder {
        color: var(--color-black);
        opacity: 0.5;
    }
    .hover-item:hover { 
        background-color: #E0C3A9; 
    }
    @keyframes tickPop {
        from { opacity: 0; transform: rotate(45deg) scale(0.5); }
        to { opacity: 1; transform: rotate(45deg) scale(1); }
    }
    @keyframes tickIn {
        0% { 
            opacity: 0; 
            transform: rotate(45deg) scale(0.5); 
        }
        100% { 
            opacity: 1; 
            transform: rotate(45deg) scale(1); 
        }
    }

    @keyframes tickIn {
        0% { 
            opacity: 0; 
            transform: rotate(45deg) scale(0.5); 
        }
        100% { 
            opacity: 1; 
            transform: rotate(45deg) scale(1); 
        }
    }



    /* Додамо стилі для самої галочки, якщо вона у вас є */
    .success-tick {
        display: inline-block;
        width: 12px;
        height: 24px;
        border-right: 3px solid var(--color-green);
        border-bottom: 3px solid var(--color-green);
        transform: rotate(45deg);
        animation: tickIn 0.5s ease-out forwards;
    }

    /* Стиль для посилання при наведенні */
    a:hover {
        text-decoration: underline;
        opacity: 0.8;
    }
`}</style>