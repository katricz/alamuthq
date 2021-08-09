import Menu from '../components/Menu';
import Cabecalho from '../components/Cabecalho';
import Container from '@material-ui/core';

function HomePage() {
    return (
        <div>
            <Cabecalho />
            <Menu />
            <Container className='text-center'>
                <h1 className='display-4'> Welcome to Alamut Headquarters</h1>
                <p className='Lead'> Deckbuilding and Inventory</p>
            </Container>

        </div>
    )
}

export default HomePage
