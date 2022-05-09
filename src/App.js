import "./css/reset.css";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import WalletPage from "./components/WalletPage";
import TokenContext from "./contexts/TokenContext";
import UserContext from "./contexts/UserContext";

export default function App() {

    const [token, setToken] = useState("");
    const [user, setUser] = useState("");

    return (
        <Div>
            <TokenContext.Provider value={{ token, setToken }}>
                <UserContext.Provider value={{ user, setUser }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<SignInPage />}></Route>
                            <Route path="/sign-up" element={<SignUpPage />}></Route>
                            <Route path="/wallet" element={<WalletPage />}></Route>
                        </Routes>
                    </BrowserRouter>
                </UserContext.Provider>
            </TokenContext.Provider>
        </Div >
    );
}

const Div = styled.div`
    background-color: #8C11BE;
    display: flex;
    justify-content: center;
    align-items: center;
    
    * {
        font-family: 'Raleway';
        box-sizing: border-box;
    }
`;