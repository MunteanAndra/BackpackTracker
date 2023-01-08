import {Grid, TextField} from "@mui/material";
import mobileGoogleMaps from '../../images/mobileGoogleMaps.jpg';
import {BlackButton} from "../Components/CustomButtons/BlackButton";
import {useNavigate} from "react-router-dom";

export const Login = () => {

    let navigateAuthHome = useNavigate();

    const handleRedirectAuthHome = () => {
        navigateAuthHome('/AuthenticatedApp');
    };

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
                    <BlackButton onClick={handleRedirectAuthHome}>
                        Log in
                    </BlackButton>
                </Grid>
            </Grid>
        </>
    );
};