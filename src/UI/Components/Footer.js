import {Grid} from "@mui/material";

export const Footer = () => {
    return (
        <>
            <Grid container style={{paddingTop: '2rem'}}>
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