import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from "./authApi";
import localStorageAdapter from "../../adapters/localStorageAdapter";
import Login from "./Login";

export const AuthContext = React.createContext('');

function AuthProvider({children}) {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorageAdapter.getItem('token'));
    // const [isLoadingToken, setIsLoadingToken] = useState(false)

    useEffect(() => {
        if (token !== null) return;
        if(window.location !== '/login') navigate('/login');
    }, [])

    const login = (email, password) => {
        authApi.login(email, password)
            .then(({data}) => {
                const token = data?.token;
                console.log(token)
                localStorageAdapter.removeItem('token');
                localStorageAdapter.setItem('token', token);
                setToken(token);
                navigate('/');
            })
            .catch(e => {
                console.error(e)
            })
    };

    const signIn = (email, password) => {
        authApi.signIn(email, password)
            .then(({data}) => {
                const token = data?.token;
                localStorageAdapter.removeItem('token');
                localStorageAdapter.setItem('token', token);
                setToken(token);
                navigate('/');
            })
            .catch(e => {
                console.error(e)
            })
    };

    const logout = () => {
        localStorageAdapter.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{token, login, signIn, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
