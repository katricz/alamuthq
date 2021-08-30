
import React from 'react';
import { FixedSizeList } from 'react-window';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Container } from '@material-ui/core';
import krcgCrypt from '../moch/krcgCrypt';
import TextField from '@material-ui/core/TextField';


export default function Crypt() {
    return (
        <div className="table-responsive">

            <Container>
                <TextField id="standard-search" label="Search field" type="search" />
                <FixedSizeList
                    height={400} itemSize={46} itemCount={10}
                    children={CryptList}
                />
            </Container>
        </div>
    );
}


function CryptList() {
    return (
        <div>
            {krcgCrypt.map((cardName) => (
                <ListItem button key={cardName} component={"a"} href="/" >
                    <ListItemAvatar>
                        <Avatar src="https://static.krcg.org/card/aabbtkindred.jpg" />
                    </ListItemAvatar>
                    <ListItemText primary={cardName} />
                </ListItem>
            ))
            }
        </div>
    )
}

