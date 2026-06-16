import { Redirect, Tabs } from "expo-router";
import { Home, ShoppingBag, Store, User } from "lucide-react-native";
import { Platform, View } from "react-native";
import { WebNav } from "../../components/WebNav";
import { useResponsive } from "../../lib/useResponsive";
import { useStore } from "../../lib/store";

export default function TabsLayout() {
  const { hydrated, user, cartCount } = useStore();
  const { isWide } = useResponsive();

  if (!hydrated) return null;
  if (!user) return <Redirect href="/login" />;

  return (
    <View style={{ flex: 1 }}>
      {/* Desktop/tablet web: top navbar replaces bottom tabs */}
      {isWide && <WebNav />}

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#ea580c",
          tabBarInactiveTintColor: "#94a3b8",
          tabBarLabelStyle: { fontSize: 11, fontWeight: "700" },
          // Hide the bottom bar when the web top navbar is shown.
          tabBarStyle: isWide
            ? { display: "none" }
            : {
                borderTopColor: "#f1f5f9",
                height: Platform.OS === "ios" ? 86 : 64,
                paddingTop: 6,
                paddingBottom: Platform.OS === "ios" ? 28 : 8,
              },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Menu",
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="tenants"
          options={{
            title: "Tenants",
            tabBarIcon: ({ color, size }) => <Store color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Tray",
            tabBarBadge: cartCount > 0 ? cartCount : undefined,
            tabBarBadgeStyle: { backgroundColor: "#f97316", fontSize: 10 },
            tabBarIcon: ({ color, size }) => (
              <ShoppingBag color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />
      </Tabs>
    </View>
  );
}
