export type ReviewStatus = "published" | "moderation" | "rejected";

export interface ProductImage {
    id: number;
    imageData: string;
    imageName: string; 
}

export interface Review {
    id: number;
    productId: number;
    productName: string | null;
    productImages: ProductImage[] | null;
    authors: string | null;
    userId: string | null;
    userName: string | null;
    rating: number;
    comment: string | null;
    createdAt: string;
    approved: boolean;
}