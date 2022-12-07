import {Divider, Grid, TextField} from "@mui/material";
import mobileGoogleMaps from '../../images/mobileGoogleMaps.jpg';
import {BlackButton} from "../Components/CustomButtons/BlackButton";

export const Login = () => {
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
                        <TextField id="outlined-basic" label="Enter your email address" variant="outlined"
                                   style={{minWidth: '15rem'}}/>
                    </div>
                    <div style={{padding: '1rem 0rem'}}>
                        <TextField id="outlined-basic" label="Enter your password" variant="outlined" type="password"
                                   style={{minWidth: '15rem'}}/>
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
                    padding: '2rem 0rem',
                }}
            />
        </>
    );
};