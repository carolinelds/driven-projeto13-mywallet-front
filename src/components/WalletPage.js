import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../contexts/UserContext.js";
import LogoutButton from "./../assets/logout.svg";
import Add from "./../assets/plus.svg";
import Subtract from "./../assets/minus.svg";

export default function WalletPage(){

    const { user } = useContext(UserContext);

    return (
        <Div>
            <header>
                <p>Olá, { user }</p>
                <img src={LogoutButton} alt="Botão de logout"/>
            </header>
            <section className="empty">
                <p>Não há registros de <br/>entrada ou saída</p>
            </section>
            <div className="buttons-container">
                <button>
                    <img src={Add} alt="Adicionar nova entrada" />
                    <p>Nova entrada</p>
                </button>
                <button>
                    <img src={Subtract} alt="Adicionar nova saída" />
                    <p>Nova saída</p>
                </button>
            </div>

        </Div>
    );
}

const Div = styled.div`
    max-width: 375px; /*Iphone 8*/
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 25px 25px 16px 25px;

    header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 22px;
    }

    header p {
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
    }

    section {
        background-color: white;
        width: 326px;
        height: 446px;
        background: #FFFFFF;
        border-radius: 5px;
        padding: 23px 15px 10px 15px;
    }

    section.empty {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    section > p {
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        color: #868686;
    }
    
    .buttons-container {
        margin-top: 13px;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .buttons-container button {
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 155px;
        height: 114px;
        background: #A328D6;
        border-radius: 5px;
        border-style: none;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #FFFFFF;
        opacity: 0.5;
        transition: all 0.3s;
    }

    .buttons-container button:hover {
        opacity: 1;
        transition: all 0.3s;
    }
`;