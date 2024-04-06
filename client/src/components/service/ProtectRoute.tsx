import { useAuth } from "@/context/AuthContext";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Redirects unauthorized user
 *
 * @returns
 */
export default function ProtectRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const navigate = useNavigate();

  // Navigate must be called after the components has finished rendering
  useEffect(() => {
    if (!token) navigate("/home/landing");
  }, [token, navigate]);

  // If user data is null that means the user has not yet logged in.
  if (!token) return;

  return <>{children}</>;
}
