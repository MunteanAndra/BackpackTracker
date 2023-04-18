import {Box, Grid} from "@mui/material";
import {BlackButton} from "./CustomButtons/BlackButton";
import {AddButton} from "./CustomButtons/AddButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import pinIcon from "../../images/pinIcon.png";
import {useNavigate} from "react-router-dom";
import SideMenu from "./Drawer/SideMenu";
import {useEffect, useState} from "react";
import {onValue, ref} from "firebase/database";
import {db} from "../../firebase";

export const AuthenticatedApp = () => {

    let navigateToAddItem = useNavigate();
    let navigateToShowLocation = useNavigate();
    const [backpacks, setBackpacks] = useState([]);

    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            setBackpacks([]);
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map(backpack => {
                    setBackpacks((oldArray) => [...oldArray, backpack]);
                });
            }
        });
    }, []);

    const handleAddItem = () => {
        navigateToAddItem('/AddItem');
    }

    const handleShowLocation = () => {
        navigateToShowLocation('/ShowLocation');
    }

    return(
        <Grid container style={{padding: '4rem 0rem'}}>
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
                    Here are your things
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
                {backpacks.map((backpack) => (
                <Box border={1} key={backpack.backpack_name} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: '3rem', width: '40%', marginBottom: '1rem' }}>
                    <img src={pinIcon} alt="PinIcon" width="10%"/>
                    <div style={{padding: '0rem 3rem', fontSize: '1.5rem', fontWeight: '500'}}>
                        {backpack.backpack_name}
                    </div>
                    <BlackButton onClick={handleShowLocation}>
                        Show on Map
                    </BlackButton>
                </Box>))}
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
                <AddButton
                    startIcon={<AddCircleIcon />}
                    variant="outlined"
                    color="error"
                    onClick={handleAddItem}
                >
                    Add new backpack
                </AddButton>
            </Grid>
        </Grid>
    );
};