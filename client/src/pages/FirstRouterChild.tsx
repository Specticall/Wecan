import TitleWatcher, { TitleConfig } from "@/components/service/TitleWatcher";
import { AuthProvider } from "@/context/AuthContext";
import PopupProvider from "@/context/PopupContext";
import { UserProvider } from "@/context/UserContext";
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
      <PopupProvider>
        <UserProvider>
          <AuthProvider>
            <TitleWatcher titleConfig={titleConfig} />
            <Outlet />
          </AuthProvider>
        </UserProvider>
      </PopupProvider>
    </ViewportProvider>
  );
}
