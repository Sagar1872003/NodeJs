import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        let savedToken = localStorage.getItem("token");
        return {token : savedToken || null}
    });

    useEffect(() => {
        if (auth?.token) {
            localStorage.setItem("token", JSON.stringify(auth.token)); 
        } 
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
