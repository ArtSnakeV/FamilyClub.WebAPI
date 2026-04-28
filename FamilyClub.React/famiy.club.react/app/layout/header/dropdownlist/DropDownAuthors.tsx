"use client"

import { AuthorDTO, AuthorsApi, Configuration } from '@/lib/api/generated'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function DropDownAuthors() {
    const [authors, setAuthors] = useState<AuthorDTO[]>([])

    useEffect(() => {
        const config = new Configuration({
            basePath: "https://localhost:7069"
        })
        const api = new AuthorsApi(config)

        api.apiAuthorsGet()
            .then(setAuthors)
            .catch(console.error)
    }, [])

    return (
        <Menu as="div" className="shadow-[0px 10px 10px 0px #2424244D]">

            <MenuButton className="relative w-[120px] h-[120px]">
                <Image
                    src="/images/Rectangle144.png"
                    alt="bg"
                    fill
                    className="object-contain"
                />

                <span className="absolute inset-0 flex items-center justify-center text-[#F5F3EE] mt-8">
                    Автори
                </span>
            </MenuButton>

            <MenuItems anchor="bottom" className="relative w-[120px] bg-[#005B33]">

                {authors.length === 0 ? (
                    <div>Loading...</div>
                ) : (
                    authors.map((author) => (
                        <MenuItem key={author.id}>
                            {({ active }) => (
                                <Link
                                    href={`/authors/${author.id}`}
                                    className={`block px-2 py-1 ${active ? "bg-green-600" : ""}`}
                                >
                                    {author.authorName}
                                </Link>
                            )}
                        </MenuItem>
                    ))
                )}

            </MenuItems>
        </Menu>
    )
}