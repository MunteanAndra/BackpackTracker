import logo from '../../images/logo.png';
import {useNavigate} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Divider, Menu, MenuItem} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {logout} from "../../firebase";
import {useState} from "react";

export const Navbar = () => {

    let navigateHome = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRedirectHome = () => {
        navigateHome('/');
    };

    const handleRedirectProfile = () => {
        navigateHome('/Profile');
    };

    return(
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: '2rem',
            }}
        >
            <img src={logo} alt="logo" onClick={handleRedirectHome}/>
            <AccountCircleIcon
                fontSize='large'
                onClick={handleClick}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            />
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleRedirectProfile}>
                     Profile
                </MenuItem>
                <Divider />
                <MenuItem>
                    <SettingsIcon fontSize="small" style={{ marginRight: '1rem' }}/>
                    Settings
                </MenuItem>
                <MenuItem onClick={logout}>
                    <LogoutIcon fontSize="small" style={{ marginRight: '1rem' }}/>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
};