import React from 'react';
import { FixedSizeList } from 'react-window';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Container } from '@material-ui/core';
//import krcgCrypt from '../moch/krcgCrypt';
import TextField from '@material-ui/core/TextField';

import ListItemSecondaryAction from '@mui/core'

const krcgCrypt = require('../moch/krcgCrypt.json')
export default function Crypt() {
    return (
        <div className="table-responsive">
            <Container>
                <TextField id="standard-search" label="Find the Evil One" type="search" />
                <FixedSizeList
                    height={380}
                    itemCount={krcgCrypt.length}
                    itemSize={35}
                    width="100%"
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
                <ListItem
                    button
                    key={cryptCard.id}
                    component={"a"}
                >
                    <ListItemAvatar>
                        <Avatar src={cryptCard.url} />
                    </ListItemAvatar>

                    <ListItemText
                        primary={cryptCard._name }
                        secondary={cryptCard.disciplines.map((disciplineIcon) => (
                            <i>{disciplineIcon[0]}</i>
                        ))} 
                    />
                </ListItem>
            ))
            }
        </div>
    )
}


//href={cryptCard.url} 
