import { Routes, Route } from "react-router-dom";
import { routes } from "@/contants/path.ts";
import LoginPage from "@/pages/LoignPage.tsx";
import SignupPage from "@/pages/SignupPage.tsx";

function RootRoutes() {
  return (
    <Routes>
      <Route path={routes.LOGIN} element={<LoginPage />} />
      <Route path={routes.SIGNUP} element={<SignupPage />} />
    </Routes>
  );
}

export default RootRoutes;
