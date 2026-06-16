import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Bell, ChefHat, CircleCheck } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { getTenant } from "../lib/constants";
import { formatClock } from "../lib/format";
import { useStore } from "../lib/store";
import type { ActiveOrder } from "../lib/types";

const STEPS = [
  { key: "Confirmed", label: "Confirmed", Icon: CircleCheck },
  { key: "Cooking", label: "Cooking", Icon: ChefHat },
  { key: "Ready", label: "Ready", Icon: Bell },
] as const;

const META: Record<
  string,
  { progress: string; title: string; desc: string; stepIndex: number }
> = {
  Confirmed: {
    progress: "33%",
    title: "Paid & Confirmed",
    desc: "The kitchen is preparing to cook your priority order.",
    stepIndex: 0,
  },
  Cooking: {
    progress: "66%",
    title: "Cooking in Progress",
    desc: "Your queue-free lunch is sizzling on the stove.",
    stepIndex: 1,
  },
  Ready: {
    progress: "100%",
    title: "Ready for Pickup",
    desc: "Skip the lines! Your food is waiting under the warmers.",
    stepIndex: 2,
  },
};

export function OrderTracker() {
  const { activeOrders } = useStore();
  if (activeOrders.length === 0) return null;

  return (
    <View className="gap-4">
      {activeOrders.length > 1 && (
        <Text className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {activeOrders.length} active orders
        </Text>
      )}
      {activeOrders.map((order) => (
        <OrderBanner key={order.id} order={order} />
      ))}
    </View>
  );
}

function OrderBanner({ order }: { order: ActiveOrder }) {
  const router = useRouter();
  const meta = META[order.status];
  const tenant = getTenant(order.tenantId);

  return (
    <LinearGradient
      colors={["#f97316", "#ea580c", "#ef4444"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="overflow-hidden rounded-3xl shadow-lg"
    >
      <View className="w-full p-6">
        <View className="mb-5 flex-row items-start justify-between gap-4">
          <View className="flex-1">
            <Text className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-orange-100">
              {tenant?.name ?? "Order"} · #{order.id}
            </Text>
            <Text className="text-2xl font-black text-white">{meta.title}</Text>
            <Text className="mt-1 text-sm text-orange-100">{meta.desc}</Text>
          </View>
          <View className="rounded-2xl border border-white/10 bg-white/15 px-4 py-3">
            <Text className="text-[10px] font-medium text-orange-100">
              Est. Pickup
            </Text>
            <Text className="mt-0.5 text-lg font-black text-white">
              {formatClock(order.estimatedReadyAt)}
            </Text>
          </View>
        </View>

        {/* Progress bar */}
        <View className="h-2 overflow-hidden rounded-full bg-white/25">
          <View
            className="h-full rounded-full bg-white"
            style={{ width: meta.progress as `${number}%` }}
          />
        </View>

        {/* Steps */}
        <View className="mt-4 flex-row justify-between">
          {STEPS.map((s, i) => {
            const active = i <= meta.stepIndex;
            return (
              <View key={s.key} className="flex-1 items-center gap-1.5">
                <View
                  className={`h-9 w-9 items-center justify-center rounded-full ${
                    active ? "bg-white" : "bg-white/20"
                  }`}
                >
                  <s.Icon color={active ? "#ea580c" : "#ffffff"} size={18} />
                </View>
                <Text
                  className={`text-[11px] font-bold ${
                    active ? "text-white" : "text-orange-100/70"
                  }`}
                >
                  {s.label}
                </Text>
              </View>
            );
          })}
        </View>

        {order.status === "Ready" && (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/review",
                params: { orderId: order.id },
              })
            }
            className="mt-5 items-center rounded-xl bg-white py-3 active:opacity-90"
          >
            <Text className="text-sm font-bold text-brand-600">
              Mark as Picked Up
            </Text>
          </Pressable>
        )}
      </View>
    </LinearGradient>
  );
}
