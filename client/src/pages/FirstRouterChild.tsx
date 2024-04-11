import DiaryCreationDialog from "@/components/app/dashboard/DiaryCreationDialog";
import TaskCompleteDialog from "@/components/app/task/TaskCompleteDialog";
import TaskExpiredDialog from "@/components/app/task/TaskExpiredDialog";
import TaskDetailDialog from "@/components/app/task/taskDetailDialog/TaskDetailDialog";
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
  {
    name: "taskDetail",
    component: <TaskDetailDialog />,
    options: {
      collapseWhenClickOutside: true,
    },
  },
  {
    name: "taskComplete",
    component: <TaskCompleteDialog />,
    options: {
      collapseWhenClickOutside: true,
    },
  },
  {
    name: "taskExpired",
    component: <TaskExpiredDialog />,
    options: {
      collapseWhenClickOutside: true,
    },
  },
];

export default function FirstRouterChild() {
  return (
    <ViewportProvider>
      <PopupProvider>
        <AuthProvider>
          <UserProvider>
            <MoodProvider>
              <GlobalDialogProvider dialogComponents={dialogComponents}>
                <TitleWatcher titleConfig={titleConfig} />
                {/* <PageLoader /> */}
                <Outlet />
              </GlobalDialogProvider>
            </MoodProvider>
          </UserProvider>
        </AuthProvider>
      </PopupProvider>
    </ViewportProvider>
  );
}
