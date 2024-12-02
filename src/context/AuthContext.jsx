import { createContext, useContext } from "react";
import axiosInstance from "./axios";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setUser, resetUser, selectToken } from "../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setIsSignUp } from "../redux/reducers/authViewSlice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);

  const login = async (email, password) => {
    let message = "An error occur";
    try {
      const response = await axiosInstance.post("/users/signin", {
        email,
        password,
      });
      const { user, token } = response.data;

      // Update Redux state and navigate
      dispatch(setUser({ user, token }));
      navigate("/");
      message = "success";
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
    return message;
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axiosInstance.post("/users/signup", {
        name,
        email,
        password,
      });
      const { user, token } = response.data;

      // Update Redux state
      dispatch(setUser({ user, token }));
      dispatch(setIsSignUp(false));
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      throw error;
    }
  };

  const logout = async () => {
    // Clear Redux state
    try {
      await axiosInstance.post("/users/signout", token);
      dispatch(resetUser());
      navigate("/auth");
    } catch (error) {
      console.error(
        "Unable to sign out:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <AuthContext.Provider value={{ login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
