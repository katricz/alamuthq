import React from 'react';
import NextLink from 'next/link'
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
    const { icon, primary, to, newtab } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <li>
                <NextLink href={to} passHref>
                    <ListItem button component={"a"} target={newtab}>
                        {icon ? <ListItemIcon> {icon} </ListItemIcon> : null}
                        <ListItemText primary={primary} />
                    </ListItem>
                </NextLink>
            </li>
        </div>
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
                    <List component="nav">
                        <Sidebar to="/" primary="Home" icon={<FontAwesomeIcon icon='home' />} />
                        <Sidebar to="decks" primary="Decks" icon={<FontAwesomeIcon icon='journal-whills' />} />
                        <Sidebar to="crypt" primary="Crypt" icon={<FontAwesomeIcon icon='user-ninja' />} />
                        <Sidebar to="library" primary="Library" icon={<FontAwesomeIcon icon='jedi' />} />
                        <Sidebar to="inventory" primary="Inventory" icon={<FontAwesomeIcon icon='warehouse' />} />
                    </List>
                    <Divider />
                    <List component="nav">
                        <Sidebar
                            newtab="_blank"
                            to="https://vtesdecks.com/"
                            primary="VTES Decks"
                            icon={<FontAwesomeIcon icon='fighter-jet' />} />
                        <Sidebar
                            newtab="_blank"
                            to="https://amaranth.vtes.co.nz/"
                            primary="Amaranth"
                            icon={<FontAwesomeIcon icon='crop' />} />
                        <Sidebar
                            newtab="_blank"
                            to="https://www.vekn.net/"
                            primary="VEKN"
                            icon={<FontAwesomeIcon icon='dungeon' />} />
                        <Sidebar
                            newtab="_blank"
                            to="https://www.blackchantry.com/"
                            primary="Black Chantry"
                            icon={<FontAwesomeIcon icon='bolt' />} />
                    </List>
                </Paper>
            </div>
        </MemoryRouter>
    );
}
