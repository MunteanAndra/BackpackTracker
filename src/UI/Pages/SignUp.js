import {Grid, TextField} from "@mui/material";
import {BlackButton} from "../Components/CustomButtons/BlackButton";
import yellowBackpack from "../../images/yellowBackpack.jpg";
import {useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {Link} from "react-router-dom";
import {auth, registerWithEmailAndPassword} from "../../firebase";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {loginFromRedux} from "../../store/Auth";

export const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);

    let navigateAuthHome = useNavigate();
    const dispatch = useDispatch();

    const handleRedirectAuthHome = () => {
        navigateAuthHome('/');
    };

    const validatePassword = () => {
        let isValid = false
        if (password !== '' && email !== '' && name !== ''){
            isValid = true;
        } else {
            alert('Please complete all the fields');
        }
        return isValid;
    }

    const register = () => {
        if(validatePassword() === true) {
            registerWithEmailAndPassword(name, email, password);
            dispatch(loginFromRedux());
        }
    };

    useEffect(() => {
        if (loading) return;
        if (user) handleRedirectAuthHome();
    }, [user, loading]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return(
        <>
            <Grid container style={{paddingTop: '5rem'}}>
                <Grid item xs={6} style={{ width: '20rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <Grid item xs={6} style={{ width: '20rem' }}>
                        <div>
                            <img src={yellowBackpack} alt="yellowBackpack" width="100%"/>
                        </div>
                    </Grid>
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
                    <div style={{ fontWeight: '500', fontSize: '1.5rem' }}>
                        Happy to register you
                    </div>
                    <div style={{ padding: '1rem 0rem 0rem 0rem'}}>
                        <TextField
                            id="outlined-basic"
                            label="Enter your name"
                            variant="outlined"
                            style={{minWidth: '15rem'}}
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div style={{ padding: '1rem 0rem'}}>
                        <TextField
                            id="outlined-basic"
                            label="Enter your email address"
                            variant="outlined"
                            style={{minWidth: '15rem'}}
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div style={{ padding: '0rem 0rem 1rem 0rem' }}>
                        <div>
                            <TextField
                                id="outlined-basic"
                                label="Enter your password"
                                variant="outlined"
                                type="password"
                                style={{minWidth: '15rem'}}
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div style={{ fontSize: '1rem', color: '#030303', fontWeight: '400', textAlign: 'right' }}>
                            *password must be at least<br />6 characters long
                        </div>
                    </div>
                    <BlackButton onClick={register}>
                        Sign up
                    </BlackButton>
                    <div style={{paddingTop: '3rem'}}>
                        Already have an account? <Link to="/Login">Login</Link> now.
                    </div>
                </Grid>
            </Grid>
        </>
    );
};