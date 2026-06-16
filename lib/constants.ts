import type { Campus, Category, MenuItem, QueueStall, Tenant } from "./types";

export const CATEGORIES: Category[] = [
  "All",
  "Main Course",
  "Snacks",
  "Drinks",
  "Healthy",
];

/** Demo account credentials shown on the login screen. */
export const DEMO_EMAIL = "demo@binus.ac.id";
export const DEMO_PASSWORD = "bfull2026";

export const CAMPUSES: Campus[] = [
  { id: "anggrek", name: "Kampus Anggrek", area: "Kebon Jeruk, Jakarta Barat" },
  { id: "syahdan", name: "Kampus Syahdan", area: "Palmerah, Jakarta Barat" },
  { id: "kijang", name: "Kampus Kijang", area: "Kemanggisan, Jakarta Barat" },
  { id: "alsut", name: "Kampus Alam Sutera", area: "Tangerang Selatan" },
  { id: "bekasi", name: "Kampus Bekasi", area: "Summarecon, Bekasi" },
  { id: "bandung", name: "Kampus Bandung", area: "Pasirkaliki, Bandung" },
  { id: "malang", name: "Kampus Malang", area: "Araya, Malang" },
  { id: "senayan", name: "BINUS @Senayan (JWC)", area: "Senayan, Jakarta Pusat" },
];

export const DEFAULT_CAMPUS_ID = "anggrek";

export const REVIEW_TAGS = [
  "Fast service",
  "Tasty",
  "Good portion",
  "Well packed",
  "Worth the price",
  "Friendly staff",
];

export interface Voucher {
  id: string;
  code: string;
  label: string;
  desc: string;
  /** Flat discount in IDR. */
  amount: number;
}

export const VOUCHERS: Voucher[] = [
  {
    id: "v1",
    code: "BFULL10K",
    label: "Rp 10.000 off",
    desc: "Min. order Rp 30.000",
    amount: 10000,
  },
  {
    id: "v2",
    code: "NEWBIE",
    label: "Rp 5.000 off",
    desc: "First order of the day",
    amount: 5000,
  },
  {
    id: "v3",
    code: "LUNCHRUSH",
    label: "Rp 8.000 off",
    desc: "Valid 11.00-13.00",
    amount: 8000,
  },
];

export const TENANTS: Tenant[] = [
  {
    id: "aw",
    name: "A&W Restaurant",
    tagline: "Burgers · Fried Chicken · Root Beer",
    cuisine: "Western",
    logoColor: "bg-red-600",
    initials: "AW",
    rating: 4.6,
    etaMin: 12,
    priceLevel: 2,
    banner:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1200&q=80",
  },
  {
    id: "sb",
    name: "Starbucks",
    tagline: "Coffee · Pastry · Sweet Treats",
    cuisine: "Coffee",
    logoColor: "bg-emerald-700",
    initials: "SB",
    rating: 4.8,
    etaMin: 8,
    priceLevel: 3,
    banner:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=80",
  },
  {
    id: "yo",
    name: "Yoshinoya",
    tagline: "Japanese Rice Bowls · Ramen",
    cuisine: "Japanese",
    logoColor: "bg-orange-600",
    initials: "YO",
    rating: 4.7,
    etaMin: 13,
    priceLevel: 2,
    banner:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1200&q=80",
  },
  {
    id: "hb",
    name: "HokBen",
    tagline: "Japanese Bento · Teriyaki · Ekkado",
    cuisine: "Japanese",
    logoColor: "bg-orange-700",
    initials: "HB",
    rating: 4.7,
    etaMin: 10,
    priceLevel: 2,
    banner:
      "https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?w=1200&q=80",
  },
  {
    id: "cc",
    name: "Cerita Cinta",
    tagline: "Indonesian Comfort Food · Kopi",
    cuisine: "Indonesian",
    logoColor: "bg-rose-500",
    initials: "CC",
    rating: 4.6,
    etaMin: 12,
    priceLevel: 1,
    banner:
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=1200&q=80",
  },
  {
    id: "be",
    name: "Bakmie Effata",
    tagline: "Bangka Noodles · Pangsit · Bakso",
    cuisine: "Bangka",
    logoColor: "bg-amber-600",
    initials: "BE",
    rating: 4.7,
    etaMin: 9,
    priceLevel: 1,
    banner:
      "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=1200&q=80",
  },
  {
    id: "rg",
    name: "Rasela Gourmet",
    tagline: "Nasi Campur · Rendang · Lauk Khas",
    cuisine: "Indonesian",
    logoColor: "bg-teal-600",
    initials: "RG",
    rating: 4.5,
    etaMin: 11,
    priceLevel: 2,
    banner:
      "https://images.unsplash.com/photo-1567337710282-00832b415979?w=1200&q=80",
  },
];

