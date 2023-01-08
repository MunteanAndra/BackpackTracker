import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {auth, db} from "../../firebase";
import {query, collection, getDocs, where} from "firebase/firestore";
import {Grid} from "@mui/material";

const Profile = () => {

    const [user, loading] = useAuthState(auth);
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
        if (!user) return navigate("/Login");
        fetchUserName();
    }, [user, loading]);

    return (
        <Grid container style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <div>Logged in as</div>
                <div>{name}</div>
                <div>{user?.email}</div>
            </div>
        </Grid>
    );
}
export default Profile;