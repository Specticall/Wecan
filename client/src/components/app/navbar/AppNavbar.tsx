import { useViewport } from "@/context/ViewportContext";
import MobileAppNavbar from "./MobileAppNavbar";
import DesktopNavbar from "./DesktopAppNavbar";

export default function AppNavbar() {
  const { viewport } = useViewport();
  return viewport.width <= 900 ? <MobileAppNavbar /> : <DesktopNavbar />;
}
