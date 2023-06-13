import {Box, Grid, Hidden} from "@mui/material";
import {BlackButton} from "./CustomButtons/BlackButton";
import pinIcon from "../../images/pinIcon.png";
import {useNavigate} from "react-router-dom";
import SideMenu from "./Drawer/SideMenu";
import {useEffect, useState} from "react";
import {onValue, ref} from "firebase/database";
import {db} from "../../firebase";

export const AuthenticatedApp = () => {

    let navigateToShowLocation = useNavigate();
    const [backpacks, setBackpacks] = useState([]);

    useEffect(() => {
        onValue(ref(db, '/backpacks'), (snapshot) => {
            setBackpacks([]);
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map(backpack => {
                    setBackpacks((oldArray) => [...oldArray, backpack]);
                });
            }
        });
    }, []);


    const handleShowLocation = () => {
        navigateToShowLocation('/ShowLocation');
    }

    return(
        <Grid container>
            <Grid item xs={12}>
                <SideMenu />
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
                <div style={{ fontWeight: '700', fontSize: '1.5rem' }}>
                    Hi, User!
                </div>
                <div style={{ fontWeight: '700', fontSize: '1.5rem' }}>
                    Here is your backpack
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
                      paddingBottom: '5rem',
                  }}
            >
                {backpacks.map((backpack) => (
                    <>
                        <Hidden only={['md','lg','xl']}>
                            <Box border={1} key={backpack.uuid} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', width: '60%', marginBottom: '1rem', borderRadius: '2rem' }}>
                                <div style={{fontSize: '1.5rem', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', paddingBottom: '1rem'}}>
                                    <img src={pinIcon} alt="PinIcon" width="10%"/>
                                    {backpack.backpack_name}
                                </div>
                                <BlackButton onClick={handleShowLocation}>
                                    Show on Map
                                </BlackButton>
                            </Box>
                        </Hidden>
                        <Hidden only={['xs','sm']}>
                            <Box border={1} key={backpack.uuid} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: '3rem', width: '40%', marginBottom: '1rem' }}>
                                <img src={pinIcon} alt="PinIcon" width="10%"/>
                                <div style={{padding: '0rem 3rem', fontSize: '1.5rem', fontWeight: '500'}}>
                                    {backpack.backpack_name}
                                </div>
                                <BlackButton onClick={handleShowLocation}>
                                    Show on Map
                                </BlackButton>
                            </Box>
                        </Hidden>
                    </>
                ))}
            </Grid>
            {/*<Grid item*/}
            {/*      xs={12}*/}
            {/*      style={{*/}
            {/*          display: 'flex',*/}
            {/*          flexDirection: 'column',*/}
            {/*          alignItems: 'center',*/}
            {/*          justifyContent: 'center',*/}
            {/*          paddingTop: '3rem',*/}
            {/*      }}*/}
            {/*>*/}
            {/*    <AddButton*/}
            {/*        startIcon={<AddCircleIcon />}*/}
            {/*        variant="outlined"*/}
            {/*        color="error"*/}
            {/*        onClick={handleAddItem}*/}
            {/*    >*/}
            {/*        Add new backpack*/}
            {/*    </AddButton>*/}
            {/*</Grid>*/}
        </Grid>
    );
};