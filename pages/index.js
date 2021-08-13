import React from 'react';
import axios from 'axios';
import Menu from '../components/Menu';
import Cabecalho from '../components/Cabecalho';

const Home = (data) => (
    <div className='Main'>
        <Cabecalho />
        <Menu />
        {console.log(data)};
        <h1>{data.response._name}</h1>
        <br /><br /><br /><br />
        <div className='Imagem'>
             <img src={data.response.url} />
        </div>
        

    </div>

);

Home.getInitialProps = async () => {
    var response = await axios.get('https://api.krcg.org/card/alamut');
    return { response: response.data }
}




export default Home
