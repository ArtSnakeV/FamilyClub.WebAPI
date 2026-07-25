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

  const bookOptions = useMemo(() => {
    const map = new Map<number, string>();
    reviews.forEach((r) => {
      if (r.productName) map.set(r.productId, r.productName);
    });
    return Array.from(map, ([id, title]) => ({ id: String(id), title }));
  }, [reviews]);

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      if (
        search &&
        !(r.comment ?? "").toLowerCase().includes(search.toLowerCase())
      )
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
    <div className="w-full max-w-full min-h-screen overflow-x-hidden relative m-0 p-0 box-border">
      <div
        className="relative min-h-screen pb-10 box-border"
        style={{ marginLeft: "-1rem", width: "calc(100% + 2rem)", maxWidth: "calc(100% + 2rem)" }}
      >
        <img
          src="/images/usersPageAdmin/Rectangle 675.png"
          className="absolute pointer-events-none"
          style={{
            width: "calc(100% + 20px)",
            height: "calc(100% + 40px)",
            top: "-40px",
            left: "-20px",
            objectFit: "fill",
          }}
          alt=""
        />

        <div className="relative z-10 mt-24 px-6 lg:px-10 pb-6 flex flex-col gap-4 box-border w-full max-w-full">
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

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(260px,340px)_minmax(0,1fr)] gap-4 items-start w-full max-w-full">
            {loadingReviews ? (
              <p className="text-[#6B6B6B]">Завантаження...</p>
            ) : (
              <ReviewsList
                reviews={filtered}
                selectedId={selectedReview?.id}
                onSelect={(r: Review) => setSelectedId(r.id)}
              />
            )}

            {selectedReview ? (
              <ReviewDetail
                review={selectedReview}
                onToggleApprove={handleToggleApprove}
                onDelete={handleDelete}
              />
            ) : (
              !loadingReviews && (
                <div className="bg-white rounded-2xl p-6 text-[14px] text-[#888] min-w-0">
                  Оберіть відгук зі списку
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
