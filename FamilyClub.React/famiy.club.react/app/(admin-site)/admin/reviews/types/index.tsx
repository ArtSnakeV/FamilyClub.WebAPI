export type ReviewStatus = "published" | "moderation" | "rejected";

export interface Review {
    id: number;
    productId: number;
    productName: string | null;
    userId: string | null;
    rating: number;
    comment: string | null;
    createdAt: string;
    approved: boolean;
}