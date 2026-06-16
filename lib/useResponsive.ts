import { Platform, useWindowDimensions } from "react-native";

/**
 * Responsive breakpoints. On native we always treat the device as "mobile"
 * (phone-first layout); on web we adapt to the window width so the site feels
 * like a real desktop website on large screens.
 */
export function useResponsive() {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web";
  const isDesktop = isWeb && width >= 1024;
  const isTablet = isWeb && width >= 768 && width < 1024;
  const isWide = isWeb && width >= 768;

  // Number of columns for the menu grid.
  const menuColumns = isDesktop ? 4 : isTablet ? 3 : 2;

  return { width, isWeb, isDesktop, isTablet, isWide, menuColumns };
}
