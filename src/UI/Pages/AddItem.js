import {Box, Divider, Grid, TextField} from "@mui/material";
import {BlackButton} from "../Components/CustomButtons/BlackButton";
import pinIcon from "../../images/pinIcon.png";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {db} from '../../firebase';
import {uid} from "uid";
import {set, ref, onValue, remove} from "firebase/database";

export const AddItem = () => {

    let navigateToShowLocation = useNavigate();
    const [backpackName, setBackpackName] = useState('');
    const [backpackId, setBackpackId] = useState('');
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

    const addBackpackToDatabase = () => {
        const uuid = uid();
        set(ref(db, `/${uuid}`), {
            backpack_name: backpackName,
            backpack_id: backpackId,
            uuid,
        })
    };

    const handleDelete = (backpack) => {
        remove(ref(db, `/${backpack.uuid}`));
    };

    const nameEventHandler = (event) => {
        setBackpackName(event.target.value);
    };

    const idEventHandler = (event) => {
        setBackpackId(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        addBackpackToDatabase();
        setBackpackName('');
        setBackpackId('');
    };

    const handleShowLocation = () => {
        navigateToShowLocation('/ShowLocation');
    };

    return (
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
                {backpacks.map((backpack) => (
                    <Box
                        border={1}
                        key={backpack.backpack_name}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '3rem',
                            marginBottom: '1rem',
                        }}
                    >
                        <img src={pinIcon} alt="PinIcon" width="10%"/>
                        <div
                            style={{
                                padding: '0rem 3rem',
                                fontSize: '1.5rem',
                                fontWeight: '500'
                            }}
                        >
                            {backpack.backpack_name}
                        </div>
                        <div>
                            <BlackButton onClick={handleShowLocation}>
                                Show on Map
                            </BlackButton>
                            <BlackButton
                                onClick={() => handleDelete(backpack)}
                                style={{marginTop: '0.5rem'}}
                            >
                                Delete
                            </BlackButton>
                        </div>
                    </Box>
                ))}
            </Grid>
            <Grid item xs={1}>
                <Divider orientation="vertical" flexItem style={{height: '100%'}}/>
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
    );
};

