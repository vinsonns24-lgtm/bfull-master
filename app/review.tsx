import { useLocalSearchParams, useRouter } from "expo-router";
import { CircleCheck, Star } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useToast } from "../components/Toast";
import { getTenant, REVIEW_TAGS } from "../lib/constants";
import { useStore } from "../lib/store";

export default function Review() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId?: string }>();
  const { completeOrder, activeOrders } = useStore();
  const toast = useToast();
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  const order =
    activeOrders.find((o) => o.id === orderId) ?? activeOrders[0];
  const tenant = order ? getTenant(order.tenantId) : undefined;

  function toggleTag(t: string) {
    setTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  }

  function submit() {
    if (rating === 0) {
      toast.show("Please select a star rating first!", "error");
      return;
    }
    if (order) {
      completeOrder(order.id, { stars: rating, tags, comment: comment.trim() });
    }
    toast.show("Thank you for improving bfull!");
    router.dismissAll();
    router.replace("/(tabs)");
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 items-center justify-center bg-slate-900/60 p-5"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="w-full max-w-sm items-center gap-5 rounded-3xl bg-white p-7">
        <View className="h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100">
          <CircleCheck color="#059669" size={42} />
        </View>

        <View className="items-center gap-1">
          <Text className="text-center text-2xl font-black text-slate-900">
            Yum! Order Picked Up
          </Text>
          <Text className="text-center text-sm font-medium text-slate-500">
            How was your experience with{" "}
            <Text className="font-bold text-slate-700">
              {tenant?.name ?? "this tenant"}
            </Text>
            ?
          </Text>
        </View>

        {/* Stars */}
        <View className="flex-row gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <Pressable key={n} onPress={() => setRating(n)} className="p-1">
              <Star
                size={34}
                color={n <= rating ? "#fbbf24" : "#e2e8f0"}
                fill={n <= rating ? "#fbbf24" : "#e2e8f0"}
              />
            </Pressable>
          ))}
        </View>

        {/* Quick tags */}
        <View className="flex-row flex-wrap justify-center gap-2">
          {REVIEW_TAGS.map((t) => {
            const active = tags.includes(t);
            return (
              <Pressable
                key={t}
                onPress={() => toggleTag(t)}
                className={`rounded-full border px-3 py-1.5 ${
                  active
                    ? "border-brand-500 bg-brand-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    active ? "text-brand-600" : "text-slate-500"
                  }`}
                >
                  {t}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <TextInput
          value={comment}
          onChangeText={setComment}
          multiline
          placeholder="Add a comment (optional)"
          placeholderTextColor="#94a3b8"
          className="min-h-[80px] w-full rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700"
          textAlignVertical="top"
        />

        <Pressable
          onPress={submit}
          className="w-full items-center rounded-xl bg-brand-500 py-4 active:opacity-90"
        >
          <Text className="text-sm font-bold uppercase tracking-wide text-white">
            Submit Rating
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
