"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "@/lib/products";

export interface CartItem {
  slug: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  add: (slug: string, quantity?: number) => void;
  remove: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  totalCount: number;
  totalPrice: number;
  ready: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "kyune-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        setItems(parsed.filter((i) => getProduct(i.slug) && i.quantity > 0));
      }
    } catch {
      /* ignore corrupted storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo<CartContextValue>(() => {
    const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items.reduce((sum, i) => {
      const p = getProduct(i.slug);
      return sum + (p ? p.price * i.quantity : 0);
    }, 0);

    return {
      items,
      ready,
      totalCount,
      totalPrice,
      add: (slug, quantity = 1) =>
        setItems((prev) => {
          const found = prev.find((i) => i.slug === slug);
          if (found) {
            return prev.map((i) =>
              i.slug === slug ? { ...i, quantity: i.quantity + quantity } : i
            );
          }
          return [...prev, { slug, quantity }];
        }),
      remove: (slug) => setItems((prev) => prev.filter((i) => i.slug !== slug)),
      setQuantity: (slug, quantity) =>
        setItems((prev) =>
          quantity <= 0
            ? prev.filter((i) => i.slug !== slug)
            : prev.map((i) => (i.slug === slug ? { ...i, quantity } : i))
        ),
      clear: () => setItems([]),
    };
  }, [items, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
