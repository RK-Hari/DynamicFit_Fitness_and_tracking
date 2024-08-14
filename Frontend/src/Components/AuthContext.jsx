import React, { createContext, useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [user, setUser] = useState(null);

    const MySwal = withReactContent(Swal);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        MySwal.fire({
            title: "Login Successful!",
            text: 'Welcome back!',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
