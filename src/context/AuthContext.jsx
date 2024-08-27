import React, { useState, useEffect, createContext } from "react";
import { VerifySession } from "../services/VerifySession";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    try {
      const sessionValid = await VerifySession();

      if (!sessionValid) {
        setLoading(false);
        navigate("/login");
        return;
      }

      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      const userObject = JSON.parse(user);

      if (!token || !user) {
        setLoading(false);
        return false;
      }

      setAuth(userObject);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
