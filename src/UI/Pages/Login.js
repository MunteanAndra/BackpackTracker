import {Grid, Link, TextField} from "@mui/material";
import mobileGoogleMaps from '../../images/mobileGoogleMaps.jpg';
import {BlackButton} from "../Components/CustomButtons/BlackButton";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {auth, logInWithEmailAndPassword} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useDispatch} from "react-redux";
import {loginFromRedux} from "../../store/Auth";

export const Login = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    let navigateAuthHome = useNavigate();

    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) handleRedirectAuthHome();
    }, [user, loading]);

    const handleRedirectAuthHome = () => {
        navigateAuthHome('/');
    };

    const handleEmailChange = (event) => {
       setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        logInWithEmailAndPassword(email,password);
        dispatch(loginFromRedux());
        navigateAuthHome('/');
    }

    return (
        <>
            <Grid container>
                <Grid item
                      xs={6}
                      style={{
                          width: '20rem',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                      }}
                >
                    <div style={{paddingLeft: '2rem'}}>
                        <img src={mobileGoogleMaps} alt="MobileMaps" width="100%"/>
                    </div>
                </Grid>
                <Grid item
                      xs={6}
                      style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                      }}
                >
                    <div style={{fontWeight: '500', fontSize: '1.5rem'}}>
                        Welcome Back
                    </div>
                    <div style={{padding: '1rem 0rem 0rem 0rem'}}>
                        <TextField
                            id="outlined-basic"
                            label="Enter your email address"
                            variant="outlined"
                            value={email}
                            onChange={handleEmailChange}
                            style={{minWidth: '15rem'}}
                        />
                    </div>
                    <div style={{padding: '1rem 0rem'}}>
                        <TextField
                            id="outlined-basic"
                            label="Enter your password"
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            style={{minWidth: '15rem'}}
                        />
                    </div>
                    <BlackButton onClick={handleLogin}>
                        Log in
                    </BlackButton>
                    <div style={{paddingTop: '1rem'}}>
                        Don't have an account? <Link to="/SignUp">Register</Link> now.
                    </div>
                </Grid>
            </Grid>
        </>
    );
};