import styled from "styled-components";
import axios from "axios";
// eslint-disable-next-line
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext.js";
import TokenContext from "../contexts/TokenContext.js";
import LogoutButton from "./../assets/logout.svg";
import Add from "./../assets/plus.svg";
import Subtract from "./../assets/minus.svg";

export default function WalletPage() {
    const { user } = useContext(UserContext);
    const { token } = useContext(TokenContext);
    const [transactions, setTransactions] = useState([]);
    // eslint-disable-next-line
    const [balance, setBalance] = useState(0);

    async function request(config) {
        try {
            const response = await axios.get("http://localhost:5000/user", config);
            console.log(response);

            const { movements } = response.data;
            const newBalance = response.data.balance;
            setTransactions(movements);
            setBalance(newBalance);

        } catch (e) {
            window.alert("Erro na obtenção dos dados.");
            console.log(e);
        }
    }

    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
        request(config);
        // eslint-disable-next-line
    }, []);

    function configNumber(num) {
        return num.toFixed(2).replace(".", ",");
    }

    function checkBalance(num){
        return num > 0 ? "positive" : "negative";
    }

    function renderTransactions() {

        return transactions.length > 0 ? (
            transactions.map(t => {
                const { type, value, description, date } = t;

                return (
                    <div className="transaction">
                        <div className="container-day-text">
                            <p className="day">{date}</p>
                            <p className="text">{description}</p>
                        </div>
                        <p className={type}>{configNumber(value)}</p>
                    </div>
                );
            })
        ) : (
            <p className="empty-transactions">
                Não há registros <br/> de entrada ou saída
            </p>
            
        );
    };

    return (
        <Div>
            <header>
                <p>Olá, {user}</p>
                <img src={LogoutButton} alt="Botão de logout" />
            </header>
            <div className="wallet-container">
                {renderTransactions()}
                <div className="balance-container">
                    <p>SALDO</p>
                    <p className={checkBalance(balance)}>{configNumber(balance)}</p>
                </div>
            </div>

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

    .wallet-container {
        background-color: white;
        width: 326px;
        height: 446px;
        background: #FFFFFF;
        border-radius: 5px;
        padding: 23px 15px 50px 15px;
        position: relative;
        overflow-y: auto;
        overflow-x: hidden;
       
    }

    .empty-transactions {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .empty-transactions p {
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        color: #868686;
    }

    .transaction {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: 15px;
    }
    
    .transaction .container-day-text {
        display: flex;
    }

    .transaction .day {
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #C6C6C6;
        margin-right: 10px;
    }

    .transaction .text {
        max-width: 160px;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #000000;
        display: flex;
        align-items: flex-start;
    }

    .transaction .in,
    .positive {
        color: #03AC00;
    }

    .transaction .out,
    .negative {
        color: #C70000;
    }

    .balance-container {
        background-color: white;
        position: absolute;
        z-index: 1;
        bottom: 0px;
        padding-bottom: 10px;
        padding-top: 10px;
        width: 296px;
        display: flex;
        justify-content: space-between;
    }

    .balance-container p:first-of-type {
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #000000;
    }

    .balance-container p:last-of-type {
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        text-align: right;
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