import type { OrderDTO, ProductDto } from "@/lib/api/generated";

export type PickBooksOptions = {
  products: ProductDto[];
  orders?: OrderDTO[];
  favoriteProductIds?: number[];
  /** Average rating 0–5 for a product id */
  getRating?: (productId?: number) => number;
  take?: number;
};

function productPublishTime(product: ProductDto): number {
  if (!product.publishingDate) return 0;
  const time = new Date(product.publishingDate).getTime();
  return Number.isNaN(time) ? 0 : time;
}

/** Newest books first (новинки). */
export function getNewBooks(products: ProductDto[], take = 8): ProductDto[] {
  return [...products]
    .filter((p) => p.id != null)
    .sort((a, b) => productPublishTime(b) - productPublishTime(a))
    .slice(0, take);
}

function collectPurchasedProductIds(orders: OrderDTO[]): Set<number> {
  const ids = new Set<number>();
  for (const order of orders) {
    for (const item of order.orderItems ?? []) {
      if (item.productId != null) ids.add(item.productId);
    }
  }
  return ids;
}

function buildPreferenceWeights(
  productsById: Map<number, ProductDto>,
  signalProductIds: Iterable<number>,
  orderRecencyBoost: Map<number, number>,
) {
  const categoryWeights = new Map<number, number>();
  const authorWeights = new Map<number, number>();

  for (const productId of signalProductIds) {
    const product = productsById.get(productId);
    if (!product) continue;
    const boost = orderRecencyBoost.get(productId) ?? 1;

    for (const categoryId of product.categoryIds ?? []) {
      categoryWeights.set(
        categoryId,
        (categoryWeights.get(categoryId) ?? 0) + 3 * boost,
      );
    }
    for (const authorId of product.authorIds ?? []) {
      authorWeights.set(
        authorId,
        (authorWeights.get(authorId) ?? 0) + 4 * boost,
      );
    }
  }

  return { categoryWeights, authorWeights };
}

function scoreProduct(
  product: ProductDto,
  categoryWeights: Map<number, number>,
  authorWeights: Map<number, number>,
  favoriteSet: Set<number>,
  getRating?: (productId?: number) => number,
): number {
  let score = 0;

  for (const categoryId of product.categoryIds ?? []) {
    score += categoryWeights.get(categoryId) ?? 0;
  }
  for (const authorId of product.authorIds ?? []) {
    score += authorWeights.get(authorId) ?? 0;
  }
  if (product.id != null && favoriteSet.has(product.id)) {
    score += 1;
  }

  const rating = getRating?.(product.id) ?? 0;
  score += rating * 0.5;

  // Slight preference for newer books among equals
  score += Math.min(productPublishTime(product) / 1e13, 0.5);

  return score;
}

/**
 * Client-side book picker:
 * - with purchases → similar genres/authors (exclude already bought)
 * - without purchases → новинки
 * - always tops up with новинки if the personal list is short
 */
export function pickRecommendedBooks({
  products,
  orders = [],
  favoriteProductIds = [],
  getRating,
  take = 8,
}: PickBooksOptions): {
  recommended: ProductDto[];
  basedOnPurchases: boolean;
  basedOnPreferences: boolean;
  newBooks: ProductDto[];
} {
  const catalog = products.filter((p) => p.id != null);
  const productsById = new Map<number, ProductDto>();
  for (const product of catalog) {
    productsById.set(product.id!, product);
  }

  const newBooks = getNewBooks(catalog, take);
  const purchasedIds = collectPurchasedProductIds(orders);
  const favoriteSet = new Set(favoriteProductIds);

  const orderRecencyBoost = new Map<number, number>();
  const sortedOrders = [...orders].sort((a, b) => {
    const aTime = a.orderDate ? new Date(a.orderDate).getTime() : 0;
    const bTime = b.orderDate ? new Date(b.orderDate).getTime() : 0;
    return bTime - aTime;
  });
  sortedOrders.forEach((order, index) => {
    const boost = Math.max(0.5, 1.5 - index * 0.15);
    for (const item of order.orderItems ?? []) {
      if (item.productId == null) continue;
      const prev = orderRecencyBoost.get(item.productId) ?? 0;
      orderRecencyBoost.set(item.productId, Math.max(prev, boost));
    }
  });

  const signalIds = new Set<number>([...purchasedIds, ...favoriteProductIds]);
  const hasPurchaseSignal = purchasedIds.size > 0;

  if (!hasPurchaseSignal && favoriteProductIds.length === 0) {
    return {
      recommended: newBooks,
      basedOnPurchases: false,
      basedOnPreferences: false,
      newBooks,
    };
  }

  const { categoryWeights, authorWeights } = buildPreferenceWeights(
    productsById,
    signalIds,
    orderRecencyBoost,
  );

  const excludeIds = purchasedIds;
  const scored = catalog
    .filter((p) => p.id != null && !excludeIds.has(p.id))
    .map((product) => ({
      product,
      score: scoreProduct(
        product,
        categoryWeights,
        authorWeights,
        favoriteSet,
        getRating,
      ),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return productPublishTime(b.product) - productPublishTime(a.product);
    })
    .map((entry) => entry.product);

  const recommended: ProductDto[] = [];
  const used = new Set<number>();

  for (const product of scored) {
    if (recommended.length >= take) break;
    if (product.id == null || used.has(product.id)) continue;
    recommended.push(product);
    used.add(product.id);
  }

  // Top up with новинки when personal list is short or empty
  if (recommended.length < take) {
    for (const product of newBooks) {
      if (recommended.length >= take) break;
      if (product.id == null || used.has(product.id) || excludeIds.has(product.id)) {
        continue;
      }
      recommended.push(product);
      used.add(product.id);
    }
  }

  return {
    recommended,
    basedOnPurchases: hasPurchaseSignal && scored.length > 0,
    basedOnPreferences:
      scored.length > 0 && (hasPurchaseSignal || favoriteProductIds.length > 0),
    newBooks,
  };
}
