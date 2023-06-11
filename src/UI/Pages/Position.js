import {
    Grid,
    Hidden,
} from "@mui/material";
import {useEffect, useState} from "react";
import {onValue, ref} from "firebase/database";
import {db} from "../../firebase";
import strapsBackpack from "../../images/backpack_with_straps.png";
import leftStrap from "../../images/leftStrap.png";
import rightStrap from "../../images/rightStrap.png";

export const Position = () => {

    const [sensor1, setSensor1] = useState('');
    const [sensor2, setSensor2] = useState('');
    const [sensor3, setSensor3] = useState('');
    const [sensor4, setSensor4] = useState('');

    let decideStrap;
    let leftStrapPressure = 0;
    let rightStrapPressure = 0;
    let frontPressure = 0;
    let backPressure = 0;

    let message = '';
    let secondMessage = '';
    let thirdMessage = '';

    useEffect(() => {
        onValue(ref(db, '/pressureSensor1'), (snapshot) => {
            setSensor1('[]');
            const data = snapshot.val();
            if (data !== null) {
                setSensor1(data);
            }
        });
        onValue(ref(db, '/pressureSensor2'), (snapshot) => {
            setSensor2('[]');
            const data = snapshot.val();
            if (data !== null) {
                setSensor2(data);
            }
        });
        onValue(ref(db, '/pressureSensor3'), (snapshot) => {
            setSensor3('[]');
            const data = snapshot.val();
            if (data !== null) {
                setSensor3(data);
            }
        });
        onValue(ref(db, '/pressureSensor4'), (snapshot) => {
            setSensor4('[]');
            const data = snapshot.val();
            if (data !== null) {
                setSensor4(data);
            }
        });
    }, []);

    leftStrapPressure = sensor1 + sensor2;
    rightStrapPressure = sensor3 + sensor4;
    frontPressure = sensor1 + sensor3;
    backPressure = sensor2 + sensor4;

    if (leftStrapPressure !== rightStrapPressure) {
        message = 'You are not properly wearing your backpack. Its position affects your back and in time it might cause you back pain. Readjust its straps and re-check the result!';
    } else {
        message = 'Good for you! Your wear position is correct';
    }

    if (leftStrapPressure === rightStrapPressure) {
        secondMessage = '';
    } else if (leftStrapPressure < rightStrapPressure) {
        secondMessage = 'You might consider readjusting your right strap.';
        decideStrap = 'true';
    } else {
        secondMessage = 'You might consider readjusting your left strap.';
        decideStrap = 'false';
    }

    if (frontPressure === backPressure) {
        thirdMessage = '';
    } else if (frontPressure < backPressure) {
        thirdMessage = 'And you might also readjust your straps to the front because there is too much pressure on your back.';
    } else {
        thirdMessage = 'And you might also readjust your straps to the back because there is too much pressure on the front.';
    }

    return (
        <>
            <Hidden only={['xs', 'sm']}>
                <Grid container>
                    <Grid item xs={12} md={5}>
                        <img src={strapsBackpack} alt={"backpack"}/>
                    </Grid>
                    <Grid item xs={12} md={7}
                          style={{
                              padding: '0rem 3rem',
                              fontSize: '1.5rem',
                              fontWeight: '500',
                              display: 'flex',
                              alignItems: 'center',
                              flexDirection: 'column',
                          }}
                    >
                        <Grid item xs={12}>
                            {message}
                            <br></br>
                            <br></br>
                            {secondMessage}
                            <br></br>
                            <br></br>
                            {thirdMessage}
                        </Grid>
                        <Grid item xs={12}>
                            {decideStrap ? <img src={rightStrap} alt="rightStrap" /> : <img src={leftStrap} alt="leftStrap" />}
                        </Grid>
                    </Grid>
                    <Grid item
                          xs={12}
                          style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              paddingLeft: '3rem',
                          }}
                    >
                        <div
                            style={{
                                padding: '0rem 3rem',
                                fontSize: '1.5rem',
                                fontWeight: '500'
                            }}
                        >
                            {sensor1}
                        </div>
                        <div
                            style={{
                                padding: '0rem 3rem',
                                fontSize: '1.5rem',
                                fontWeight: '500'
                            }}
                        >
                            {sensor2}
                        </div>
                        <div
                            style={{
                                padding: '0rem 3rem',
                                fontSize: '1.5rem',
                                fontWeight: '500'
                            }}
                        >
                            {sensor3}
                        </div>
                        <div
                            style={{
                                padding: '0rem 3rem',
                                fontSize: '1.5rem',
                                fontWeight: '500'
                            }}
                        >
                            {sensor4}
                        </div>
                    </Grid>
                </Grid>
            </Hidden>
            <Hidden only={['md', 'lg', 'xl']}>
                <Grid container>
                    <Grid item xs={12} style={{ padding: '0rem 3rem' }}>
                        <div
                            style={{
                                fontSize: '1.3rem',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <div>
                                {message}
                                <br /><br />
                                {secondMessage}
                                <br /><br />
                                {thirdMessage}
                            </div>
                            <div style={{ marginTop: '1rem' }}>
                                {decideStrap ? (
                                    <img src={rightStrap} alt="rightStrap" style={{ width: '100%' }} />
                                ) : (
                                    <img src={leftStrap} alt="leftStrap" style={{ width: '100%' }} />
                                )}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} style={{ paddingLeft: '3rem', marginTop: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: '500', padding: '0rem 3rem' }}>{sensor1}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '500', padding: '0rem 3rem' }}>{sensor2}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '500', padding: '0rem 3rem' }}>{sensor3}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '500', padding: '0rem 3rem' }}>{sensor4}</div>
                        </div>
                    </Grid>
                </Grid>
            </Hidden>
        </>
    );
};

