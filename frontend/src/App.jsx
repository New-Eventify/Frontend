import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import "./App.css";
import LoginSignup from "./pages/LoginSignup";

const App = () => {
  return (
    <Routes>
      <Route path="/" Component={Landing} />
      <Route path="/auth" Component={LoginSignup} />
    </Routes>
  );
};

export default App;
