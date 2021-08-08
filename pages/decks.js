import Menu from "../components/Menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cabecalho from "../components/Cabecalho";
import React from 'react';
import { Table } from 'reactstrap';

function Decks() {
    return (
        <div>
            <Cabecalho />
            <Menu />
            <div>
                Welcome to AlamutHQ
                <br />
                This is where your decks will be
                <br />
            </div>
            <UserDecks />

        </div>
    )
}

export default Decks




const UserDecks = (props) => {
    return (
        <Table hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </Table>
    );
}