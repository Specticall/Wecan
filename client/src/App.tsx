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
import Collection from "./pages/Collection";

const router = createBrowserRouter([
  {
    /**
     * Used as a component to place context that needs methods from react router e.g. `useNavigate()`, `useLocation()`, etc...
     * */
    element: <FirstRouterChild />,

    // Fetches data to check if the user is logged in
    loader: reloadSavedLoginDataLoader,

    // Handles invalid routes and errors caused by the application
    // errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home/landing" />,
      },
      // Landing page
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
      // DEPRECATED - Use Google OAuth instead
      {
        path: "/login",
        element: <Login />,
      },
      // DEPRECATED - Use Google OAuth instead
      {
        path: "/register",
        element: <Register />,
      },
      // Page that is shown when the user first logs in for the very first time
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
      // The main application route
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
            // Nested routes for the task page to display different forms (board and table/list style)
            children: [
              {
                // This `status` param is used primarily for mobile views where the task display can only be seen in either ongoing of completed status due to limited viewing space.
                path: "board/:status?",
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
          // DEPRECATED
          {
            path: "result",
            element: <div>(Optional)</div>,
          },

          {
            path: "collections",
            element: <Collection />,
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
