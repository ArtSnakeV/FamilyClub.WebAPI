import { useEffect, useState } from "react";
import { authorService, clubMemberService, productService } from "@/lib/api/services";
import type {
    AuthorDTO,
    ClubMemberReadDto,
    OrderDTO,
    ProductDto,
} from "@/lib/api/generated";

export function useOrdersEnrichment(orders: OrderDTO[]) {
    const [members, setMembers] = useState<Map<string, ClubMemberReadDto>>(new Map());
    const [products, setProducts] = useState<Map<number, ProductDto>>(new Map());
    const [authors, setAuthors] = useState<Map<number, AuthorDTO>>(new Map());

    useEffect(() => {
        const userIds = Array.from(
            new Set(orders.map((o) => o.userId).filter((id): id is string => !!id))
        );
        const productIds = Array.from(
            new Set(
                orders
                    .flatMap((o) => o.orderItems ?? [])
                    .map((i) => i.productId)
                    .filter((id): id is number => id != null)
            )
        );

        if (userIds.length === 0 && productIds.length === 0) return;
        let cancelled = false;

        Promise.all([
            Promise.all(userIds.map((id) => clubMemberService.apiClubMemberIdGet({ id }))),
            Promise.all(productIds.map((id) => productService.apiProductsIdGet({ id }))),
        ]).then(([memberList, productList]) => {
            if (cancelled) return;
            setMembers(new Map(memberList.map((m) => [m.id!, m])));
            setProducts(new Map(productList.map((p) => [p.id!, p])));

            // Автори — окремим запитом, бо productList відомий лише зараз
            const authorIds = Array.from(
                new Set(
                    productList
                        .flatMap((p) => p.authorIds ?? [])
                        .filter((id): id is number => id != null)
                )
            );

            if (authorIds.length === 0) return;

            Promise.all(
                authorIds.map((id) => authorService.apiAuthorsIdGet({ id }))
            ).then((authorList) => {
                if (cancelled) return;
                setAuthors(new Map(authorList.map((a) => [a.id!, a])));
            });
        });

        return () => {
            cancelled = true;
        };
    }, [orders]);

    return { members, products, authors };
}