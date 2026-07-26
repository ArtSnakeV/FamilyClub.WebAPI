import { apiBasePath } from "@/lib/api/services";
import { Review } from "../types";

export async function updateReview(review: Review): Promise<boolean> {
    const res = await fetch(`${apiBasePath}/api/Reviews/${review.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: review.id,
            productId: review.productId,
            productName: review.productName,
            userId: review.userId,
            rating: review.rating,
            comment: review.comment,
            createdAt: review.createdAt,
            approved: review.approved,
        }),
    });

    if (!res.ok) {
        const details = await res.text().catch(() => "");
        console.error("updateReview failed:", res.status, details);
        throw new Error(`Failed to update review (${res.status}): ${details}`);
    }

    // Update повертає 204 No Content
    return true;
}

export async function setReviewApproved(review: Review, approved: boolean) {
    return updateReview({ ...review, approved });
}

export async function deleteReview(id: number) {
    const res = await fetch(`${apiBasePath}/api/Reviews/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const details = await res.text().catch(() => "");
        console.error("deleteReview failed:", res.status, details);
        throw new Error(`Failed to delete review (${res.status}): ${details}`);
    }
}