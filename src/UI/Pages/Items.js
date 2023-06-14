import {
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    FormControl,
    FormHelperText,
    Grid, Hidden, InputAdornment, OutlinedInput,
    TextField, Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {onValue, ref, set} from "firebase/database";
import {db} from "../../firebase";
import charger from "../../images/charger.png";
import chocolate from "../../images/chocolate.png";
import apple from "../../images/apple.png";
import laptop from "../../images/laptop.png";
import wallet from "../../images/wallet.png";
import bottleOfWater from "../../images/bottleOfWater.png";
import {BlackButton} from "../Components/CustomButtons/BlackButton";
import {Chart} from "react-google-charts";
import {uid} from "uid";

export const Items = () => {

    const [itemName, setItemName] = useState('');
    const [itemWeight, setItemWeight] = useState('');
    const [bodyWeight, setBodyWeight] = useState(0);
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(true);
    const [formItems, setFormItems] = useState([]);
    const [weightValues, setWeightValues] = useState([]);
    const items = [], src = [], weightValuesKg = [];
    const range = 50;
    let totalWeight = 0, message, validate = true, dialogMessage = '', arr = [], isItemInRange;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        dialogMessage = false;
        setOpen(false);
    };

    useEffect(() => {
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

    useEffect(() => {
        addBodyWeightToDatabase();
    }, []);

    useEffect(() => {
        onValue(ref(db, '/weightValues'), (snapshot) => {
            setWeightValues([]);
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map(set => {
                    setWeightValues((oldArray) => [...oldArray, set]);
                });
            }
        });
    }, []);

    for (let i = 0; i < weightValues.length; i++) {
        arr.push(weightValues[i]);
        totalWeight += weightValues[i];
    }

    const handleWeightChange = (event) => {
        setBodyWeight(event.target.value);
    };

    const handleItemWeightChange = (event) => {
        event.preventDefault();
        setItemWeight(event.target.value);
    };

    const handleNameChange = (event) => {
        setItemName(event.target.value);
    };

    const updateBodyWeight = () => {
        localStorage.setItem("bodyWeight", bodyWeight.toString());
        if (localStorage.getItem("bodyWeight") !== '0') {
            setShow(true);
        }
    };

    const addItemToDatabase = () => {
        const uuid = uid();
        set(ref(db, `/addedItems/${uuid}`), {
            item_name: itemName, item_weight: itemWeight, uuid,
        })
    };

    const addBodyWeightToDatabase = () => {
        set(ref(db, `/bodyWeight`), {
            body_weight: bodyWeight,
        })
    };

    const submitHandler = () => {
        addItemToDatabase();
        handleClose();
        setItemName('');
        setItemWeight('');
    }

    const searchItemWithRange = (arr, target, range) => {
        return arr.some((item) => Math.abs(item - target) <= range);
    };

    if( itemWeight ) {
        isItemInRange = searchItemWithRange(arr, itemWeight * 1000, range);
    } else {
        isItemInRange = false;
    }

    if (bodyWeight === 0) {
        dialogMessage = '';
    } else if (itemWeight * 1000 > (bodyWeight * 100 - totalWeight)) {
        dialogMessage = "Because adding this item passes the recommended weight, "
            + "we advise you not to add it. "
            + "If you want to replace an item that you already have, "
            + "please remove it manually.";
    } else if (itemWeight >= bodyWeight / 10) {
        dialogMessage = "Because adding this item passes the recommended weight, "
            + "we advise you not to add it. "
            + "If you want to replace an item that you already have, "
            + "please remove it manually.";
    }

    if (itemWeight === '' || itemName === '' || bodyWeight === 0) {
        validate = false;
    }

    if (bodyWeight === 0) {
        dialogMessage = 'Update your body weight first';
    }

    for (let i = 0; i < weightValues.length; i++) {
        const weight = weightValues[i];
        weightValuesKg[i] = weightValues[i]/1000;

        if (weight > 100 && weight < 300) {
            items[i] = "wallet";
            src[i] = wallet;
        } else if (weight > 400 && weight < 600) {
            items[i] = "bottle of water";
            src[i] = bottleOfWater;
        } else if (weight > 1100 && weight < 1400) {
            items[i] = "laptop";
            src[i] = laptop;
        }
    }

    const importMapping = {
        charger: charger,
        chocolate: chocolate,
        apple: apple
    };

    formItems.forEach(formItem => {
        const lowerRange = parseFloat(formItem.item_weight) - 0.1;
        const upperRange = parseFloat(formItem.item_weight) + 0.1;

        weightValuesKg.forEach(weight => {
            if (weight >= lowerRange && weight <= upperRange) {
                items.push(formItem.item_name);
                src.push(importMapping[formItem.item_name]);
            }
        });
    });

    if (totalWeight < bodyWeight * 100) {
        message = '';
    } else {
        message = 'Your backpack is heavier than it should, '
            + 'we advise you to give up on the unnecessary things because wearing it like this '
            + 'may affect you health. ';
    }

    const data = [["Item", "Kilograms"]];

    for (let i = 0; i < items.length; i++) {
        data.push([items[i], weightValuesKg[i]]);
    }

    const options = {
        title: "My items",
    };

    const renderedItemsDesktop = [];
    for (let i = 0; i < items.length; i += 3) {
        const lineItems = items.slice(i, i + 3);
        const lineSrc = src.slice(i, i + 3);

        const line = (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                {lineItems.map((item, index) => (
                    <div key={index} style={{ marginRight: '4rem', display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '1.5rem' }}>
                        <img src={lineSrc[index]} alt={`src${i + index + 1}`} />
                        <div style={{ fontSize: '1.5rem', fontWeight: '500', marginTop: '1.5rem' }}>
                            {item}
                        </div>
                    </div>
                ))}
            </div>
        );

        renderedItemsDesktop.push(line);
    }

    const renderedItemsMobile = items.map((item, index) => (
        <div key={index} style={{ display: 'contents' }}>
            <img src={src[index]} alt={`src${index + 1}`} style={{ maxWidth: '100%', height: 'auto' }} />
            <Typography variant="subtitle1" style={{ fontSize: '1.5rem', fontWeight: '500', textAlign: 'center', marginBottom: '2rem', marginTop: '0.5rem' }}>
                {item}
            </Typography>
        </div>
    ));

    return (
        <>
            <Hidden only={['xs', 'sm']}>
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
                              justifyContent: 'space-between',
                          }}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            {show ? (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ marginRight: '1rem'}}>
                                        Your body weight is {localStorage.getItem("bodyWeight")} kg
                                    </div>
                                    <BlackButton onClick={() => {
                                        setShow(!show);
                                    }}>
                                        Change weight
                                    </BlackButton>
                                </div>
                            ) : (
                                <>
                                    <FormControl sx={{m: 1, width: '100%'}} variant="outlined">
                                        <OutlinedInput
                                            id="outlined-number"
                                            type="number"
                                            defaultValue={bodyWeight}
                                            onChange={handleWeightChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <BlackButton onClick={updateBodyWeight} style={{ marginRight: '-1rem', borderRadius: '0.5rem'}}>
                                                        Update weight
                                                    </BlackButton>
                                                </InputAdornment>
                                            }
                                        />
                                        <FormHelperText id="outlined-weight-helper-text">Weight (kg)</FormHelperText>
                                    </FormControl>
                                    <Typography variant="subtitle2" style={{marginBottom: '1rem', textAlign: 'center'}}>
                                        Please fill in your body weight
                                    </Typography>
                                </>
                            )}
                        </div>
                        <div style={{marginRight: '6rem', marginBottom: '2rem', marginTop: '2rem'}}>
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
                                    {isItemInRange ?
                                        <div style={{margin: '0rem 3rem'}}>
                                            This item might get confused with another one, because of its weight
                                        </div> : null}
                                </DialogContent>
                                <DialogActions style={{justifyContent: 'center'}}>
                                    {validate ? <BlackButton onClick={submitHandler}>
                                        Add
                                    </BlackButton> : null}
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Grid>
                    <Grid item xs={12} style={{
                        marginTop: '4rem',
                        marginBottom: '4rem',

                    }}>
                        {renderedItemsDesktop}
                    </Grid>
                    <Divider style={{ width: '90%', border: '0.1rem solid grey' }} />
                    <Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                        width={"100%"}
                        height={"400px"}
                    />
                </Grid>
            </Hidden>
            <Hidden only={['md', 'lg', 'xl']}>
                <Grid container justifyContent="center" style={{padding: '1rem'}}>
                    <Grid item xs={12} md={6} style={{fontSize: '1.5rem', fontWeight: '500', marginLeft: '1rem'}}>
                        You have these items inside your backpack.
                        <br/>
                        {message}
                    </Grid>
                    <Grid item xs={12} md={6}
                          style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem'}}>
                        {show ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ marginRight: '1rem'}}>
                                    Your body weight is {localStorage.getItem("bodyWeight")} kg
                                </div>
                                <BlackButton onClick={() => {
                                    setShow(!show);
                                }}>
                                    Change weight
                                </BlackButton>
                            </div>
                        ) : (
                            <>
                                <Typography variant="subtitle2" style={{marginTop: '1rem', textAlign: 'center'}}>
                                    Please fill in your body weight
                                </Typography>
                                <FormControl sx={{m: 1, width: '100%'}} variant="outlined">
                                    <OutlinedInput
                                        id="outlined-number"
                                        type="number"
                                        defaultValue={bodyWeight}
                                        onChange={handleWeightChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <BlackButton onClick={updateBodyWeight} style={{ marginRight: '-1rem', borderRadius: '0.5rem'}}>
                                                    Update weight
                                                </BlackButton>
                                            </InputAdornment>
                                        }
                                    />
                                    <FormHelperText id="outlined-weight-helper-text">Weight (kg)</FormHelperText>
                                </FormControl>
                            </>
                        )}
                    </Grid>
                    <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
                        <BlackButton variant="contained" color="primary" onClick={handleClickOpen}>
                            Add item
                        </BlackButton>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description">
                            <DialogContent style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <div style={{padding: '1rem 0rem'}}>
                                    <Typography variant="subtitle1" style={{fontWeight: 'bold'}}>
                                        Name of item
                                    </Typography>
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
                                    <Typography variant="subtitle1" style={{fontWeight: 'bold'}}>
                                        Weight of item
                                    </Typography>
                                    <TextField
                                        id="outlined-basic"
                                        label="Weight (kg)"
                                        variant="outlined"
                                        style={{minWidth: '17rem', marginTop: '0.5rem'}}
                                        value={itemWeight}
                                        onChange={handleItemWeightChange}
                                    />
                                </div>
                                <Typography variant="body2" style={{margin: '0rem 3rem'}}>
                                    {dialogMessage}
                                </Typography>
                                {isItemInRange && (
                                    <Typography variant="body2" style={{margin: '0rem 3rem'}}>
                                        This item might get confused with another one because of its weight
                                    </Typography>
                                )}
                            </DialogContent>
                            <DialogActions style={{justifyContent: 'center'}}>
                                {validate && (
                                    <BlackButton variant="contained" color="primary" onClick={submitHandler}>
                                        Add
                                    </BlackButton>
                                )}
                            </DialogActions>
                        </Dialog>
                    </Grid>
                    <Grid item xs={12} style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '4rem',
                    }}>
                        {renderedItemsMobile}
                    </Grid>
                    <Divider style={{width: '90%', margin: '2rem auto'}}/>
                    <Chart
                        chartType="PieChart"
                        data={data}
                        options={options}
                        width={"100%"}
                        height={"400px"}
                    />
                </Grid>
            </Hidden>
        </>
    );
};

