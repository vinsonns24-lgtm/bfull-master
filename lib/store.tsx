import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DEFAULT_CAMPUS_ID, VOUCHERS } from "./constants";
import type {
  ActiveOrder,
  CartItem,
  CompletedOrder,
  MenuItem,
  OrderRating,
  OrderStatus,
  User,
} from "./types";

const KEYS = {
  user: "bfull_user",
  cart: "bfull_cart",
  order: "bfull_active_order",
  campus: "bfull_campus",
  favorites: "bfull_favorites",
  history: "bfull_history",
  wallet: "bfull_wallet",
};

const INITIAL_BALANCE = 150000;

interface StoreValue {
  hydrated: boolean;
  user: User | null;
  cart: CartItem[];
  activeOrders: ActiveOrder[];
  cartCount: number;
  cartTotal: number;
  cartTenantId: string | null;
  // location
  campusId: string;
  setCampus: (id: string) => void;
  // favorites
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  // wallet / loyalty
  walletBalance: number;
  points: number;
  minutesSaved: number;
  orderHistory: CompletedOrder[];
  // vouchers
  appliedVoucherId: string | null;
  applyVoucher: (id: string | null) => void;
  discount: number;
  grandTotal: number;
  // auth
  login: (email: string, name?: string, studentId?: string) => void;
  logout: () => void;
  updateProfile: (patch: Partial<User>) => void;
  // cart
  canAddToCart: (item: MenuItem) => boolean;
  addToCart: (item: MenuItem, customization: string) => void;
  startNewOrderWith: (item: MenuItem, customization: string) => void;
  incQty: (index: number) => void;
  decQty: (index: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  // order
  placeOrder: () => void;
  completeOrder: (orderId: string, rating: OrderRating) => void;
  cancelOrder: (orderId: string) => void;
  delayOrder: (orderId: string, extraMs: number) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeOrders, setActiveOrders] = useState<ActiveOrder[]>([]);
  const [campusId, setCampusId] = useState<string>(DEFAULT_CAMPUS_ID);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orderHistory, setOrderHistory] = useState<CompletedOrder[]>([]);
  const [walletBalance, setWalletBalance] = useState(INITIAL_BALANCE);
  const [points, setPoints] = useState(120);
  const [minutesSaved, setMinutesSaved] = useState(45);
  const [appliedVoucherId, setAppliedVoucherId] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Hydrate persisted state on boot.
  useEffect(() => {
    (async () => {
      try {
        const entries = await AsyncStorage.multiGet([
          KEYS.user,
          KEYS.cart,
          KEYS.order,
          KEYS.campus,
          KEYS.favorites,
          KEYS.history,
          KEYS.wallet,
        ]);
        const map = Object.fromEntries(entries);
        if (map[KEYS.user]) setUser(JSON.parse(map[KEYS.user]!));
        if (map[KEYS.cart]) setCart(JSON.parse(map[KEYS.cart]!));
        if (map[KEYS.order]) {
          const parsed = JSON.parse(map[KEYS.order]!);
          setActiveOrders(
            Array.isArray(parsed) ? parsed : parsed ? [parsed] : []
          );
        }
        if (map[KEYS.campus]) setCampusId(map[KEYS.campus]!);
        if (map[KEYS.favorites]) setFavorites(JSON.parse(map[KEYS.favorites]!));
        if (map[KEYS.history]) setOrderHistory(JSON.parse(map[KEYS.history]!));
        if (map[KEYS.wallet]) {
          const w = JSON.parse(map[KEYS.wallet]!);
          if (typeof w.balance === "number") setWalletBalance(w.balance);
          if (typeof w.points === "number") setPoints(w.points);
          if (typeof w.minutesSaved === "number")
            setMinutesSaved(w.minutesSaved);
        }
      } catch {
        // ignore corrupt storage
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  // Persist on change (after hydration so we don't clobber stored values).
  useEffect(() => {
    if (hydrated) AsyncStorage.setItem(KEYS.user, JSON.stringify(user));
  }, [user, hydrated]);
  useEffect(() => {
    if (hydrated) AsyncStorage.setItem(KEYS.cart, JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated)
      AsyncStorage.setItem(KEYS.order, JSON.stringify(activeOrders));
  }, [activeOrders, hydrated]);
  useEffect(() => {
    if (hydrated) AsyncStorage.setItem(KEYS.campus, campusId);
  }, [campusId, hydrated]);
  useEffect(() => {
    if (hydrated) AsyncStorage.setItem(KEYS.favorites, JSON.stringify(favorites));
  }, [favorites, hydrated]);
  useEffect(() => {
    if (hydrated) AsyncStorage.setItem(KEYS.history, JSON.stringify(orderHistory));
  }, [orderHistory, hydrated]);
  useEffect(() => {
    if (hydrated) {
      AsyncStorage.setItem(
        KEYS.wallet,
        JSON.stringify({ balance: walletBalance, points, minutesSaved })
      );
    }
  }, [walletBalance, points, minutesSaved, hydrated]);

  // Simulate the kitchen advancing each active order independently, based on
  // how long ago it was placed (Confirmed → Cooking → Ready). A single ticker
  // handles any number of concurrent orders.
  useEffect(() => {
    timer.current = setInterval(() => {
      setActiveOrders((prev) => {
        if (prev.length === 0) return prev;
        let changed = false;
        const next = prev.map((o) => {
          const elapsed = Date.now() - o.createdAt;
          const target: OrderStatus =
            elapsed < 8000 ? "Confirmed" : elapsed < 16000 ? "Cooking" : "Ready";
          if (o.status !== target) {
            changed = true;
            return { ...o, status: target };
          }
          return o;
        });
        return changed ? next : prev;
      });
    }, 1500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const login = useCallback(
    (email: string, name = "Alex Chandra", studentId = "2502461183") => {
      setUser({ name, email, studentId });
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    setCart([]);
    setActiveOrders([]);
    setAppliedVoucherId(null);
  }, []);

  const updateProfile = useCallback((patch: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  const setCampus = useCallback((id: string) => setCampusId(id), []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );
  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const cartTenantId = cart[0]?.tenantId ?? null;

  const canAddToCart = useCallback(
    (item: MenuItem) =>
      cart.length === 0 || cart[0].tenantId === item.tenantId,
    [cart]
  );

  const mergeItem = (
    list: CartItem[],
    item: MenuItem,
    customization: string
  ): CartItem[] => {
    const idx = list.findIndex(
      (c) => c.id === item.id && c.customization === customization
    );
    if (idx >= 0) {
      const copy = [...list];
      copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 };
      return copy;
    }
    return [...list, { ...item, customization, quantity: 1 }];
  };

  const addToCart = useCallback((item: MenuItem, customization: string) => {
    setCart((prev) => mergeItem(prev, item, customization));
  }, []);

  const startNewOrderWith = useCallback(
    (item: MenuItem, customization: string) => {
      setCart([{ ...item, customization, quantity: 1 }]);
    },
    []
  );

  const incQty = useCallback((index: number) => {
    setCart((prev) =>
      prev.map((c, i) => (i === index ? { ...c, quantity: c.quantity + 1 } : c))
    );
  }, []);

  const decQty = useCallback((index: number) => {
    setCart((prev) =>
      prev
        .map((c, i) => (i === index ? { ...c, quantity: c.quantity - 1 } : c))
        .filter((c) => c.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedVoucherId(null);
  }, []);

  const cartTotal = useMemo(
    () => cart.reduce((acc, c) => acc + c.price * c.quantity, 0),
    [cart]
  );
  const cartCount = useMemo(
    () => cart.reduce((acc, c) => acc + c.quantity, 0),
    [cart]
  );

  const discount = useMemo(() => {
    const v = VOUCHERS.find((x) => x.id === appliedVoucherId);
    if (!v) return 0;
    return Math.min(v.amount, cartTotal);
  }, [appliedVoucherId, cartTotal]);

  const grandTotal = Math.max(0, cartTotal - discount);

  const applyVoucher = useCallback((id: string | null) => {
    setAppliedVoucherId(id);
  }, []);

  const placeOrder = useCallback(() => {
    setCart((current) => {
      if (current.length === 0) return current;
      const prep = Math.max(...current.map((c) => c.prepTime));
      const now = Date.now();
      const total = current.reduce((a, c) => a + c.price * c.quantity, 0);
      const v = VOUCHERS.find((x) => x.id === appliedVoucherId);
      const disc = v ? Math.min(v.amount, total) : 0;
      const order: ActiveOrder = {
        id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        tenantId: current[0].tenantId,
        items: [...current],
        total: Math.max(0, total - disc),
        status: "Confirmed",
        createdAt: now,
        estimatedReadyAt: now + prep * 60 * 1000,
      };
      // Add alongside any existing active orders (supports multiple at once).
      setActiveOrders((prev) => [order, ...prev]);
      return [];
    });
    setAppliedVoucherId(null);
  }, [appliedVoucherId]);

  const completeOrder = useCallback(
    (orderId: string, rating: OrderRating) => {
      setActiveOrders((prev) => {
        const order = prev.find((o) => o.id === orderId);
        if (order) {
          const completed: CompletedOrder = {
            ...order,
            completedAt: Date.now(),
            rating,
          };
          setOrderHistory((h) => [completed, ...h].slice(0, 20));
          setPoints((p) => p + Math.round(order.total / 1000));
          setMinutesSaved((m) => m + 15);
        }
        return prev.filter((o) => o.id !== orderId);
      });
    },
    []
  );

  const cancelOrder = useCallback((orderId: string) => {
    setActiveOrders((prev) => prev.filter((o) => o.id !== orderId));
  }, []);

  const delayOrder = useCallback((orderId: string, extraMs: number) => {
    setActiveOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, estimatedReadyAt: o.estimatedReadyAt + extraMs }
          : o
      )
    );
  }, []);

  const value: StoreValue = {
    hydrated,
    user,
    cart,
    activeOrders,
    cartCount,
    cartTotal,
    cartTenantId,
    campusId,
    setCampus,
    favorites,
    isFavorite,
    toggleFavorite,
    walletBalance,
    points,
    minutesSaved,
    orderHistory,
    appliedVoucherId,
    applyVoucher,
    discount,
    grandTotal,
    login,
    logout,
    updateProfile,
    canAddToCart,
    addToCart,
    startNewOrderWith,
    incQty,
    decQty,
    removeFromCart,
    clearCart,
    placeOrder,
    completeOrder,
    cancelOrder,
    delayOrder,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
