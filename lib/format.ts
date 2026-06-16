/** Format a number as Indonesian Rupiah, e.g. 38000 -> "Rp 38.000". */
export function formatRupiah(amount: number): string {
  return `Rp ${Math.round(amount).toLocaleString("id-ID")}`;
}

/** Format a timestamp as HH:mm. */
export function formatClock(ts: number): string {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
