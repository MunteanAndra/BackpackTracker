import logo from '../../images/logo.png';
import {useNavigate} from "react-router-dom";

export const Navbar = () => {

    let navigateHome = useNavigate();

    const handleRedirectHome = () => {
        navigateHome('/');
    };

    return(
        <div>
            <img src={logo} alt="logo" onClick={handleRedirectHome}/>
        </div>
    );
};