import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { CANTEEN_STALLS } from "../lib/constants";
import type { QueueStall } from "../lib/types";

/** Map a queue length to a coloured status label, mirroring the web build. */
function queueLabel(count: number) {
  if (count <= 0)
    return { text: "Quiet", color: "text-emerald-600", bg: "bg-emerald-50", dot: "bg-emerald-400", bar: "bg-emerald-400" };
  if (count <= 4)
    return { text: "Light Queue", color: "text-emerald-600", bg: "bg-emerald-50", dot: "bg-emerald-400", bar: "bg-emerald-400" };
  if (count <= 8)
    return { text: "Busy", color: "text-amber-600", bg: "bg-amber-50", dot: "bg-amber-400", bar: "bg-amber-400" };
  return { text: "Very crowded", color: "text-red-600", bg: "bg-red-50", dot: "bg-red-500", bar: "bg-red-500" };
}

/**
 * Live "Antrian Kantin" board. The queue counts fluctuate every 8 seconds to
 * simulate a realtime feed (in production this would come from a backend).
 */
export function QueueBoard() {
  const [stalls, setStalls] = useState<QueueStall[]>(() =>
    CANTEEN_STALLS.map((s) => ({ ...s }))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setStalls((prev) =>
        prev.map((s) => {
          const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
          return { ...s, queue: Math.max(0, s.queue + delta) };
        })
      );
    }, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Text className="text-base font-extrabold text-slate-900">
            Antrian Kantin
          </Text>
          <View className="flex-row items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5">
            <View className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <Text className="text-xs font-semibold text-emerald-600">Live</Text>
          </View>
        </View>
        <Text className="text-xs font-medium text-slate-400">
          Update tiap 8 detik
        </Text>
      </View>

      <View className="flex-row flex-wrap justify-between gap-y-3">
        {stalls.map((stall) => {
          const lbl = queueLabel(stall.queue);
          const waitMin = stall.queue * stall.avgWaitPerOrder;
          const barPct = Math.min(100, Math.round((stall.queue / 15) * 100));
          return (
            <View
              key={stall.id}
              className="w-[48.5%] gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <View className="flex-row items-center gap-2">
                <Text className="text-xl">{stall.emoji}</Text>
                <Text
                  numberOfLines={1}
                  className="flex-1 text-sm font-bold text-slate-800"
                >
                  {stall.name}
                </Text>
              </View>

              <View
                className={`flex-row items-center gap-1.5 self-start rounded-full px-2.5 py-1 ${lbl.bg}`}
              >
                <View className={`h-1.5 w-1.5 rounded-full ${lbl.dot}`} />
                <Text className={`text-xs font-semibold ${lbl.color}`}>
                  {lbl.text}
                </Text>
              </View>

              <View className="flex-row items-center justify-between">
                <Text className="text-xs font-medium text-slate-500">
                  {stall.queue} Active Orders
                </Text>
                <Text className="text-xs font-medium text-slate-500">
                  ~{waitMin} min
                </Text>
              </View>

              <View className="h-1.5 w-full rounded-full bg-slate-100">
                <View
                  className={`h-1.5 rounded-full ${lbl.bar}`}
                  style={{ width: `${barPct}%` }}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
