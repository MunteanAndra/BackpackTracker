import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {IconButton} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from "react-router-dom";

const SideMenu = (props) => {
    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let navigateToShowItems = useNavigate();
    let navigateToShowCorrectPosition = useNavigate();
    let navigateToShowLocation = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleItems = () => {
        navigateToShowItems('/Items');
    };

    const handlePressure = () => {
        navigateToShowCorrectPosition('/Position');
    };

    const handleLocation = () => {
        navigateToShowLocation('/ShowLocation');
    };

    const drawer = (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <List>
                <ListItem key={'Find location'} disablePadding>
                    <ListItemButton onClick={handleLocation}>
                        <ListItemText primary={'Find location'}/>
                    </ListItemButton>
                </ListItem>
                <ListItem key={'List of items'} disablePadding>
                    <ListItemButton onClick={handleItems}>
                        <ListItemText primary={'List of items'}/>
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Adjust straps'} disablePadding>
                    <ListItemButton onClick={handlePressure}>
                        <ListItemText primary={'Adjust straps'}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{mr: 2, display: {md: 'none'}}}
            >
                <MenuIcon style={{marginLeft: '1rem'}}/>
            </IconButton>
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: {xs: 'block', sm: 'block', md: 'none'},
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        height: 'calc(100vh - 20rem)',
                        width: '242px',
                        margin: '10rem 0rem',
                        borderRadius: '0rem 2rem 2rem 0rem',
                        border: '1px solid',
                        boxShadow: '0px 0px 65px -39px rgba(0,0,0,0.65)',
                        display: 'flex',
                        justifyContent: 'center',
                    },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: {xs: 'none', sm: 'none', md: 'block'},
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        height: 'calc(100vh - 20rem)',
                        width: '242px',
                        backgroundColor: 'transparent',
                        margin: '10rem 0rem',
                        borderRadius: '0rem 2rem 2rem 0rem',
                        border: '1px solid',
                        boxShadow: '0px 0px 65px -39px rgba(0,0,0,0.65)',
                        display: 'flex',
                        justifyContent: 'center',
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </>
    );
}

export default SideMenu;