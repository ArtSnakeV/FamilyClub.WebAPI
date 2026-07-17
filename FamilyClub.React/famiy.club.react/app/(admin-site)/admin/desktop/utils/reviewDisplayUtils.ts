import type {
  ClubMemberReadDto,
  ProductDto,
  ReviewDto,
} from "@/lib/api/generated";

export function getMemberDisplayName(member?: ClubMemberReadDto | null): string {
  if (!member) return "Користувач";
  const full = [member.name, member.surname].filter(Boolean).join(" ").trim();
  return full || member.email || "Користувач";
}

export function getMemberAvatarSrc(member?: ClubMemberReadDto | null): string | null {
  if (!member?.avatarData) return null;
  return `data:image/jpeg;base64,${member.avatarData}`;
}

export function getProductName(
  productId?: number | null,
  products: ProductDto[] = []
): string {
  if (productId == null) return "Невідомий товар";
  const product = products.find((p) => p.id === productId);
  return product?.productName?.trim() || `Товар #${productId}`;
}

export function buildMemberMap(
  members: ClubMemberReadDto[]
): Map<string, ClubMemberReadDto> {
  return new Map(
    members
      .filter((m) => m.id)
      .map((m) => [m.id as string, m])
  );
}

export function sortReviewsByNewest(reviews: ReviewDto[], limit = 5): ReviewDto[] {
  return [...reviews]
    .sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, limit);
}
