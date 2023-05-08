import {Divider, Grid} from "@mui/material";
import {useState} from "react";

export const Items = () => {

    const [items, setItems] = useState([]);

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
                Items
            </Grid>
        </Grid>
    );
};

