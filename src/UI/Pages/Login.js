import {Alert, Collapse, Grid, Hidden, TextField} from "@mui/material";
import {BlackButton} from "../Components/CustomButtons/BlackButton";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {auth} from "../../firebase";
import loginBackpack from "../../images/login_backpack.png";
import yellowBackpack from "../../images/yellowBackpack.jpg";
import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";
import {loginFromRedux} from "../../store/Auth";
import {useDispatch} from "react-redux";

export const Login = () => {
    let navigateAuthHome = useNavigate();
    const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = useState('+40');
    const [verificationCode, setVerificationCode] = useState('');
    const [show, setShow] = useState(false);
    const [openAlertCode, setOpenAlertCode] = useState(false);

    const handleRedirectAuthHome = () => {
        navigateAuthHome('/');
    };

    const handleNumberChange = (event) => {
        event.preventDefault();
        setPhoneNumber(event.target.value);
    };

    const handleCodeChange = (event) => {
        event.preventDefault();
        setVerificationCode(event.target.value);
    };

    const generateReCaptcha = () => {
        const recaptchaContainer = document.getElementById('recaptcha-container');
        window.recaptchaVerifier = new RecaptchaVerifier(recaptchaContainer, {
            size: 'invisible',
            callback: () => {
                onLogInSubmit();
                console.log("reCAPTCHA verified");
            },
        }, auth);
    };

    const onLogInSubmit = () => {
        generateReCaptcha();
        console.log(phoneNumber);
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                setShow(true);
                console.log("Code has been sent");
            }).catch((error) => {
                console.log(error, "SMS not sent");
        });
    };

    const onSubmitOTP = () => {
        window.confirmationResult.confirm(verificationCode).then(() => {
            handleRedirectAuthHome();
            dispatch(loginFromRedux(true));
            localStorage.setItem("token", "1234567");
        }).catch((error) => {
            setOpenAlertCode(true);
            console.log(error, "User couldn't sign in");
        });
    };

    return (
        <>

            <Grid container justifyContent="center">
                <Hidden only={['xs','sm']}>
                    <Grid
                        item
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
                            <img src={yellowBackpack} alt="yellowBackpack" width="100%"/>
                        </div>
                    </Grid>
                </Hidden>
                <Hidden only={['md','lg','xl']}>
                    <Grid
                        item
                        xs={12} md={6}
                        style={{
                            width: '20rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '2rem',
                        }}
                    >
                        <img src={loginBackpack} alt="loginBackpack" width="40%"/>
                    </Grid>
                </Hidden>
                <Grid
                    item
                    xs={12}
                    md={6}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div style={{fontWeight: '500', fontSize: '1.5rem'}}>
                        Welcome!
                    </div>
                    <div id="recaptcha-container"></div>
                    {show ? (
                        <>
                            <div style={{padding: '1.5rem 0rem'}}>
                                <TextField
                                    id="outlined-basic"
                                    label="Enter verification code"
                                    variant="outlined"
                                    value={verificationCode}
                                    onChange={handleCodeChange}
                                    style={{minWidth: '15rem'}}
                                />
                            </div>
                            <BlackButton onClick={onSubmitOTP} disabled={!verificationCode} style={{ marginBottom: '2rem' }}>
                                Log in
                            </BlackButton>
                            <Collapse in={openAlertCode}>
                                <Alert severity="warning"> Verification code is incorrect </Alert>
                            </Collapse>
                        </>
                    ) : (
                        <>
                            <div style={{padding: '1.5rem 0rem'}}>
                                <TextField
                                    id="outlined-basic"
                                    label="Enter your phone number"
                                    variant="outlined"
                                    value={phoneNumber}
                                    onChange={handleNumberChange}
                                    style={{minWidth: '15rem'}}
                                />
                            </div>
                            <BlackButton onClick={onLogInSubmit}>
                                Send message
                            </BlackButton>
                        </>
                    )}
                </Grid>
            </Grid>
        </>
    );
};