/**
 * Simulated live canteen queue shown in the "Antrian Kantin" board. In
 * production this would stream from a realtime backend; here it fluctuates
 * client-side every few seconds. Stalls map to real tenants above.
 */
export const CANTEEN_STALLS: QueueStall[] = [
  { id: "rg", name: "Rasela Gourmet", emoji: "🍛", queue: 3, avgWaitPerOrder: 4 },
  { id: "be", name: "Bakmie Effata", emoji: "🍜", queue: 11, avgWaitPerOrder: 5 },
  { id: "sb", name: "Starbucks", emoji: "🥤", queue: 2, avgWaitPerOrder: 2 },
  { id: "cc", name: "Cerita Cinta", emoji: "🔥", queue: 7, avgWaitPerOrder: 6 },
];

export const MENU_ITEMS: MenuItem[] = [
  // A&W
  {
    id: "aw1",
    tenantId: "aw",
    name: "Beef Burger Deluxe",
    description: "Juicy flame-grilled beef patty, cheddar, lettuce, and tomato.",
    price: 35000,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    category: "Main Course",
    prepTime: 12,
    rating: 4.6,
    calories: 650,
  },
  {
    id: "aw2",
    tenantId: "aw",
    name: "Curly Fries",
    description: "Hand-cut seasoned curly fries served with garlic aioli.",
    price: 22000,
    image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=800&q=80",
    category: "Snacks",
    prepTime: 8,
    rating: 4.5,
    calories: 410,
  },
  {
    id: "aw3",
    tenantId: "aw",
    name: "Root Beer Float",
    description: "Signature root beer topped with a scoop of vanilla ice cream.",
    price: 25000,
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=800&q=80",
    category: "Drinks",
    prepTime: 4,
    rating: 4.7,
    calories: 280,
  },
  // Starbucks
  {
    id: "sb1",
    tenantId: "sb",
    name: "Iced Matcha Latte",
    description: "Premium ceremonial grade matcha with oat milk over ice.",
    price: 45000,
    image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=800&q=80",
    category: "Drinks",
    prepTime: 6,
    rating: 4.8,
    calories: 180,
  },
  {
    id: "sb2",
    tenantId: "sb",
    name: "Caffe Latte",
    description: "Rich espresso with steamed milk and a light layer of foam.",
    price: 38000,
    image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=800&q=80",
    category: "Drinks",
    prepTime: 5,
    rating: 4.7,
    calories: 150,
  },
  {
    id: "sb3",
    tenantId: "sb",
    name: "Chocolate Lava Cake",
    description: "Warm molten chocolate cake with a scoop of vanilla gelato.",
    price: 32000,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80",
    category: "Snacks",
    prepTime: 9,
    rating: 4.9,
    calories: 480,
  },
  // Yoshinoya
  {
    id: "yo1",
    tenantId: "yo",
    name: "Beef Bowl (Gyudon)",
    description: "Thinly sliced beef simmered in sweet-savory sauce over rice.",
    price: 42000,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    category: "Main Course",
    prepTime: 11,
    rating: 4.7,
    calories: 590,
  },
  {
    id: "yo2",
    tenantId: "yo",
    name: "Chicken Teriyaki Bowl",
    description: "Grilled chicken glazed in teriyaki with steamed greens.",
    price: 40000,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80",
    category: "Main Course",
    prepTime: 12,
    rating: 4.6,
    calories: 560,
  },
  {
    id: "yo3",
    tenantId: "yo",
    name: "Spicy Beef Ramen",
    description: "Rich miso broth with spicy beef, soft-boiled egg, and bamboo.",
    price: 45000,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80",
    category: "Main Course",
    prepTime: 15,
    rating: 4.9,
    calories: 680,
  },
  // HokBen
  {
    id: "hb1",
    tenantId: "hb",
    name: "Beef Yakiniku Bento",
    description: "Grilled sliced beef in sweet soy sauce with rice and salad.",
    price: 42000,
    image: "https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?w=800&q=80",
    category: "Main Course",
    prepTime: 11,
    rating: 4.7,
    calories: 620,
  },
  {
    id: "hb2",
    tenantId: "hb",
    name: "Chicken Teriyaki Bento",
    description: "Grilled chicken teriyaki with rice, egg roll, and pickles.",
    price: 38000,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80",
    category: "Main Course",
    prepTime: 10,
    rating: 4.6,
    calories: 580,
  },
  {
    id: "hb3",
    tenantId: "hb",
    name: "Ekkado & Karaage",
    description: "Signature shrimp-chicken egg pockets with crispy karaage.",
    price: 26000,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&q=80",
    category: "Snacks",
    prepTime: 8,
    rating: 4.8,
    calories: 430,
  },
  // Cerita Cinta
  {
    id: "cc1",
    tenantId: "cc",
    name: "Nasi Ayam Penyet",
    description: "Smashed fried chicken with sambal terasi, rice, and lalapan.",
    price: 28000,
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&q=80",
    category: "Main Course",
    prepTime: 12,
    rating: 4.6,
    calories: 640,
  },
  {
    id: "cc2",
    tenantId: "cc",
    name: "Nasi Goreng Spesial",
    description: "Wok-fried rice with chicken, prawn, fried egg, and pickles.",
    price: 30000,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80",
    category: "Main Course",
    prepTime: 13,
    rating: 4.7,
    calories: 600,
  },
  {
    id: "cc3",
    tenantId: "cc",
    name: "Kopi Susu Gula Aren",
    description: "Iced espresso with fresh milk and palm-sugar syrup.",
    price: 18000,
    image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=800&q=80",
    category: "Drinks",
    prepTime: 5,
    rating: 4.8,
    calories: 190,
  },
  // Bakmie Effata
  {
    id: "be1",
    tenantId: "be",
    name: "Bakmi Ayam Keriting",
    description: "Springy Bangka curly noodles with savory minced chicken.",
    price: 25000,
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=800&q=80",
    category: "Main Course",
    prepTime: 9,
    rating: 4.7,
    calories: 520,
  },
  {
    id: "be2",
    tenantId: "be",
    name: "Bakmi + Pangsit Goreng",
    description: "Chicken noodles served with crispy fried dumplings.",
    price: 28000,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80",
    category: "Main Course",
    prepTime: 10,
    rating: 4.6,
    calories: 560,
  },
  {
    id: "be3",
    tenantId: "be",
    name: "Bakso Sapi Urat",
    description: "Beef tendon meatballs in a hearty clear broth.",
    price: 20000,
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&q=80",
    category: "Snacks",
    prepTime: 8,
    rating: 4.5,
    calories: 380,
  },
  // Rasela Gourmet
  {
    id: "rg1",
    tenantId: "rg",
    name: "Nasi Rendang Sapi",
    description: "Steamed rice with slow-cooked beef rendang and sambal.",
    price: 34000,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
    category: "Main Course",
    prepTime: 11,
    rating: 4.6,
    calories: 700,
  },
  {
    id: "rg2",
    tenantId: "rg",
    name: "Nasi Ayam Tepung Kari",
    description: "Crispy breaded chicken with curry sauce over warm rice.",
    price: 32000,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&q=80",
    category: "Main Course",
    prepTime: 12,
    rating: 4.5,
    calories: 660,
  },
  {
    id: "rg3",
    tenantId: "rg",
    name: "Capcay Sayur",
    description: "Stir-fried mixed vegetables in a light savory sauce.",
    price: 26000,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    category: "Healthy",
    prepTime: 9,
    rating: 4.4,
    calories: 240,
  },
];

export function getTenant(id: string): Tenant | undefined {
  return TENANTS.find((t) => t.id === id);
}

export function getMenuItem(id: string): MenuItem | undefined {
  return MENU_ITEMS.find((m) => m.id === id);
}

export function tenantItems(tenantId: string): MenuItem[] {
  return MENU_ITEMS.filter((m) => m.tenantId === tenantId);
}
