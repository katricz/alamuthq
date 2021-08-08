import Menu from "../components/Menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cabecalho from "../components/Cabecalho";

function Crypt() {
    return (
        <div>
            <Cabecalho />
            <Menu />
            Welcome to AlamutHQ <br />
            <a href='/'> HomePage </a>
        </div>
    )
}

export default Crypt