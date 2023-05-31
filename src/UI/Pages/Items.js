import {
    Dialog,
    DialogActions, DialogContent,
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    OutlinedInput,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import {onValue, ref, set} from "firebase/database";
import {db} from "../../firebase";
import laptop from "../../images/laptop.png";
import wallet from "../../images/wallet.png";
import bottleOfWater from "../../images/bottleOfWater.png";
import {BlackButton} from "../Components/CustomButtons/BlackButton";
import {uid} from "uid";

export const Items = () => {

    const [itemName, setItemName] = useState('');
    const [itemWeight, setItemWeight] = useState('');
    const [weight1, setWeight1] = useState('');
    const [weight2, setWeight2] = useState('');
    const [weight3, setWeight3] = useState('');
    const [bodyWeight, setBodyWeight] = useState(0);
    const [open, setOpen] = useState(false);
    const [formItems, setFormItems] = useState([]);
    let item1, item2, item3, src1, src2, src3, totalWeight, message, validate = true, dialogMessage = '';

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        dialogMessage = false;
        setOpen(false);
    };

    totalWeight = weight1 + weight2 + weight3;

    useEffect(() => {
        onValue(ref(db, '/weight1'), (snapshot) => {
            setWeight1('[]');
            const data = snapshot.val();
            if (data !== null) {
                setWeight1(data);
            }
        });
        onValue(ref(db, '/weight2'), (snapshot) => {
            setWeight2('[]');
            const data = snapshot.val();
            if (data !== null) {
                setWeight2(data);
            }
        });
        onValue(ref(db, '/weight3'), (snapshot) => {
            setWeight3('[]');
            const data = snapshot.val();
            if (data !== null) {
                setWeight3(data);
            }
        });
        onValue(ref(db, '/addedItems'), (snapshot) => {
            setFormItems([]);
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map(formItem => {
                    setFormItems((oldArray) => [...oldArray, formItem]);
                });
            }
        });
    }, []);

    const handleWeightChange = (event) => {
        setBodyWeight(event.target.value);
    };

    const handleItemWeightChange = (event) => {
        setItemWeight(event.target.value);
    };

    const handleNameChange = (event) => {
        setItemName(event.target.value);
    };

    const addItemToDatabase = () => {
        const uuid = uid();
        set(ref(db, `/addedItems/${uuid}`), {
            item_name: itemName,
            item_weight: itemWeight,
            uuid,
        })
    };

    if (bodyWeight === 0) {
        dialogMessage = '';
    } else if (itemWeight * 100 > (bodyWeight * 100 - totalWeight)) {
        dialogMessage =
            "Because adding this item passes the recommended weight, " +
            "we advise you not to add it. " +
            "If you want to replace an item that you already have, " +
            "please remove it manually.";
    } else if ( itemWeight >= bodyWeight/10 ) {
        dialogMessage =
            "Because adding this item passes the recommended weight, " +
            "we advise you not to add it. " +
            "If you want to replace an item that you already have, " +
            "please remove it manually.";
    }

    if ( itemWeight === '' || itemName === '' || bodyWeight === 0) {
        validate = false;
    }

    if (bodyWeight === 0) {
        dialogMessage = 'Add your body weight first';
    }

    const submitHandler = (event) => {
        addItemToDatabase();
        //event.preventDefault();
        //setItemName('');
        //setItemWeight('');
        if (!dialogMessage) {
            handleClose();
        }
    }

    if (weight1 > 100 && weight1 < 300) {
        item1 = "wallet";
        src1 = wallet;
    } else if (weight1 > 400 && weight1 < 600) {
        item1 = "bottle of water";
        src1 = bottleOfWater;
    } else if (weight1 > 1100 && weight1 < 1400) {
        item1 = "laptop";
        src1 = laptop;
    }

    if (weight2 >= 100 && weight2 <= 300) {
        item2 = "wallet";
        src2 = wallet;
    } else if (weight2 >= 400 && weight2 <= 600) {
        item2 = "bottle of water";
        src2 = bottleOfWater;
    } else if (weight2 >= 1100 && weight2 <= 1400) {
        item2 = "laptop";
        src2 = laptop;
    }

    if (weight3 >= 100 && weight3 <= 300) {
        item3 = "wallet";
        src3 = wallet;
    } else if (weight3 >= 400 && weight3 <= 600) {
        item3 = "bottle of water";
        src3 = bottleOfWater;
    } else if (weight3 >= 1100 && weight3 <= 1400) {
        item3 = "laptop";
        src3 = laptop;
    }

    if (totalWeight < bodyWeight * 100) {
        message = '';
    } else {
        message = 'Your backpack is heavier than it should, ' +
            'we advise you to give up on the unnecessary things because wearing it like this, ' +
            'it may affect you health ';
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} style={{fontSize: '2rem', fontWeight: '500', marginLeft: '3rem'}}>
                You have these items inside your backpack
                <br></br>
                {message}
            </Grid>
            <Grid item xs={12}
                  style={{
                      marginLeft: '3rem',
                      marginTop: '2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                  }}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                            onChange={handleWeightChange}
                            defaultValue={bodyWeight}
                        />
                        <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
                    </FormControl>
                    <div style={{marginLeft: '2rem', marginBottom: '2rem'}}>
                        Please fill in your body weight
                    </div>
                </div>
                <div style={{marginRight: '6rem', marginBottom: '2rem'}}>
                    <BlackButton onClick={handleClickOpen}>
                        Add item
                    </BlackButton>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <div style={{padding: '1rem 0rem 0rem 0rem'}}>
                                <div style={{fontWeight: 'bold'}}>
                                    Name of item
                                </div>
                                <TextField
                                    id="outlined-basic"
                                    label="Item"
                                    variant="outlined"
                                    style={{minWidth: '17rem', marginTop: '0.5rem'}}
                                    value={itemName}
                                    onChange={handleNameChange}
                                />
                            </div>
                            <div style={{padding: '1rem 0rem'}}>
                                <div style={{fontWeight: 'bold'}}>
                                    Weight of item
                                </div>
                                <TextField
                                    id="outlined-basic"
                                    label="Weight (kg)"
                                    variant="outlined"
                                    style={{minWidth: '17rem', marginTop: '0.5rem'}}
                                    value={itemWeight}
                                    onChange={handleItemWeightChange}
                                />
                            </div>
                            <div style={{margin: '0rem 3rem'}}>
                                {dialogMessage}
                            </div>
                        </DialogContent>
                        <DialogActions style={{justifyContent: 'center'}}>
                            {validate ?
                                <BlackButton onClick={submitHandler} disabled={!!dialogMessage}>
                                    Add
                                </BlackButton>
                            : null}
                        </DialogActions>
                    </Dialog>
                </div>
            </Grid>
            <Grid item
                  xs={12}
                  style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingLeft: '3rem',
                  }}
            >
                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <img src={src1} alt="src1"/>
                    <div style={{fontSize: '1.5rem', fontWeight: '500'}}>
                        {item1}
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <img src={src2} alt="src2"/>
                    <div style={{fontSize: '1.5rem', fontWeight: '500'}}>
                        {item2}
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <img src={src3} alt="src3"/>
                    <div style={{fontSize: '1.5rem', fontWeight: '500'}}>
                        {item3}
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} style={{fontSize: '1.5rem', fontWeight: '500', marginLeft: '3rem', marginTop: '3rem'}}>
                You have added these new items in your list
                <ul>
                    {formItems.map((formItem) => (
                        <li key={formItem.uuid}>
                            {formItem.item_name}
                        </li>
                    ))}
                </ul>
            </Grid>
        </Grid>
    );
};
