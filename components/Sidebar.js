import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { MemoryRouter } from 'react-router';

// Icones do awesomefont 
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);


function Sidebar(props) {
    const { icon, primary, to } = props;

    return (
        <li>
            <ListItem button component="a" href={to}>
                {icon ? <ListItemIcon> {icon} </ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

Sidebar.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
    root: {
        width: 360,
    },
});

export default function ListRouter() {
    const classes = useStyles();

    return (
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <div className={classes.root}>
                <Paper elevation={0}>
                    <List aria-label="main mailbox folders">
                        <Sidebar to="/" primary="Home" icon={<FontAwesomeIcon icon='home' width='18px' />} />
                        <Sidebar to="decks" primary="Decks" icon={<FontAwesomeIcon icon='journal-whills' width='18px' />} />
                        <Sidebar to="crypt" primary="Crypt" icon={<FontAwesomeIcon icon='user-ninja' width='18px' />} />
                        <Sidebar to="library" primary="Library" icon={<FontAwesomeIcon icon='jedi' width='18px' />} />
                    </List>
                    <Divider />
                    <List aria-label="main mailbox folders">
                        <Sidebar to="https://vtesdecks.com/" primary="VTES Decks" icon={<FontAwesomeIcon icon='fighter-jet' width='18px' />} />
                        <Sidebar to="https://amaranth.vtes.co.nz/" primary="Amaranth" icon={<FontAwesomeIcon icon='crop' width='18px' />} />
                        <Sidebar to="https://www.vekn.net/" primary="VEKN" icon={<FontAwesomeIcon icon='dungeon' width='18px' />} />
                        <Sidebar to="https://www.blackchantry.com/" primary="Black Chantry" icon={<FontAwesomeIcon icon='bolt' width='18px' />} />
                    </List>
                </Paper>
            </div>
        </MemoryRouter>
    );
}
