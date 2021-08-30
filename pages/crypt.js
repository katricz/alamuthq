import React from 'react';
import { FixedSizeList } from 'react-window';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Container } from '@material-ui/core';
import krcgCrypt from '../moch/krcgCrypt';

// Icones do awesomefont 
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

/*
export default function Crypt() {
    return (
        <div>
            <Container>
                <FixedSizeList height={400} width={300} itemSize={46} itemCount={200}>
                    {krcgCrypt.map((cardName) => (
                        <CryptList to="/" primary={cardName} icon={<FontAwesomeIcon icon='home' />} />
                    ))}
                </FixedSizeList>
            </Container>
        </div>
    );
}

function CryptList(props) {
    const { icon, primary, to, newtab } = props;
  
    return (
        <ListItem button component={"a"} href={to} target={newtab}>
            {icon ? <ListItemIcon> {icon} </ListItemIcon> : null}
            <ListItemText primary={primary} />
        </ListItem>
        );
}
*/


export default function Crypt() {
    return (
        <div className="table-responsive">

            <Container>
                <FixedSizeList
                    height={400} itemSize={46} itemCount={200}
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
                <ListItem button key={cardName} component={"a"} to="/" icon={<FontAwesomeIcon icon='home' />} >
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="https://static.krcg.org/card/aabbtkindred.jpg" />
                    </ListItemAvatar>
                    <ListItemText primary={cardName} />
                </ListItem>
            ))
            }
        </div >
    )
}

