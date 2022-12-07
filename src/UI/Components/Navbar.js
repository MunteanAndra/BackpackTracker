import logo from '../../images/logo.png';
import {useNavigate} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Navbar = () => {

    let navigateHome = useNavigate();

    const handleRedirectHome = () => {
        navigateHome('/');
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
            <AccountCircleIcon  fontSize='large'/>
        </div>
    );
};