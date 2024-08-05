import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authUser();
    }, []);

    const authUser = async () => {
        try {
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
            console.error(err)
        }
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;