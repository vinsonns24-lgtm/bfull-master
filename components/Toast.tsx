import {
  AlertTriangle,
  CheckCircle2,
  Info,
  type LucideIcon,
} from "lucide-react-native";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Animated, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ToastVariant = "success" | "error" | "info";

interface ToastValue {
  show: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastValue | null>(null);

const STYLES: Record<ToastVariant, { Icon: LucideIcon; bg: string }> = {
  success: { Icon: CheckCircle2, bg: "#059669" },
  error: { Icon: AlertTriangle, bg: "#e11d48" },
  info: { Icon: Info, bg: "#0f172a" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState<{
    message: string;
    variant: ToastVariant;
  } | null>(null);
  const translateY = useRef(new Animated.Value(-160)).current;
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = useCallback(() => {
    Animated.timing(translateY, {
      toValue: -160,
      duration: 220,
      useNativeDriver: true,
    }).start(() => setToast(null));
  }, [translateY]);

  const show = useCallback(
    (message: string, variant: ToastVariant = "success") => {
      setToast({ message, variant });
      if (hideTimer.current) clearTimeout(hideTimer.current);
      translateY.setValue(-160);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 6,
      }).start();
      hideTimer.current = setTimeout(hide, 2600);
    },
    [translateY, hide]
  );

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const style = toast ? STYLES[toast.variant] : null;

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toast && style && (
        <Animated.View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            elevation: 1000,
            backgroundColor: style.bg,
            paddingTop: insets.top + 12,
            paddingBottom: 14,
            transform: [{ translateY }],
            shadowColor: "#000",
            shadowOpacity: 0.18,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
          }}
        >
          <View className="mx-auto w-full max-w-3xl flex-row items-center gap-3 px-5">
            <style.Icon color="#ffffff" size={20} />
            <Text className="flex-1 text-sm font-bold text-white">
              {toast.message}
            </Text>
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
