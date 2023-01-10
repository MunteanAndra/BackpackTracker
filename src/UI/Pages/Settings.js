import {BlackButton} from "../Components/CustomButtons/BlackButton";
import {auth, db, sendPasswordReset} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {collection, getDocs, query, where} from "firebase/firestore";
import {Grid} from "@mui/material";


export const Settings = () => {

    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/UnautheticatedApp");
        fetchUserName();
    }, [user, loading]);

    const handleResetPassword = () => {
        sendPasswordReset(user?.email);
    };

    return(
        <Grid container style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <div style={{ marginBottom: '1.5rem'}}>
                    Want to change your password? Reset it from here
                </div>
                <div>
                    <BlackButton onClick={handleResetPassword}>
                        Reset Password
                    </BlackButton>
                </div>
            </div>
        </Grid>
    );
};