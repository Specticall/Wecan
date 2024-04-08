import PageLoader from "@/components/general/PageLoader";
import TitleWatcher, { TitleConfig } from "@/components/service/TitleWatcher";
import { AuthProvider } from "@/context/AuthContext";
import {
  DialogCollapse,
  DialogComponentProps,
  GlobalDialogProvider,
} from "@/context/GlobalDialogContext";
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

const dialogComponents: DialogComponentProps = [
  {
    name: "diaryCreation",
    component: (
      <div className="bg-white p-8">
        <DialogCollapse>Close</DialogCollapse>
        TESTING
      </div>
    ),
  },
];

export default function FirstRouterChild() {
  return (
    <ViewportProvider>
      <GlobalDialogProvider dialogComponents={dialogComponents}>
        <PopupProvider>
          <AuthProvider>
            <UserProvider>
              <TitleWatcher titleConfig={titleConfig} />
              <PageLoader />
              <Outlet />
            </UserProvider>
          </AuthProvider>
        </PopupProvider>
      </GlobalDialogProvider>
    </ViewportProvider>
  );
}
