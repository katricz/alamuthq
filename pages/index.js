import Menu from "../components/Menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cabecalho from "../components/Cabecalho";
import Head from "next/head";

function HomePage() {
    return (
        <div>
            <Cabecalho />
            <Menu />
            Welcome to AlamutHQ
            <a href='/crypt'> Crypt </a>
        </div>
    )
}

export default HomePage
