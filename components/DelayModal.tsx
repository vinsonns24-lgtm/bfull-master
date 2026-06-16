import { Clock } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { formatClock } from "../lib/format";
import { useStore } from "../lib/store";
import { useToast } from "./Toast";

interface DelayInfo {
  orderId: string;
  originalAt: number;
  newAt: number;
}

/**
 * Watches active orders and, the first time an order starts cooking, warns that
 * the canteen is busier than usual and the pickup will be late — letting the
 * student keep waiting (estimate already pushed back) or cancel the order.
 * Mirrors the delay popup from the web build.
 */
export function DelayModal() {
  const { activeOrders, cancelOrder, delayOrder } = useStore();
  const toast = useToast();
  const shown = useRef<Set<string>>(new Set());
  const [info, setInfo] = useState<DelayInfo | null>(null);

  useEffect(() => {
    if (info) return; // show one delay warning at a time
    const order = activeOrders.find(
      (o) => o.status === "Cooking" && !shown.current.has(o.id)
    );
    if (!order) return;

    shown.current.add(order.id);
    const delayMin = Math.floor(Math.random() * 11) + 5; // 5–15 min
    const originalAt = order.estimatedReadyAt;
    const newAt = originalAt + delayMin * 60000;
    delayOrder(order.id, delayMin * 60000);
    setInfo({ orderId: order.id, originalAt, newAt });
  }, [activeOrders, info, delayOrder]);

  if (!info) return null;

  const keepWaiting = () => {
    toast.show(`Oke, estimasi diperbarui ke ${formatClock(info.newAt)}`, "info");
    setInfo(null);
  };

  const cancel = () => {
    cancelOrder(info.orderId);
    toast.show("Pesanan dibatalkan", "error");
    setInfo(null);
  };

  return (
    <Modal transparent visible animationType="fade" onRequestClose={keepWaiting}>
      <View className="flex-1 justify-end bg-slate-900/50 p-4">
        <View className="w-full max-w-md self-center gap-5 rounded-3xl bg-white p-6">
          {/* Icon + title */}
          <View className="flex-row items-center gap-3">
            <View className="h-11 w-11 items-center justify-center rounded-2xl bg-amber-100">
              <Clock color="#d97706" size={24} />
            </View>
            <View className="flex-1">
              <Text className="text-base font-extrabold text-slate-900">
                Your order will be late
              </Text>
              <Text className="mt-0.5 text-xs font-medium text-slate-500">
                Kantin sedang ramai dari biasanya
              </Text>
            </View>
          </View>

          {/* New estimate badge */}
          <View className="flex-row items-center justify-between rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3">
            <View>
              <Text className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                New Estimate
              </Text>
              <Text className="mt-0.5 text-2xl font-black tracking-tight text-amber-800">
                {formatClock(info.newAt)}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-xs font-medium text-slate-500">
                Estimasi awal
              </Text>
              <Text className="mt-0.5 text-sm font-bold text-slate-400 line-through">
                {formatClock(info.originalAt)}
              </Text>
            </View>
          </View>

          <Text className="text-sm font-medium leading-relaxed text-slate-600">
            Pesananmu kemungkinan baru siap sekitar {formatClock(info.newAt)},
            dari estimasi awal {formatClock(info.originalAt)}. Kamu mau tetap
            menunggu atau membatalkan pesanan?
          </Text>

          {/* Actions */}
          <View className="flex-row gap-3">
            <Pressable
              onPress={cancel}
              className="flex-1 items-center rounded-xl bg-slate-100 py-3.5 active:opacity-90"
            >
              <Text className="text-sm font-bold text-slate-700">
                Batalkan pesanan
              </Text>
            </Pressable>
            <Pressable
              onPress={keepWaiting}
              className="flex-1 items-center rounded-xl bg-brand-500 py-3.5 active:opacity-90"
            >
              <Text className="text-sm font-bold text-white">Tetap tunggu</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
