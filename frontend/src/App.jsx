import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import "./App.css";
import LoginSignup from "./pages/LoginSignup";
import NewEvent from "./pages/NewEvent";

const App = () => {
  return (
    <Routes>
      <Route path="/" Component={Landing} />
      <Route path="/auth" Component={LoginSignup} />
      <Route path="/create-event" Component={NewEvent} />
    </Routes>
  );
};

export default App;
