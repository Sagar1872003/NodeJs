import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        let savedToken = JSON.parse(localStorage.getItem('userdata'))
        return {token:savedToken || null}
    }); 

    useEffect(() => {
        if (auth?.token) {
            localStorage.setItem('userdata', JSON.stringify(auth?.token)); 
        } 
    }, [auth?.token]);

    return (
        <AuthContext.Provider value={[auth, setAuth ]}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
