import { useViewport } from "@/context/ViewportContext";
import MobileAppNavbar from "./MobileAppNavbar";
import DesktopNavbar from "./DesktopAppNavbar";

// Since the mobile and desktop navbar has alot of differences, we need to seperate them into two different components instead of forcing them to work with alot of CSS hacky tricks.
export default function AppNavbar() {
  const { viewport } = useViewport();
  return viewport.width <= 1200 ? <MobileAppNavbar /> : <DesktopNavbar />;
}
