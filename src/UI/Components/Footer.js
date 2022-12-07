import {Divider, Grid} from "@mui/material";

export const Footer = () => {
    return (
        <>
            <Divider
                style={{
                    width: '100%',
                    height: '2rem',
                    color: '#18191A',
                    padding: '2rem 0rem',
                }}
            />
            <Grid container style={{padding: '2rem 0rem'}}>
                <Grid item
                      xs={6}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                     }}
                >
                    <div style={{paddingRight: '1rem', fontWeight: '700'}}>
                        Connect
                    </div>
                    <div>
                        <div>
                            Facebook
                        </div>
                        <div>
                            Instagram
                        </div>
                        <div>
                            Youtube
                        </div>
                    </div>
                </Grid>
                <Grid item
                      xs={6}
                      style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                      }}
                >
                    <div style={{paddingRight: '1rem', fontWeight: '700'}}>
                        Resources
                    </div>
                    <div>
                        Privacy policy
                    </div>
                </Grid>
            </Grid>
        </>
    );
};