import styled from "styled-components";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUpPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function signUp(event) {
        event.preventDefault();
        setLoading(true);

        if (password !== repeatedPassword) {
            window.alert("As senhas não correspondem. Tente novamente.")
            setLoading(false);
            return;
        }

        const body = {
            name,
            email,
            password
        };

        try {
            const response = await axios.post("http://localhost:5000/sign-up", body);
            console.log(response);

            nextPage();
        } catch (e) {
            window.alert("Erro no cadastro, tente novamente.");
            console.log(e);
            setLoading(false);
        }
    };

    let navigate = useNavigate();
    function nextPage() {
        navigate("/");
    }

    return !loading ? (
        <Div>
            <h1>MyWallet</h1>
            <form onSubmit={signUp}>
                <input type="name" value={name} onChange={e => setName(e.target.value)} placeholder="Nome" required />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" required />
                <input type="password" value={repeatedPassword} onChange={e => setRepeatedPassword(e.target.value)} placeholder="Confirme a senha" required />
                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/">
                <p>Já tem uma conta? Entre agora!</p>
            </Link>
        </Div>
    ) : (
        <Div>
            <h1>MyWallet</h1>
            <form onSubmit={signUp}>
                <input type="name" value={name} onChange={e => setName(e.target.value)} placeholder="Nome" disabled />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" disabled />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" disabled />
                <input type="password" value={repeatedPassword} onChange={e => setRepeatedPassword(e.target.value)} placeholder="Confirme a senha" disabled />
                <button type="submit" className="loading" disabled>
                    <ThreeDots color="#FFFFFF" height={50} width={50} />
                </button>
            </form>
            <Link to="/">
                <p>Já tem uma conta? Entre agora!</p>
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
        margin: 95px 0 28px 0;
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