import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import TokenContext from "../contexts/TokenContext.js";

export default function TransactionInPage(){

    const { token } = useContext(TokenContext);

    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");

    async function request(config,body){
        try {
            await axios.post("http://localhost:5000/user", body, config);

            nextPage();
        } catch(e) {
            window.alert("Erro no registro da transação.");
            console.log(e);
        }
    }

    function addBalance(event){
        event.preventDefault();

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
        const formatedValue = parseFloat(value.replace(",","."));
        console.log(formatedValue);
        const body = {
            type: "in",
            value: formatedValue,
            description
        };
        request(config,body);
    }

    let navigate = useNavigate();
    function nextPage() {
        navigate("/wallet/");
    }

    return(
        <Div>
            <h1>Nova entrada</h1>
            <form onSubmit={addBalance}>
                <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Valor" required />
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição" required />
                <button type="submit">Salvar entrada</button>
            </form>
            <Link to="/wallet">
                <p>Voltar</p>
            </Link>
        </Div>
    );
}

const Div = styled.div`
    max-width: 375px; /*Iphone 8*/
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    padding: 25px 25px 0 25px;

    h1 {
        width: 100%;
        margin: 25px 0 40px 0;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
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