import {Divider, Grid, TextField} from "@mui/material";
import {BlackButton} from "../Components/CustomButtons/BlackButton";
import yellowBackpack from "../../images/yellowBackpack.jpg";

export const SignUp = () => {
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
                        <TextField id="outlined-basic" label="Enter your name" variant="outlined" style={{minWidth: '15rem'}}/>
                    </div>
                    <div style={{ padding: '1rem 0rem'}}>
                        <TextField id="outlined-basic" label="Enter your email address" variant="outlined" style={{minWidth: '15rem'}}/>
                    </div>
                    <div style={{ padding: '0rem 0rem 1rem 0rem' }}>
                        <div>
                            <TextField id="outlined-basic" label="Enter your password" variant="outlined" type="password" style={{minWidth: '15rem'}}/>
                        </div>
                        <div style={{ fontSize: '1rem', color: '#030303', fontWeight: '400', textAlign: 'right' }}>
                            *password must be at least<br />6 characters long
                        </div>
                    </div>
                    <BlackButton>
                        Sign up
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