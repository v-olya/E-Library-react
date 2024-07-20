import { Navigate, Outlet } from "react-router-dom";
import { useAuthentification } from "../providers/AuthProvider";
import { ErrorBoundary } from "../components/ErrorBoundary";

export const UserRoute = () => {
  const user = useAuthentification();
  if (user && !user.token) return <Navigate to="/login" />;
  return (
    <ErrorBoundary fallback="We are sorry, the data wasn't properly handled">
      <Outlet />
    </ErrorBoundary>
  );
};
