export type Category = "All" | "Main Course" | "Snacks" | "Drinks" | "Healthy";

export interface Campus {
  id: string;
  name: string;
  area: string;
}

export interface Tenant {
  id: string;
  name: string;
  tagline: string;
  cuisine: string;
  /** Tailwind bg color class for the avatar, e.g. "bg-red-600". */
  logoColor: string;
  initials: string;
  rating: number;
  etaMin: number;
  /** 1–3, rendered as Rp / Rp Rp / Rp Rp Rp. */
  priceLevel: number;
  banner: string;
}

export interface MenuItem {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  /** Price in IDR (Rupiah). */
  price: number;
  image: string;
  category: Exclude<Category, "All">;
  prepTime: number;
  rating: number;
  calories: number;
}

export interface CartItem extends MenuItem {
  customization: string;
  quantity: number;
}

export type OrderStatus = "Confirmed" | "Cooking" | "Ready";

export interface ActiveOrder {
  id: string;
  tenantId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: number;
  estimatedReadyAt: number;
}

export interface OrderRating {
  stars: number;
  tags: string[];
  comment: string;
}

export interface CompletedOrder extends ActiveOrder {
  completedAt: number;
  rating: OrderRating;
}

export interface User {
  name: string;
  email: string;
  studentId: string;
  phone?: string;
}

/** A canteen stall shown in the live "Antrian Kantin" queue board. */
export interface QueueStall {
  id: string;
  name: string;
  emoji: string;
  /** Number of orders currently in the stall's queue. */
  queue: number;
  /** Average minutes each queued order adds to the wait. */
  avgWaitPerOrder: number;
}
