"use client";

import { useEffect, useMemo, useState } from "react";
import useReviews from "./hooks/useReviews";
import { setReviewApproved, deleteReview } from "./api/ActionReviews";
import ReviewsFilterBar from "./section/ReviewsFilterBar";
import ReviewsList from "./section/ReviewsList";
import ReviewDetail from "./section/ReviewDetail";
import { Review } from "./types";


export default function Page() {
    const { reviews, loadingReviews, refetch } = useReviews();

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [book, setBook] = useState("all");
    const [rating, setRating] = useState("all");

    // useEffect(() => {
    //     document.body.style.backgroundImage =
    //         "url('/images/usersPageAdmin/Rectangle326.png')";
    //     document.body.style.backgroundSize = "cover";
    //     document.body.style.backgroundAttachment = "fixed";
    //     document.body.style.backgroundPosition = "center";
    //     document.body.style.backgroundRepeat = "no-repeat";

    //     return () => {
    //         document.body.style.backgroundImage = "";
    //         document.body.style.backgroundSize = "";
    //         document.body.style.backgroundAttachment = "";
    //         document.body.style.backgroundPosition = "";
    //         document.body.style.backgroundRepeat = "";
    //     };
    // }, []);

    const bookOptions = useMemo(() => {
        const map = new Map<number, string>();
        reviews.forEach((r) => {
            if (r.productName) map.set(r.productId, r.productName);
        });
        return Array.from(map, ([id, title]) => ({ id: String(id), title }));
    }, [reviews]);

    const filtered = useMemo(() => {
        return reviews.filter((r) => {
            if (search && !(r.comment ?? "").toLowerCase().includes(search.toLowerCase()))
                return false;
            if (book !== "all" && String(r.productId) !== book) return false;
            if (rating !== "all" && r.rating !== Number(rating)) return false;
            return true;
        });
    }, [reviews, search, book, rating]);

    useEffect(() => {
        if (!selectedId && filtered.length > 0) {
            setSelectedId(filtered[0].id);
        }
    }, [filtered, selectedId]);

    const selectedReview = filtered.find((r) => r.id === selectedId) ?? null;

    const handleToggleApprove = async () => {
        if (!selectedReview) return;
        await setReviewApproved(selectedReview, !selectedReview.approved);
        await refetch();
    };

    const handleDelete = async () => {
        if (!selectedReview) return;
        await deleteReview(selectedReview.id);
        setSelectedId(null);
        await refetch();
    };

    const resetFilters = () => {
        setSearch("");
        setBook("all");
        setRating("all");
    };

    return (
        <div className="w-full min-h-screen overflow-hidden relative m-0 p-0">
            <div className="w-[100vw] min-h-screen relative">
                <img
                    src="/images/usersPageAdmin/Rectangle 675.png"
                    className="absolute"
                    style={{ width: "100vw", height: "auto", top: "40px", left: "-20px" }}
                    alt=""
                />

                <div className="relative pt-20 px-6 flex flex-col gap-4">
                    <ReviewsFilterBar
                        search={search}
                        book={book}
                        rating={rating}
                        onSearchChange={setSearch}
                        onBookChange={setBook}
                        onRatingChange={setRating}
                        onReset={resetFilters}
                        bookOptions={bookOptions}
                    />

                    <div className="flex gap-4 items-start">
                        {loadingReviews ? (
                            <p>Завантаження...</p>
                        ) : (
                            <ReviewsList
                                reviews={filtered}
                                selectedId={selectedReview?.id}
                                onSelect={(r: Review) => setSelectedId(r.id)}
                            />
                        )}

                        {selectedReview && (
                            <ReviewDetail
                                review={selectedReview}
                                onToggleApprove={handleToggleApprove}
                                onDelete={handleDelete}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}