import {Divider, Grid} from '@mui/material';
import {Footer} from "./Footer";
import blackBackpack from '../../images/yellowBackpack.jpeg';
import {BlackButton} from "./CustomButtons/BlackButton";
import {Navbar} from "./Navbar";

export const UnauthenticatedApp = () => {
    return (
        <>
            <Navbar />
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
                        <BlackButton>
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
                        <BlackButton>
                            SIGN UP
                        </BlackButton>
                    </div>
                </Grid>
                <Grid item xs={6} style={{display: 'flex', justifyContent: 'center'}}>
                    <img src={blackBackpack} style={{ width: '25rem'}} alt="backpack"/>
                </Grid>
            </Grid>
            <Divider
                style={{
                    width: '100%',
                    height: '2rem',
                    color: '#18191A',
                    padding: '2rem',
                }}
            />
            <Footer />
        </>
    );
};