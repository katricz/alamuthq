
import React from 'react';
import { FixedSizeList } from 'react-window';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Container } from '@material-ui/core';
//import krcgCrypt from '../moch/krcgCrypt';
import TextField from '@material-ui/core/TextField';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const krcgCrypt = require('../moch/krcgCrypt.json')
export default function Crypt() {
    return (
        <div className="table-responsive">
            <Container>
                <TextField id="standard-search" label="Find the Evil One" type="search"  filter={textFilter()}/>
                <FixedSizeList
                    height={400} itemSize={46} itemCount={10}
                    children={CryptList}
                >
                </FixedSizeList>
            
            </Container>
        </div>
    );
}

function CryptList() {
    return (
        <div>
            {krcgCrypt.map((cryptCard) => (
                <ListItem button key={cryptCard.id} component={"a"} href={cryptCard.url} >
                    <ListItemAvatar>
                        <Avatar src={cryptCard.url} />
                    </ListItemAvatar>
                    <ListItemText primary={cryptCard._name} />
                </ListItem>
            ))
            }
        </div>
    )
}



