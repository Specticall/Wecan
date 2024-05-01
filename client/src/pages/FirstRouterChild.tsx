/*
Stores context that needs the router's methods e.g. `useNavigate()`, `useLocation()`, etc...
*/

import DiaryCreationDialog from "@/components/app/dashboard/DiaryCreationDialog";
import GoalCompletedDialog from "@/components/app/task/GoalCompleteDialog";
import TaskCompleteDialog from "@/components/app/task/TaskCompleteDialog";
import TaskExpiredDialog from "@/components/app/task/TaskExpiredDialog";
import TaskDetailDialog from "@/components/app/task/taskDetailDialog/TaskDetailDialog";
import Dev from "@/components/general/Dev";
import GoalPrize from "@/components/general/GoalPrize";
import NewDayDialog from "@/components/general/NewDayDialog";
import UserProfile from "@/components/general/UserProfile";
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

// Stores the the title text we would like to show on different pages.
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

// Stores the dialog components that can be used in the application.
// This array will get passed into the `GlobalDialogProvider` component. which is made from scratch without the help of any existing libraries
const dialogComponents: DialogComponentProps = [
  // DEPRECATED. - No longer in use after the UI overhaul
  {
    name: "diaryCreation",
    component: <DiaryCreationDialog />,
  },
  // Displays a task's details such as their description, points, creation date, and buttons to complete / delete them.
  {
    name: "taskDetail",
    component: <TaskDetailDialog />,
    options: {
      // This option will allow the user to close the dialog by clicking anywhere outisde the component
      collapseWhenClickOutside: true,
    },
  },
  // Displays a success / congratulation message when a user completes a task
  {
    name: "taskComplete",
    component: <TaskCompleteDialog />,
    options: {
      collapseWhenClickOutside: true,
    },
  },
  // DEPRECATED - No longer in use after the UI overhaul
  {
    name: "taskExpired",
    component: <TaskExpiredDialog />,
    options: {
      collapseWhenClickOutside: true,
    },
  },
  // This dialog will show in the place of `taskDetail` when the user completes their task and goal at the same time.
  {
    name: "goalCompleted",
    component: <GoalCompletedDialog />,
    options: {
      collapseWhenClickOutside: true,
    },
  },
  // Displays the user's profile information such as their name, email, and points.
  {
    name: "userProfile",
    component: <UserProfile />,
    options: {
      collapseWhenClickOutside: true,
    },
  },
  // Displays a prompt that asks a user to set their task on that day. This dialog will show when the user logs in for the first time on that day.
  {
    name: "newDay",
    component: <NewDayDialog />,
  },
  // Shows an animation of a prize being "revealed" when the user completes their goal.
  {
    name: "goalPrize",
    component: <GoalPrize />,
    options: {
      collapseWhenClickOutside: true,
    },
  },
  //  IMPORTANT : Developer dialog, used for development purposes. Should not be used in production.
  {
    name: "dev",
    component: <Dev />,
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
