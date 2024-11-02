import "./App.css";
import RootRoutes from "@/routes/RootRoutes.tsx";
import { authQueryKeys } from "@/contants/queryKeys.ts";

function App() {
  console.log(authQueryKeys.profile, authQueryKeys);

  return (
    <>
      <RootRoutes />
    </>
  );
}

export default App;
