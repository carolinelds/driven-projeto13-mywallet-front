import styled from "styled-components";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import TokenContext from "../contexts/TokenContext.js";

export default function SignInPage() {

    const { setToken } = useContext(TokenContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function login(event) {
        event.preventDefault();
        setLoading(true);

        const body = {
            email,
            password
        };

        try {
            const response = await axios.post("http://localhost:5000/sign-in", body);
            console.log(response);

            const newToken = response.data;
            setToken(newToken);

            nextPage();

        } catch (e) {
            window.alert("Usuário ou senha inválido(s), tente novamente.");
            console.log(e);
            setLoading(false);
        }
    };

    let navigate = useNavigate();

    function nextPage() {
        navigate("/wallet");
    }

    return !loading ? (
        <Div>
            <h1>MyWallet</h1>
            <form onSubmit={login}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" required />
                <button type="submit">Entrar</button>
            </form>
            <Link to="/sign-up">
                <p>Primeira vez? Cadastre-se!</p>
            </Link>
        </Div>
    ) : (
        <Div>
            <h1>MyWallet</h1>
            <form onSubmit={login}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" disabled />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" disabled />
                <button type="submit" className="loading" disabled>
                    <ThreeDots color="#FFFFFF" height={50} width={50} />
                </button>
            </form>
            <Link to="/sign-up">
                <p>Primeira vez? Cadastre-se!</p>
            </Link>
        </Div>
    );
}

const Div = styled.div`
    max-width: 375px; /*Iphone 8*/
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    
    h1 {
        margin: 159px 0 24px 0;
        font-family: 'Saira Stencil One';
        font-weight: 400;
        font-size: 32px;
        line-height: 50px;
        color: #FFFFFF;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input {
        width: 326px;
        height: 58px;
        background: #FFFFFF;
        border-radius: 5px;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
        padding: 15px;
        margin-bottom: 13px;
        border-style: none;
    }

    button {
        margin-bottom: 36px;
        width: 326px;
        height: 46px;
        background: #A328D6;
        border-radius: 5px;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        color: #FFFFFF;
        border-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    p {
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        color: #FFFFFF;
    }

    .loading {
        opacity: 0.5;
    }
    
`;