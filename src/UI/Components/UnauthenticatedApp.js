import {Grid} from '@mui/material';
import blackBackpack from '../../images/blackBackpack.jpg';
import {BlackButton} from "./CustomButtons/BlackButton";
import {useNavigate} from 'react-router-dom';

export const UnauthenticatedApp = () => {

    let navigateToLogin = useNavigate();
    let navigateToSignUp = useNavigate();

    const handleLogin = () => {
        navigateToLogin('/Login');
    }

    const handleSignUp = () => {
        navigateToSignUp('/SignUp');
    }

    return (
        <>
            <Grid
                container
                style={{
                    paddingTop: '5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Grid item
                      xs={6}
                      style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          paddingLeft: '7rem',
                          textAlign: 'right',
                      }}
                >
                    <div
                        style={{
                            fontStyle: 'normal',
                            fontSize: '3.5rem',
                            fontWeight: '500',
                            paddingBottom: '2rem',
                        }}
                    >
                        Find your backpack on our map
                    </div>
                    <div
                        style={{
                            fontStyle: 'normal',
                            fontSize: '2rem',
                            fontWeight: '500',
                            paddingBottom: '2.5rem',
                        }}
                    >
                        Get notified if your backpack is moving without you
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <BlackButton
                            onClick={handleLogin}
                        >
                            LOGIN
                        </BlackButton>
                        <div
                            style={{
                                fontStyle: 'normal',
                                fontSize: '1rem',
                                fontWeight: '700',
                                padding: '0rem 1rem',
                            }}
                        >
                            OR
                        </div>
                        <BlackButton
                            onClick={handleSignUp}
                        >
                            SIGN UP
                        </BlackButton>
                    </div>
                </Grid>
                <Grid item xs={6} style={{display: 'flex', justifyContent: 'center'}}>
                    <img src={blackBackpack} style={{ width: '22.5rem'}} alt="backpack"/>
                </Grid>
            </Grid>
        </>
    );
};