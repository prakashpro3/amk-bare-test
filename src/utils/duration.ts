// A shift's length, shown as hours and minutes
export function formatMinutes(total: number): string {
  const hours = Math.floor(total / 60);
  const minutes = total - Math.floor(total / 60) * 60;
  return `${hours}h ${minutes}m`;
}
