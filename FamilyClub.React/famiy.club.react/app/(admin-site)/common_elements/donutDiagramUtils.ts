export type DonutSegment = {
  id: string;
  label: string;
  count: number;
  color: string;
};

export type DonutSegmentInput = {
  id: string;
  label: string;
  color: string;
};

/** Build chart segments from items using a grouping key function. */
export function buildDonutSegments<T>(
  items: T[],
  groups: DonutSegmentInput[],
  getGroupId: (item: T) => string
): DonutSegment[] {
  const counts = new Map<string, number>();

  for (const item of items) {
    const id = getGroupId(item);
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }

  const knownIds = new Set(groups.map((g) => g.id));
  let otherCount = 0;

  for (const [id, count] of counts) {
    if (!knownIds.has(id)) {
      otherCount += count;
    }
  }

  const segments: DonutSegment[] = groups.map((g) => ({
    id: g.id,
    label: g.label,
    color: g.color,
    count: counts.get(g.id) ?? 0,
  }));

  if (otherCount > 0) {
    const existingOther = segments.find((s) => s.id === "other");
    if (existingOther) {
      existingOther.count += otherCount;
    } else {
      segments.push({
        id: "other",
        label: "Інше",
        count: otherCount,
        color: "#B0B0B0",
      });
    }
  }

  return segments.filter((s) => s.count > 0);
}

export function withPercentages(segments: DonutSegment[]) {
  const total = segments.reduce((sum, s) => sum + s.count, 0);

  return segments.map((s) => ({
    ...s,
    percent: total > 0 ? (s.count / total) * 100 : 0,
  }));
}
