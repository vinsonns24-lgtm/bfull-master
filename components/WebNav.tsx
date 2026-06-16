import { usePathname, useRouter } from "expo-router";
import { Home, Store, ShoppingBag, User } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useStore } from "../lib/store";
import { CampusPill } from "./CampusPill";

const LINKS = [
  { href: "/", label: "Menu", Icon: Home },
  { href: "/tenants", label: "Tenants", Icon: Store },
  { href: "/cart", label: "Tray", Icon: ShoppingBag },
  { href: "/profile", label: "Profile", Icon: User },
] as const;

/** Top navigation bar shown on web (desktop/tablet) in place of bottom tabs. */
export function WebNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount, user } = useStore();

  return (
    <View className="border-b border-slate-100 bg-white">
      <View className="mx-auto w-full max-w-6xl flex-row items-center justify-between px-6 py-3">
        {/* Brand + location */}
        <View className="flex-row items-center gap-4">
          <Pressable
            onPress={() => router.push("/")}
            className="flex-row items-center gap-2.5"
          >
            <View className="h-9 w-9 items-center justify-center rounded-xl bg-brand-500">
              <Text className="text-lg font-black leading-none text-white">
                b
              </Text>
            </View>
            <Text className="text-lg font-black leading-tight text-slate-900">
              bfull
            </Text>
          </Pressable>
          <CampusPill />
        </View>

        {/* Links */}
        <View className="flex-row items-center gap-1">
          {LINKS.map(({ href, label, Icon }) => {
            const active = pathname === href;
            return (
              <Pressable
                key={href}
                onPress={() => router.push(href)}
                className={`flex-row items-center gap-2 rounded-full px-4 py-2 ${
                  active ? "bg-brand-50" : ""
                }`}
              >
                <View>
                  <Icon color={active ? "#ea580c" : "#64748b"} size={18} />
                  {href === "/cart" && cartCount > 0 && (
                    <View className="absolute -right-2 -top-2 h-4 min-w-4 items-center justify-center rounded-full bg-brand-500 px-1">
                      <Text className="text-[9px] font-black text-white">
                        {cartCount}
                      </Text>
                    </View>
                  )}
                </View>
                <Text
                  className={`text-sm font-bold ${
                    active ? "text-brand-600" : "text-slate-600"
                  }`}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}

          <View className="ml-2 h-9 w-9 items-center justify-center rounded-full bg-slate-900">
            <Text className="text-sm font-black uppercase text-white">
              {(user?.name ?? "S").charAt(0)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
