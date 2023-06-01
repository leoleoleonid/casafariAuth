import {BrowserRouter, Route, Routes} from "react-router-dom";
import {NavBar} from "./components/NavBar";
import React from "react";
import AuthProvider from "./components/Auth/AuthProvider";
import Profile from "./pages/Profile";
import Login from "./components/Auth/Login";
import SignIn from "./components/Auth/SignIn";


function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <NavBar/>
                <Routes>
                    <Route exact path="/" element={<Profile/>}/>
                    <Route exact path="/profile" element={<Profile/>}/>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path="/sign-in" element={<SignIn/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App;
