import Menu from '../components/Menu';
import axios from 'axios';
import { Container } from 'reactstrap';

const Sobre = (data) => (
    <div>
        <Menu />
        <div className="head-sobre">
            <style>{`.head-sobre{
                    padding-top: 80px;
                    padding-bottom: 80px;
                    background-color: #000;
                    color: #fff;
                    margin-bottom: 0rem !important;
                }`}</style>
            <Container>
                <div className="text-center">
                    <h1 className='display-4'>Sobre a Empresa</h1>
                </div>
            </Container>
        </div>

        <div className="sobre">
            <style>{`.sobre{
                padding-top: 80px;
                padding-bottom: 80px;
                background-color: #fff;
                margin-bottom: 0rem !important;
            }
            .featurette-divider {
                margin: 5rem 0; 
              }`}</style>
            <Container>
                <div>
                    {data.response.map(sobre => (
                        <div key={sobre.id}>
                            <div className="row featurette">
                                <div className="col-md-7 order-md-2">
                                    <h2 className="featurette-heading">{sobre._name} </h2>
                                    <p className="lead">{sobre.card_text}</p>
                                </div>
                                <div className="col-md-5 order-md-1">
                                    <img src={sobre.url} className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="350" height="350" />
                                </div>
                            </div>

                            <hr className="featurette-divider"></hr>
                        </div>
                    ))}

                </div>
            </Container>
        </div>

    </div>
);

Sobre.getInitialProps = async () => {
    var response = await axios.get('https://static.krcg.org/data/vtes.json');
    return { response: response.data }
}

export default Sobre
