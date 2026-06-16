import { useRouter } from "expo-router";
import { Search } from "lucide-react-native";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CampusPill } from "../../components/CampusPill";
import { FoodCard } from "../../components/FoodCard";
import { OrderTracker } from "../../components/OrderTracker";
import { QueueBoard } from "../../components/QueueBoard";
import { CATEGORIES, MENU_ITEMS } from "../../lib/constants";
import { useResponsive } from "../../lib/useResponsive";
import { useStore } from "../../lib/store";
import type { Category } from "../../lib/types";

export default function Home() {
  const router = useRouter();
  const { user } = useStore();
  const { isWide, menuColumns } = useResponsive();
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MENU_ITEMS.filter((item) => {
      const matchCat = category === "All" || item.category === category;
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [category, query]);

  // Pad the last row with invisible placeholders so a lone card never
  // stretches to the full width of the grid.
  const gridData = useMemo(() => {
    const rem = filtered.length % menuColumns;
    if (rem === 0 || filtered.length === 0) return filtered;
    const pad = Array.from({ length: menuColumns - rem }, (_, i) => ({
      id: `__placeholder_${i}`,
      placeholder: true as const,
    }));
    return [...filtered, ...pad];
  }, [filtered, menuColumns]);

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={isWide ? [] : ["top"]}>
      {/* Mobile in-page header (web uses the global top navbar instead) */}
      {!isWide && (
        <View className="flex-row items-center justify-between border-b border-slate-100 bg-white px-5 py-3">
          <View className="flex-row items-center gap-2.5">
            <View className="h-9 w-9 items-center justify-center rounded-xl bg-brand-500 shadow-sm">
              <Text className="text-lg font-black leading-none text-white">
                b
              </Text>
            </View>
            <Text className="text-lg font-black leading-tight text-slate-900">
              bfull
            </Text>
          </View>
          <CampusPill />
        </View>
      )}

      <FlatList
        key={menuColumns}
        data={gridData}
        keyExtractor={(item) => item.id}
        numColumns={menuColumns}
        columnWrapperClassName="gap-4 px-5"
        contentContainerClassName="gap-4 pb-10 pt-4"
        contentContainerStyle={{ maxWidth: 1152, width: "100%", alignSelf: "center" }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="gap-5 px-5 pb-1">
            <OrderTracker />

            {isWide && (
              <View className="mt-2">
                <Text className="text-3xl font-black text-slate-900">
                  Good day, {user?.name?.split(" ")[0] ?? "Student"} 👋
                </Text>
                <Text className="mt-1 text-sm font-medium text-slate-500">
                  Order ahead and skip the queue at kantin binus.
                </Text>
              </View>
            )}

            {/* Live canteen queue */}
            <QueueBoard />

            {/* Search */}
            <View className="flex-row items-center gap-3 rounded-2xl bg-white px-4 shadow-sm">
              <Search color="#94a3b8" size={18} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search queue-free meals..."
                placeholderTextColor="#94a3b8"
                className="flex-1 py-3.5 text-sm font-medium text-slate-900"
              />
            </View>

            {/* Categories */}
            <FlatList
              horizontal
              data={CATEGORIES}
              keyExtractor={(c) => c}
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="gap-2"
              renderItem={({ item: cat }) => {
                const active = cat === category;
                return (
                  <Pressable
                    onPress={() => setCategory(cat)}
                    className={`rounded-full px-5 py-2.5 ${
                      active ? "bg-slate-900" : "bg-white"
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        active ? "text-white" : "text-slate-500"
                      }`}
                    >
                      {cat}
                    </Text>
                  </Pressable>
                );
              }}
            />

            <View className="flex-row items-center justify-between">
              <Text className="text-xl font-black text-slate-800">
                Available Foods
              </Text>
              <Text className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                {filtered.length} items
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => {
          if ("placeholder" in item) return <View className="flex-1" />;
          return (
            <View className="flex-1">
              <FoodCard
                item={item}
                onPress={() => router.push(`/food/${item.id}`)}
              />
            </View>
          );
        }}
        ListEmptyComponent={
          <View className="items-center gap-3 px-5 py-16">
            <Text className="text-base font-bold text-slate-500">
              No meals match your search
            </Text>
            <Pressable
              onPress={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              <Text className="text-sm font-bold text-brand-600">
                Reset filters
              </Text>
            </Pressable>
          </View>
        }
      />
    </SafeAreaView>
  );
}
