import {Divider, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import {onValue, ref} from "firebase/database";
import {db} from "../../firebase";
import laptop from "../../images/laptop.png";
import wallet from "../../images/wallet.png";
import bottleOfWater from "../../images/bottleOfWater.png";

export const Items = () => {

    const [items, setItems] = useState([]);
    const [weight1, setWeight1] = useState('');
    const [weight2, setWeight2] = useState('');
    const [weight3, setWeight3] = useState('');

    let item1, item2, item3, src1, src2, src3;

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

    }, []);

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

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} style={{ fontSize: '2rem', fontWeight: '500', marginLeft: '3rem'}}>
                You have these items inside your backpack
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
                    <div style={{ fontSize: '1.5rem', fontWeight: '500'}}>
                        {item1}
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <img src={src2} alt="src2"/>
                    <div style={{ fontSize: '1.5rem', fontWeight: '500'}}>
                        {item2}
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <img src={src3} alt="src3"/>
                    <div style={{ fontSize: '1.5rem', fontWeight: '500'}}>
                    {item3}
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};

