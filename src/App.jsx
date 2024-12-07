import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import "./App.css";
import LoginSignup from "./pages/LoginSignup";
import NewEvent from "./pages/NewEvent";
import ProtectedRoutes from "./protected-routes/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { startTokenExpirationCheck } = useAuth();
  startTokenExpirationCheck();
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
      <Routes>
        <Route
          element={<ProtectedRoutes authRequired={true} redirect={"/auth"} />}
        >
          <Route path="/create-event" Component={NewEvent} />
        </Route>
        <Route path="/" Component={Landing} />
        <Route path="/auth" Component={LoginSignup} />
      </Routes>
    </>
  );
};

export default App;
