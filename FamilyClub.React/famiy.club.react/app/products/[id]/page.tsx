import ProductDetailsClient from "./ProductDetailsClient";

type ApiProduct = { id?: number | null };

type ProductParams = { id: string };

const yearFilters = [
    "2000–2002",
    "2003–2005",
    "2006–2010",
    "2011–2020",
    "2020+",
];

const fallbackParams = ["1"];

export async function generateStaticParams(): Promise<ProductParams[]> {
    const params = new Set<string>([...yearFilters, ...fallbackParams]);
    const apiBasePath = process.env.NEXT_PUBLIC_API_URL ?? "https://localhost:7069";

    try {
        const response = await fetch(`${apiBasePath}/api/Products`);
        if (response.ok) {
            const products = (await response.json()) as ApiProduct[];
            for (const product of products) {
                if (product?.id != null) {
                    params.add(String(product.id));
                }
            }
        }
    } catch {
        // Ignore failures; fallback params keep the build working in export mode.
    }

    return Array.from(params).map((id) => ({ id }));
}

export default function ProductDetailsPage({ params }: { params: ProductParams }) {
    return <ProductDetailsClient id={params.id} />;
}
