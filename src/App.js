import "./css/reset.css";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import TokenContext from "./contexts/TokenContext";

export default function App() {

    const [token, setToken] = useState("");

    return (
        <Div>
            <TokenContext.Provider value={{ token, setToken }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignInPage />}></Route>
                        <Route path="/sign-up" element={<SignUpPage />}></Route>
                    </Routes>
                </BrowserRouter>
            </TokenContext.Provider>
        </Div>
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