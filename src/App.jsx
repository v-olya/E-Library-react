import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Page } from "./components/pages/Page";
import { NotFound } from "./components/pages/NotFound";
import { AnonimRoute } from "./router/AnonimRoute";
import { UserRoute } from "./router/UserRoute";

export function App() {
  return (
    <>
      <BrowserRouter>
        <ErrorBoundary fallback="There was an uncaught error... Perhaps we should have logged it :(">
          <AuthProvider>
            <Routes>
              <Route element={<AnonimRoute />}>
                <Route path="/login" element={<Page type="Login" />} />
              </Route>
              <Route element={<UserRoute />}>
                <Route path="/" element={<Page type="HomePage" />} />
              </Route>
              <Route>
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AuthProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}
