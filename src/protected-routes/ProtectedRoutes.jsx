import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/reducers/userSlice";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoutes = ({ authRequired, redirect }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (authRequired !== isLoggedIn) {
    return <Navigate to={redirect} />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
