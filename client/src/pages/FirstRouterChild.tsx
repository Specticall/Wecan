import TitleWatcher, { TitleConfig } from "@/components/service/TitleWatcher";
import { ViewportProvider } from "@/context/ViewportContext";
import { Outlet } from "react-router-dom";

const titleConfig: TitleConfig = {
  title: "- Wecan",
  routes: [
    { path: "/home/faq", titlePath: "FAQ" },
    { path: "/home/landing", titlePath: "Landing" },
    { path: "/login", titlePath: "Login" },
    { path: "/register", titlePath: "Create an Account" },
  ],
};

export default function FirstRouterChild() {
  return (
    <ViewportProvider>
      <TitleWatcher titleConfig={titleConfig} />
      <Outlet />
    </ViewportProvider>
  );
}
