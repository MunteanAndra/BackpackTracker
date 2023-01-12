import {Box, Divider, Grid, TextField} from "@mui/material";
import {BlackButton} from "../Components/CustomButtons/BlackButton";
import pinIcon from "../../images/pinIcon.png";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {collection, addDoc, query, where, getDocs} from "firebase/firestore";
import {auth, db} from '../../firebase';
import {useAuthState} from "react-firebase-hooks/auth";

export const AddItem = () => {

    let navigateToShowLocation = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const [backpackName, setBackpackName] = useState('');
    const [backpackId, setBackpackId] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [backPacksFromAdded, setBackPacksFromAdded] = useState([]);

    const fetchOwnerUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setOwnerName(data.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    const addBackpack = async () => {

        try {
            const docRef = await addDoc(collection(db, "backpacks"), {
                backpackName: backpackName,
                backpackId: backpackId,
                backpackOwner: ownerName,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (err) {
            console.error("Error adding document: ", err);
        }
    };

    const fetchPost = async () => {

        await getDocs(collection(db, "backpacks"))
            .then((data) => {
                const backPacksAdded = data.docs.map((doc) => ({...doc.data(), id: doc.id,}));
                setBackPacksFromAdded(backPacksAdded);
                console.log(backPacksFromAdded, backPacksAdded);
            })

    }

    useEffect(() => {
        if (loading) return;
        fetchPost();
        fetchOwnerUserName();
    }, [user, loading]);

    const nameEventHandler = (event) => {
        setBackpackName(event.target.value);
    };

    const idEventHandler = (event) => {
        setBackpackId(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        addBackpack();

        setBackpackName('');
        setBackpackId('');
    };

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
                    { backPacksFromAdded.length ? backPacksFromAdded.map((backpack) => {
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
                                <div style={{
                                    padding: '0rem 3rem',
                                    fontSize: '1.5rem',
                                    fontWeight: '500'
                                }}>{backpack.backpackName}</div>
                                <div>
                                    <BlackButton onClick={handleShowLocation}>
                                        Show on Map
                                    </BlackButton>
                                    <BlackButton style={{marginTop: '0.5rem'}}>
                                        Delete
                                    </BlackButton>
                                </div>
                            </Box>
                    }) :
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
                            <div style={{
                                padding: '0rem 3rem',
                                fontSize: '1.5rem',
                                fontWeight: '500'
                            }}>{backpackName}</div>
                            <div>
                                <BlackButton onClick={handleShowLocation}>
                                    Show on Map
                                </BlackButton>
                                <BlackButton style={{marginTop: '0.5rem'}}>
                                    Delete
                                </BlackButton>
                            </div>
                        </Box>
                    }
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

