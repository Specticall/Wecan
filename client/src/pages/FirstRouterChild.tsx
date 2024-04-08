import DiaryCreationDialog from "@/components/app/dashboard/DiaryCreationDialog";
import PageLoader from "@/components/general/PageLoader";
import TitleWatcher, { TitleConfig } from "@/components/service/TitleWatcher";
import { AuthProvider } from "@/context/AuthContext";
import {
  DialogComponentProps,
  GlobalDialogProvider,
} from "@/context/GlobalDialogContext";
import { MoodProvider } from "@/context/MoodContext";
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
    { path: "/app/dashboard", titlePath: "Dashboard" },
    { path: "/app/diary", titlePath: "Diary" },
    { path: "/app/task", titlePath: "Task" },
    { path: "/app/statistics", titlePath: "Statistics" },
  ],
};

const dialogComponents: DialogComponentProps = [
  {
    name: "diaryCreation",
    component: <DiaryCreationDialog />,
  },
];

export default function FirstRouterChild() {
  return (
    <ViewportProvider>
      <PopupProvider>
        <AuthProvider>
          <MoodProvider>
            <UserProvider>
              <GlobalDialogProvider dialogComponents={dialogComponents}>
                <TitleWatcher titleConfig={titleConfig} />
                <PageLoader />
                <Outlet />
              </GlobalDialogProvider>
            </UserProvider>
          </MoodProvider>
        </AuthProvider>
      </PopupProvider>
    </ViewportProvider>
  );
}
