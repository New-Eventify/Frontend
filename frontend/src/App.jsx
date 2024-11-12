import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" Component={Landing} />
    </Routes>
  );
};

export default App;
