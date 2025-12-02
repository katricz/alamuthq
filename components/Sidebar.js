import React from 'react';
import NextLink from 'next/link'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

// Ícones do MUI
import HomeIcon from '@mui/icons-material/Home';
import LayersIcon from '@mui/icons-material/Layers';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InventoryIcon from '@mui/icons-material/Inventory';
import FlightIcon from '@mui/icons-material/Flight';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import TowerIcon from '@mui/icons-material/CellTower';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';


const Root = styled('div')({
    width: 360,
});

function Sidebar(props) {
    const { icon, primary, to, newtab } = props;

    return (
        <NextLink href={to} target={newtab}>
            <ListItem component="li" sx={{ cursor: 'pointer' }}>
                {icon ? <ListItemIcon> {icon} </ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </NextLink>
    );
}

Sidebar.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

export default function ListRouter() {
    return (
        <Root>
            <Paper elevation={0}>
                <List component="nav">
                    <Sidebar to="/" primary="Home" icon={<HomeIcon />} />
                    <Sidebar to="/decks" primary="Decks" icon={<LayersIcon />} />
                    <Sidebar to="/crypt" primary="Crypt" icon={<PersonIcon />} />
                    <Sidebar to="/library" primary="Library" icon={<MenuBookIcon />} />
                    <Sidebar to="/inventory" primary="Inventory" icon={<InventoryIcon />} />
                </List>
                <Divider />
                <List component="nav">
                    <Sidebar
                        newtab="_blank"
                        to="https://vtesdecks.com/"
                        primary="VTES Decks"
                        icon={<FlightIcon />} />
                    <Sidebar
                        newtab="_blank"
                        to="https://amaranth.vtes.co.nz/"
                        primary="Amaranth"
                        icon={<LocalFloristIcon />} />
                    <Sidebar
                        newtab="_blank"
                        to="https://www.vekn.net/"
                        primary="VEKN"
                        icon={<TowerIcon />} />
                    <Sidebar
                        newtab="_blank"
                        to="https://www.blackchantry.com/"
                        primary="Black Chantry"
                        icon={<AutoAwesomeIcon />} />
                </List>
            </Paper>
        </Root>
    );
}
