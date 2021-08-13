import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Typography from '@material-ui/core/Typography';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

// Icones do awesomefont 
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);


function Botoes(props) {
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

Botoes.propTypes = {
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
        <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
            <div className={classes.root}>
                <Paper elevation={0}>
                    <List aria-label="main mailbox folders">
                        <Botoes to="/" primary="Home" icon={<FontAwesomeIcon icon='home' width='18px' />} />
                        <Botoes to="decks" primary="Decks" icon={<FontAwesomeIcon icon='journal-whills' width='18px' />} />
                        <Botoes to="crypt" primary="Crypt" icon={<FontAwesomeIcon icon='user-ninja' width='18px' />} />
                        <Botoes to="library" primary="Library" icon={<FontAwesomeIcon icon='jedi' width='18px' />} />
                    </List>
                    <Divider />
                    <List aria-label="main mailbox folders">
                        <Botoes to="https://vtesdecks.com/" primary="VTES Decks" icon={<FontAwesomeIcon icon='fighter-jet' width='18px' />} />
                        <Botoes to="https://amaranth.vtes.co.nz/" primary="Amaranth" icon={<FontAwesomeIcon icon='crop' width='18px' />} />
                        <Botoes to="https://www.vekn.net/" primary="VEKN" icon={<FontAwesomeIcon icon='dungeon' width='18px' />} />
                        <Botoes to="https://www.blackchantry.com/" primary="Black Chantry" icon={<FontAwesomeIcon icon='bolt' width='18px' />} />
                    </List>
                </Paper>
            </div>
        </MemoryRouter>
    );
}
