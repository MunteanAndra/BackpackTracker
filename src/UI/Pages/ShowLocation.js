import {Box, Grid} from "@mui/material";
import pinIcon from "../../images/pinIcon.png";
import {BlackButton} from "../Components/CustomButtons/BlackButton";
import {LocationHandler} from "../Components/LocationHandler";

export const ShowLocation = () => {
    return (
        <Grid container>
            <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column'}}>
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
                      }}
                >
                    <BlackButton>
                        See Alert
                    </BlackButton>
                </Grid>
                <Grid item
                      xs={12}
                      style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                      }}
                >
                    <div>
                        Location Message
                    </div>
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
                      paddingRight: '2rem',
                      height: '30rem',
                  }}
            >
                <LocationHandler />
            </Grid>
        </Grid>
    );
};