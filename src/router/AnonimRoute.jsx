import { Navigate, Outlet } from "react-router-dom";
import { useAuthentification } from "../providers/AuthProvider";
import { ErrorBoundary } from "../components/ErrorBoundary";

export const AnonimRoute = () => {
  const user = useAuthentification();
  if (user.token) return <Navigate to="/" />;
  return (
    <ErrorBoundary fallback="We are sorry, login failed">
      <Outlet />
    </ErrorBoundary>
  );
};
