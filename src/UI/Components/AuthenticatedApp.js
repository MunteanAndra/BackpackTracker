import {Box, Grid, Hidden} from "@mui/material";
import pinIcon from "../../images/pinIcon.png";
import SideMenu from "./Drawer/SideMenu";
import {useEffect, useState} from "react";
import {onValue, ref} from "firebase/database";
import {db} from "../../firebase";

export const AuthenticatedApp = () => {

    const [month, setMonth] = useState([]);
    const [day, setDay] = useState([]);
    const [hours, setHours] = useState([]);
    const [minutes, setMinutes] = useState([]);
    let month1, month2, day1, day2, hour1, hour2, minute1, minute2, timeMessage;

    useEffect(() => {
        onValue(ref(db, '/date/month'), (snapshot) => {
            setMonth([]);
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map(backpack => {
                    setMonth((oldArray) => [...oldArray, backpack]);
                });
            }
        });
        onValue(ref(db, '/date/day'), (snapshot) => {
            setDay([]);
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map(backpack => {
                    setDay((oldArray) => [...oldArray, backpack]);
                });
            }
        });
        onValue(ref(db, '/date/hour'), (snapshot) => {
            setHours([]);
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map(backpack => {
                    setHours((oldArray) => [...oldArray, backpack]);
                });
            }
        });
        onValue(ref(db, '/date/minute'), (snapshot) => {
            setMinutes([]);
            const data = snapshot.val();
            if (data !== null) {
                Object.values(data).map(backpack => {
                    setMinutes((oldArray) => [...oldArray, backpack]);
                });
            }
        });
    }, []);

    for(let i = 0; i<= month.length - 1;  i++) {
        month1 = month[0];
        month2 = month[month.length - 1];
        day1 = day[0];
        day2 = day[day.length - 1];
        hour1 = hours[0];
        hour2 = hours[hours.length - 1];
        minute1 = minutes[0];
        minute2 = minutes[minutes.length -1];
    }

    const calculateTime = () => {
        let date1 = new Date(2023, month1, day1, hour1, minute1);
        let date2 = new Date(2023, month2, day2, hour2, minute2);

        let difference = date2 - date1; //milisecunde

        let minutes = Math.floor(difference / 1000 / 60); //minute

        let days = Math.floor(minutes / (60 * 24)); //numarul total de minute se imaprte la cate minute are o zi si se ia partea intreaga
        let hours = Math.floor((minutes % (60 * 24)) / 60); // din ce a ramas
        minutes = Math.floor((minutes % (60 * 24)) % 60);

        timeMessage = "You had your backpack with you for " + days + " days, " + hours + " hours, and " + minutes + " minutes.";
    }

    calculateTime();

    return (
        <Grid container>
            <Grid item xs={12}>
                <SideMenu/>
            </Grid>
            <Grid item
                  xs={12}
                  style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '3rem',
                  }}
            >
                <div style={{fontWeight: '700', fontSize: '1.5rem'}}>
                    Hello, User!
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
                <Hidden only={['md', 'lg', 'xl']}>
                    <Box border={1} key={321} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '3rem',
                        width: '60%',
                        marginBottom: '1rem',
                        borderRadius: '2rem'
                    }}>
                        <div style={{
                            fontSize: '1.5rem',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            paddingBottom: '1rem'
                        }}>
                            <img src={pinIcon} alt="PinIcon" width="10%" style={{ marginRight: '1rem' }}/>
                            {timeMessage}
                        </div>
                    </Box>
                </Hidden>
                <Hidden only={['xs', 'sm']}>
                    <Box border={1} key={123} style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '3rem',
                        width: '40%',
                        marginBottom: '1rem'
                    }}>
                        <img src={pinIcon} alt="PinIcon" width="10%"/>
                        <div style={{padding: '0rem 3rem', fontSize: '1.5rem', fontWeight: '500'}}>
                            {timeMessage}
                        </div>
                    </Box>
                </Hidden>
            </Grid>
        </Grid>
    );
};