import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import FirstRouterChild from "./pages/FirstRouterChild";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./pages/AppLayout";
import Dashboard from "./pages/Dashboard";
import Diary from "./pages/Diary";
import Task from "./pages/Task";
import Statistics from "./pages/Statistics";
import HomeLayout from "./pages/LandingLayout";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProtectRoute from "./components/service/ProtectRoute";
import { reloadSavedLoginDataLoader } from "./context/AuthContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TaskBoard from "./components/app/task/TaskBoard";
import AllTasks from "./components/app/task/allTasks/AllTasks";
import OnBoarding from "./pages/OnBoarding";
import OnBoardingMood from "./components/onboarding/OnBoardingMood";
import OnBoardingPoints from "./components/onboarding/OnBoardingPoints";
import OnBoardingDiary from "./components/onboarding/OnBoardingDiary";
import PageNotFound from "./pages/PageNotFound";

const router = createBrowserRouter([
  {
    element: <FirstRouterChild />,
    loader: reloadSavedLoginDataLoader,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home/landing" />,
      },
      {
        path: "/home",
        element: <HomeLayout />,
        children: [
          {
            path: "landing",
            element: <Landing />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectRoute>
            <OnBoarding />
          </ProtectRoute>
        ),
        children: [
          { path: "step-1", element: <OnBoardingMood /> },
          {
            path: "step-2",
            element: <OnBoardingPoints />,
          },
          {
            path: "step-3",
            element: <OnBoardingDiary />,
          },
        ],
      },
      {
        path: "/app",
        element: (
          <ProtectRoute>
            <AppLayout />
          </ProtectRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "diary",
            element: <Diary />,
          },
          {
            path: "task",
            element: <Task />,
            children: [
              {
                path: "board",
                element: <TaskBoard />,
              },
              {
                path: "list",
                element: <AllTasks />,
              },
            ],
          },
          {
            path: "statistics",
            element: <Statistics />,
          },
          {
            path: "result",
            element: <div>(Optional)</div>,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
