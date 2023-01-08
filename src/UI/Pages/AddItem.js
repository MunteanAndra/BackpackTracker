import {Box, Divider, Grid, TextField} from "@mui/material";
import {BlackButton} from "../Components/CustomButtons/BlackButton";
import pinIcon from "../../images/pinIcon.png";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export const AddItem = () => {

    let navigateToShowLocation = useNavigate();
    const [backpackName, setBackpackName] = useState('');
    const [backpackId, setBackpackId] = useState('');

    const nameEventHandler = (event) => {
        setBackpackName(event.target.value);
    };

    const idEventHandler = (event) => {
        setBackpackId(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(backpackName);
        console.log(backpackId);

        //setBackpackName('');
        setBackpackId('');
    }

    const handleShowLocation = () => {
        navigateToShowLocation('/ShowLocation');
    };

    return (
        <>
            <Grid container>
                <Grid item
                      xs={5}
                      style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingLeft: '3rem',
                      }}
                >
                    <Box
                        border={1}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '3rem',
                        }}
                    >
                        <img src={pinIcon} alt="PinIcon" width="10%"/>
                        <div style={{padding: '0rem 3rem', fontSize: '1.5rem', fontWeight: '500'}}>{backpackName}</div>
                        <div>
                            <BlackButton onClick={handleShowLocation}>
                                Show on Map
                            </BlackButton>
                            <BlackButton style={{ marginTop: '0.5rem' }}>
                                Delete
                            </BlackButton>
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={1}>
                    <Divider orientation="vertical" flexItem style={{height: '60vh'}}/>
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
                    <div style={{padding: '1rem 0rem 0rem 0rem'}}>
                        <div style={{fontWeight: 'bold'}}>
                            Name for backpack
                        </div>
                        <TextField
                            id="outlined-basic"
                            label="Enter a name"
                            variant="outlined"
                            style={{minWidth: '17rem', marginTop: '0.5rem'}}
                            value={backpackName}
                            onChange={nameEventHandler}
                        />
                    </div>
                    <div style={{padding: '1rem 0rem'}}>
                        <div style={{fontWeight: 'bold'}}>
                            ID for backpack
                        </div>
                        <TextField
                            id="outlined-basic"
                            label="Enter your backpack's given ID"
                            variant="outlined"
                            type="password"
                            style={{minWidth: '17rem', marginTop: '0.5rem'}}
                            value={backpackId}
                            onChange={idEventHandler}
                        />
                    </div>
                    <BlackButton onClick={submitHandler}>
                        Add it
                    </BlackButton>
                </Grid>
            </Grid>
        </>
    );
};