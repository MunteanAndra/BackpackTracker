import {Divider, Grid} from "@mui/material";

export const Footer = () => {
    return (
        <>
            <Divider
                style={{
                    width: '100%',
                    height: '2rem',
                    color: '#18191A',
                    padding: '3rem 0rem',
                }}
            />
            <Grid container style={{padding: '3rem 0rem'}}>
                <Grid item
                      xs={6}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                     }}
                >
                    <div style={{paddingRight: '1rem', fontWeight: '700'}}>
                        Repository
                    </div>
                    <div>
                        <a href="https://github.com/MunteanAndra/BackpackTracker" target="blank" style={{ color: 'black', textDecoration: 'none' }}>
                            Github
                        </a>
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
                        Development
                    </div>
                    <div>
                        2022-2023
                    </div>
                </Grid>
            </Grid>
        </>
    );
};