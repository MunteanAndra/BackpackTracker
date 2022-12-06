import {Divider, Grid, TextField} from "@mui/material";
import mobileGoogleMaps from '../../images/mobileGoogleMaps.jpg';
import desktopGoogleMaps from '../../images/desktopGoogleMaps.jpg';
import {BlackButton} from "../Components/CustomButtons/BlackButton";

export const Login = () => {
    return(
        <>
            <Grid container>
                <Grid item xs={6} style={{ width: '20rem' }}>
                    {/* <div style={{ width: '20rem' }}>
                        <img src={desktopGoogleMaps} alt="desktopMaps" size="small"/>
                    </div>
                    <div style={{ width: '20rem' }}>
                        <img src={mobileGoogleMaps} alt="MobileMaps" size="small" />
                    </div>*/}
                </Grid>
                <Grid item
                      xs={6}
                      style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                      }}
                >
                    <div style={{ fontWeight: '500', fontSize: '1rem' }}>
                        Welcome Back
                    </div>
                    <div style={{ padding: '1rem 0rem 0rem 0rem' }}>
                        <TextField id="outlined-basic" label="Enter your email address" variant="outlined" style={{width: 'fit-content'}}/>
                    </div>
                    <div style={{ padding: '1rem 0rem' }}>
                        <TextField id="outlined-basic" label="Enter your password" variant="outlined" />
                    </div>
                    <BlackButton>
                        Log in
                    </BlackButton>
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
        </>
    );
};