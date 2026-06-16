import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTenant, VOUCHERS } from "../../lib/constants";
import { formatRupiah } from "../../lib/format";
import { useResponsive } from "../../lib/useResponsive";
import { useStore } from "../../lib/store";

const CENTER = { maxWidth: 768, width: "100%", alignSelf: "center" } as const;

export default function Cart() {
  const router = useRouter();
  const {
    cart,
    cartTotal,
    incQty,
    decQty,
    removeFromCart,
    cartTenantId,
    appliedVoucherId,
    applyVoucher,
    discount,
    grandTotal,
  } = useStore();
  const { isWide } = useResponsive();
  const tenant = cartTenantId ? getTenant(cartTenantId) : undefined;

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={isWide ? [] : ["top"]}>
      <View className="border-b border-slate-100 bg-white">
        <View style={CENTER} className="px-5 py-4">
          <Text className="text-xl font-black text-slate-900">Your Tray</Text>
          <Text className="text-xs font-medium text-slate-500">
            {cart.length === 0
              ? "Add meals to start an order"
              : `${cart.length} item${cart.length > 1 ? "s" : ""} ready to lock`}
          </Text>
        </View>
      </View>

      {cart.length === 0 ? (
        <View className="flex-1 items-center justify-center gap-4 px-6">
          <View className="h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <ShoppingBag color="#cbd5e1" size={36} />
          </View>
          <Text className="text-sm font-semibold text-slate-400">
            Your tray is currently empty.
          </Text>
          <Pressable
            onPress={() => router.push("/(tabs)")}
            className="rounded-xl bg-brand-500 px-6 py-3 active:opacity-90"
          >
            <Text className="text-sm font-bold text-white">Browse Menu</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <ScrollView
            className="flex-1"
            contentContainerClassName="gap-4 p-5"
            contentContainerStyle={CENTER}
            showsVerticalScrollIndicator={false}
          >
            {tenant && (
              <View className="flex-row items-center gap-3 rounded-2xl bg-white p-3">
                <View
                  className={`h-10 w-10 items-center justify-center rounded-xl ${tenant.logoColor}`}
                >
                  <Text className="text-xs font-black text-white">
                    {tenant.initials}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-extrabold text-slate-900">
                    {tenant.name}
                  </Text>
                  <Text className="text-xs font-medium text-slate-400">
                    Pickup order · ~{tenant.etaMin} min
                  </Text>
                </View>
              </View>
            )}
            {cart.map((item, idx) => (
              <View
                key={`${item.id}-${idx}`}
                className="flex-row gap-4 rounded-2xl border border-slate-100 bg-white p-4"
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 64, height: 64, borderRadius: 14 }}
                  contentFit="cover"
                />
                <View className="flex-1 justify-between">
                  <View className="flex-row items-start justify-between gap-2">
                    <Text
                      className="flex-1 text-sm font-extrabold text-slate-900"
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                    <Pressable onPress={() => removeFromCart(idx)} className="p-1">
                      <Trash2 color="#94a3b8" size={16} />
                    </Pressable>
                  </View>
                  {!!item.customization && (
                    <Text
                      className="text-xs font-semibold italic text-brand-600"
                      numberOfLines={2}
                    >
                      &ldquo;{item.customization}&rdquo;
                    </Text>
                  )}
                  <View className="mt-1 flex-row items-center justify-between">
                    <Text className="text-sm font-black text-slate-900">
                      {formatRupiah(item.price * item.quantity)}
                    </Text>
                    <View className="flex-row items-center gap-3">
                      <Pressable
                        onPress={() => decQty(idx)}
                        className="h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white active:bg-slate-100"
                      >
                        <Minus color="#475569" size={14} strokeWidth={3} />
                      </Pressable>
                      <Text className="w-5 text-center text-sm font-bold text-slate-900">
                        {item.quantity}
                      </Text>
                      <Pressable
                        onPress={() => incQty(idx)}
                        className="h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white active:bg-slate-100"
                      >
                        <Plus color="#475569" size={14} strokeWidth={3} />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Checkout footer */}
          <View className="border-t border-slate-100 bg-white">
            <View style={CENTER} className="gap-3 p-5">
              {/* Voucher chips */}
              <View className="flex-row items-center gap-2">
                <Tag color="#f97316" size={15} />
                <Text className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Vouchers
                </Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="gap-2"
              >
                {VOUCHERS.map((v) => {
                  const active = v.id === appliedVoucherId;
                  return (
                    <Pressable
                      key={v.id}
                      onPress={() => applyVoucher(active ? null : v.id)}
                      className={`rounded-xl border px-3 py-2 ${
                        active
                          ? "border-brand-500 bg-brand-50"
                          : "border-dashed border-slate-300 bg-white"
                      }`}
                    >
                      <Text
                        className={`text-xs font-black ${
                          active ? "text-brand-600" : "text-slate-700"
                        }`}
                      >
                        {v.label}
                      </Text>
                      <Text className="text-[10px] font-medium text-slate-400">
                        {v.code} · {v.desc}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>

              <View className="mt-1 gap-1">
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm font-semibold text-slate-500">
                    Subtotal
                  </Text>
                  <Text className="text-sm font-bold text-slate-700">
                    {formatRupiah(cartTotal)}
                  </Text>
                </View>
                {discount > 0 && (
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm font-semibold text-emerald-600">
                      Voucher discount
                    </Text>
                    <Text className="text-sm font-bold text-emerald-600">
                      −{formatRupiah(discount)}
                    </Text>
                  </View>
                )}
                <View className="flex-row items-center justify-between border-t border-slate-100 pt-2">
                  <Text className="text-base font-bold text-slate-900">
                    Total
                  </Text>
                  <Text className="text-xl font-black text-slate-900">
                    {formatRupiah(grandTotal)}
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={() => router.push("/payment")}
                className="items-center rounded-2xl bg-slate-900 py-4 active:opacity-90"
              >
                <Text className="text-sm font-bold uppercase tracking-wide text-white">
                  Proceed &amp; Lock Order
                </Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
