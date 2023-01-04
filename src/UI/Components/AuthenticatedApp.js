import {Box, Grid} from "@mui/material";
import {BlackButton} from "./CustomButtons/BlackButton";
import {AddButton} from "./CustomButtons/AddButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import pinIcon from "../../images/pinIcon.png";

export const AuthenticatedApp = () => {
    return(
        <Grid container style={{padding: '4rem 0rem'}}>
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
                <Box border={1} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: '3rem', width: '40%' }}>
                    <img src={pinIcon} alt="PinIcon" width="10%"/>
                    <div style={{padding: '0rem 3rem', fontSize: '1.5rem', fontWeight: '500'}} >BackPack1</div>
                    <BlackButton>
                        Show on Map
                    </BlackButton>
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
                <AddButton
                    startIcon={<AddCircleIcon />}
                    variant="outlined"
                    color="error"
                >
                    Add new backpack
                </AddButton>
            </Grid>
        </Grid>
    );
};