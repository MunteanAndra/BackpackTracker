import {Box, Grid} from "@mui/material";
import pinIcon from "../../images/pinIcon.png";
import {BlackButton} from "../Components/CustomButtons/BlackButton";
import {LocationHandler} from "../Components/LocationHandler";

export const ShowLocation = () => {
    return (
        <Grid container>
            <Grid item xs={4}>
                <Grid item
                      xs={12}
                      style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingTop: '3rem',
                      }}
                >
                    <Box border={1} style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                        width: '40%',
                        borderRadius: '4rem'
                    }}>
                        <img src={pinIcon} alt="PinIcon" width="13%"/>
                        <div style={{padding: '0rem 1rem', fontSize: '1.5rem', fontWeight: '500'}}>BackPack1</div>
                    </Box>
                </Grid>
                <Grid item
                      xs={12}
                      style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingTop: '3rem',
                          paddingRight: '1rem',
                      }}
                >
                    <div>
                        Location Message
                    </div>
                </Grid>
                <Grid item
                      xs={12}
                      style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingTop: '3rem',
                      }}
                >
                    <BlackButton>
                        See Alert
                    </BlackButton>
                    <BlackButton style={{marginTop: '1rem'}}>
                        Delete
                    </BlackButton>
                </Grid>
            </Grid>
            <Grid item
                  xs={8}
                  style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingTop: '3rem',
                  }}
            >
                <LocationHandler />
            </Grid>
        </Grid>
    );
};