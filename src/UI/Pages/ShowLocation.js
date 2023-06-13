import {Box, Grid, Hidden} from "@mui/material";
import pinIcon from "../../images/pinIcon.png";
import {BlackButton} from "../Components/CustomButtons/BlackButton";
import {LocationHandler} from "../Components/LocationHandler";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const ShowLocation = () => {

    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const getAddress = (data) => {
        console.log('Data received from child:', data);
        setAddress(data);
    };

    const handleSeeRoute = () => {
        navigate('/RouteMap');
    }

    return (
        <>
            <Hidden only={['xs', 'sm']}>
                <Grid container>
                    <Grid item sm={12} md={4} style={{display: 'flex', flexDirection: 'column'}}>
                        <Grid item xs={12} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: '3rem'
                        }}>
                            <Box
                                border={1}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '1rem',
                                    width: '80%',
                                    borderRadius: '3rem',
                                    padding: '1.5rem',
                                }}
                            >
                                <img src={pinIcon} alt="PinIcon" width="13%"/>
                                <div style={{padding: '0rem 1rem', fontSize: '1.5rem', fontWeight: '500'}}>Your
                                    backpack
                                </div>
                            </Box>
                        </Grid>
                        <Grid item xs={12} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {address}
                        </Grid>
                        <Grid item xs={12} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: '3rem'
                        }}>
                            <BlackButton onClick={handleSeeRoute}>
                                See Route
                            </BlackButton>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={8} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '3rem',
                        paddingRight: '2rem',
                        height: '30rem'
                    }}>
                        <LocationHandler func={getAddress}/>
                    </Grid>
                </Grid>
            </Hidden>
            <Hidden only={['md', 'lg', 'xl']}>
                <Grid container>
                    <Grid item sm={12} style={{display: 'flex'}}>
                        <Grid item xs={6} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingLeft: '2rem',
                        }}>
                            <Box
                                border={1}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '1rem',
                                    width: '80%',
                                    borderRadius: '3rem',
                                    padding: '1.5rem',
                                }}
                            >
                                <img src={pinIcon} alt="PinIcon" width="13%"/>
                                <div style={{padding: '0rem 1rem', fontSize: '1.5rem', fontWeight: '500'}}>Your
                                    backpack
                                </div>
                            </Box>
                        </Grid>
                        {/*<Grid item xs={12} style={{*/}
                        {/*    display: 'flex',*/}
                        {/*    flexDirection: 'column',*/}
                        {/*    alignItems: 'center',*/}
                        {/*    justifyContent: 'center'*/}
                        {/*}}>*/}
                        {/*    {address}*/}
                        {/*</Grid>*/}
                        <Grid item xs={6} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <BlackButton onClick={handleSeeRoute}>
                                See Route
                            </BlackButton>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '3rem',
                        paddingLeft: '2rem',
                        paddingRight: '2rem',
                        height: '30rem'
                    }}>
                        <LocationHandler func={getAddress}/>
                    </Grid>
                </Grid>
            </Hidden>
        </>
    );
};