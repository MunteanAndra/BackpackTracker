import {
    Grid,
    Hidden,
} from "@mui/material";
import {useEffect, useState} from "react";
import {onValue, ref} from "firebase/database";
import {db} from "../../firebase";
import leftStrap from "../../images/leftStrap.png";
import rightStrap from "../../images/rightStrap.png";
import front from "../../images/front.png";
import back from "../../images/back.png";

export const Position = () => {

    const [sensor1, setSensor1] = useState('');
    const [sensor2, setSensor2] = useState('');
    const [sensor3, setSensor3] = useState('');
    const [sensor4, setSensor4] = useState('');

    let decideStrap, decideSide, leftStrapPressure, rightStrapPressure, frontPressure, backPressure;
    let message, secondMessage, thirdMessage;

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
        secondMessage = 'Everything is ok';
    } else if (leftStrapPressure < rightStrapPressure) {
        secondMessage = 'You might consider readjusting your right strap.';
        decideStrap = true;
    } else {
        secondMessage = 'You might consider readjusting your left strap.';
        decideStrap = false;
    }

    if (frontPressure === backPressure) {
        thirdMessage = '';
    } else if (frontPressure < backPressure) {
        thirdMessage = 'And you might also readjust your straps to the front because there is too much pressure on your back.';
        decideSide = true;
    } else {
        thirdMessage = 'And you might also readjust your straps to the back because there is too much pressure on the front.';
        decideSide = false;
    }


    return (
        <>
            <Hidden only={['xs', 'sm']}>
                <Grid container>
                    <Grid item xs={12}
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
                        <Grid item xs={12} style={{display: 'flex'}}>
                            {decideStrap ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img src={rightStrap} alt="rightStrap"/>
                                    <div style={{ fontWeight: 700 }}> RIGHT</div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img src={leftStrap} alt="leftStrap"/>
                                    <div style={{ fontWeight: 700 }}> LEFT</div>
                                </div>
                            )}
                            {decideSide ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img src={back} alt="back" style={{width: '100%'}} />
                                    <div style={{ fontWeight: 700 }}> BACK</div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img src={front} alt="front" style={{width: '100%'}} />
                                    <div style={{ fontWeight: 700 }}> FRONT</div>
                                </div>
                            )}
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
                            {sensor1} leftFront
                        </div>
                        <div
                            style={{
                                padding: '0rem 3rem',
                                fontSize: '1.5rem',
                                fontWeight: '500'
                            }}
                        >
                            {sensor2} leftBack
                        </div>
                        <div
                            style={{
                                padding: '0rem 3rem',
                                fontSize: '1.5rem',
                                fontWeight: '500'
                            }}
                        >
                            {sensor3} rightFront
                        </div>
                        <div
                            style={{
                                padding: '0rem 3rem',
                                fontSize: '1.5rem',
                                fontWeight: '500'
                            }}
                        >
                            {sensor4} rightBack
                        </div>
                    </Grid>
                </Grid>
            </Hidden>
            <Hidden only={['md', 'lg', 'xl']}>
                <Grid container>
                    <Grid item xs={12} style={{padding: '0rem 3rem'}}>
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
                                <br/><br/>
                                {secondMessage}
                                <br/><br/>
                                {thirdMessage}
                            </div>
                            <div style={{marginTop: '1rem'}}>
                                {decideStrap ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src={rightStrap} alt="rightStrap" style={{width: '100%'}}/>
                                        <div style={{ fontWeight: 700 }}> RIGHT</div>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src={leftStrap} alt="leftStrap" style={{width: '100%'}}/>
                                        <div style={{ fontWeight: 700 }}> LEFT</div>
                                    </div>
                                )}
                                {decideSide ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src={back} alt="back" style={{width: '100%'}}/>
                                        <div style={{ fontWeight: 700 }}> BACK</div>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src={front} alt="front" style={{width: '100%'}}/>
                                        <div style={{ fontWeight: 700 }}> FRONT</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} style={{marginTop: '1rem'}}>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <div style={{fontSize: '1.5rem', fontWeight: '500', padding: '0rem 3rem'}}>{sensor1} leftFront</div>
                            <div style={{fontSize: '1.5rem', fontWeight: '500', padding: '0rem 3rem'}}>{sensor2} leftBack</div>
                            <div style={{fontSize: '1.5rem', fontWeight: '500', padding: '0rem 3rem'}}>{sensor3} rightFront</div>
                            <div style={{fontSize: '1.5rem', fontWeight: '500', padding: '0rem 3rem'}}>{sensor4} rightBack</div>
                        </div>
                    </Grid>
                </Grid>
            </Hidden>
        </>
    );
};

