import Menu from "../components/Menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cabecalho from "../components/Cabecalho";

function Library() {
    return (
        <div>
            <Cabecalho />
            <Menu />
            Welcome to AlamutHQ       
        <a href='/'> HomePage </a>
        </div>
    )
}

export default Library
