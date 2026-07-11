export function formatRelativeTimeUk(date?: Date | null): string {
  if (!date) return "щойно";

  const diffSec = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (diffSec < 60) return "щойно";
  if (diffSec < 3600) {
    const min = Math.floor(diffSec / 60);
    return `${min} хв тому`;
  }
  if (diffSec < 86400) {
    const hrs = Math.floor(diffSec / 3600);
    return `${hrs} год тому`;
  }
  const days = Math.floor(diffSec / 86400);
  return `${days} дн тому`;
}

export function truncateText(text: string, max = 60): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max).trim()}…`;
}
