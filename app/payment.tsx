import { useRouter } from "expo-router";
import { ShieldCheck, X } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useToast } from "../components/Toast";
import { formatRupiah } from "../lib/format";
import { useStore } from "../lib/store";

// A deterministic faux-QRIS pattern (7x7) so it always looks like a real code.
const QR = [
  [1, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 1],
  [0, 0, 1, 0, 1, 1, 0],
  [1, 1, 0, 1, 0, 1, 1],
  [1, 0, 1, 1, 1, 0, 0],
  [1, 1, 1, 0, 1, 1, 1],
];

export default function Payment() {
  const router = useRouter();
  const { grandTotal, placeOrder } = useStore();
  const toast = useToast();

  function onSuccess() {
    placeOrder();
    toast.show("Payment successful! Priority queue locked");
    router.dismissAll();
    router.replace("/(tabs)");
  }

  return (
    <View className="flex-1 items-center justify-center bg-slate-900/60 p-5">
      <View className="w-full max-w-sm gap-6 rounded-3xl bg-white p-7">
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="text-xl font-black text-slate-900">
              Cashless Payment
            </Text>
            <Text className="mt-0.5 text-xs font-medium text-slate-500">
              Scan to auto-verify your order instantly.
            </Text>
          </View>
          <Pressable onPress={() => router.back()} className="p-1">
            <X color="#94a3b8" size={22} />
          </Pressable>
        </View>

        {/* Amount */}
        <View className="flex-row items-center justify-between rounded-2xl bg-brand-50 px-4 py-3">
          <Text className="text-[11px] font-extrabold uppercase tracking-wider text-brand-600">
            Amount to Pay
          </Text>
          <Text className="text-lg font-black text-brand-600">
            {formatRupiah(grandTotal)}
          </Text>
        </View>

        {/* QR */}
        <View className="items-center gap-3 rounded-2xl border border-slate-100 py-6">
          <View className="rounded-xl bg-white p-3">
            {QR.map((row, r) => (
              <View key={r} className="flex-row">
                {row.map((cell, c) => (
                  <View
                    key={c}
                    style={{ width: 18, height: 18 }}
                    className={cell ? "bg-slate-900" : "bg-white"}
                  />
                ))}
              </View>
            ))}
          </View>
          <Text className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            Powered by bfull Pay · QRIS
          </Text>
        </View>

        <View className="gap-3">
          <Pressable
            onPress={onSuccess}
            className="flex-row items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 active:opacity-90"
          >
            <ShieldCheck color="#fff" size={18} />
            <Text className="text-sm font-bold text-white">
              Simulate Cashless Success
            </Text>
          </Pressable>
          <Pressable onPress={() => router.back()} className="items-center py-2">
            <Text className="text-sm font-semibold text-slate-500">
              Abort Order
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
