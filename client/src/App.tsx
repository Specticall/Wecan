import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import FirstRouterChild from "./pages/FirstRouterChild";
import Landing from "./pages/Landing";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./pages/AppLayout";
import Dashboard from "./pages/Dashboard";
import Diary from "./pages/Diary";
import Task from "./pages/Task";
import Statistics from "./pages/Statistics";
import HomeLayout from "./pages/LandingLayout";
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProtectRoute from "./components/service/ProtectRoute";

const router = createBrowserRouter([
  {
    element: <FirstRouterChild />,
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
          {
            path: "faq",
            element: <FAQ />,
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
          },
          {
            path: "statistics",
            element: <Statistics />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}
