import {Routes, Route, useNavigate} from 'react-router-dom';
import {Login} from "./UI/Pages/Login";
import {Navbar} from "./UI/Components/Navbar";
import {Footer} from "./UI/Components/Footer";
import {AuthenticatedApp} from "./UI/Components/AuthenticatedApp";
import {AddItem} from "./UI/Pages/AddItem";
import {ShowLocation} from "./UI/Pages/ShowLocation";
import Profile from "./UI/Pages/Profile";
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, loginFromRedux} from "./store/Auth";
import {useEffect} from "react";
import {Items} from "./UI/Pages/Items";
import {Position} from "./UI/Pages/Position";

export const App = () => {

    const storeAuth = useSelector(state => authSelector(state));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let cookie = localStorage.getItem("token");
    let loggedIn;

    loggedIn = cookie === "1234567";

    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(loginFromRedux());
        } else {
            if (!storeAuth) {
                navigate('/Login');
            }
        }

    }, []);

    return (
        <div className="App">
            <Navbar loggedIn={loggedIn}/>
            {loggedIn ? (
                <Routes>
                    <Route path="/"
                           element={<AuthenticatedApp/>}
                    />
                    <Route path="/AddItem"
                           element={<AddItem/>}
                    />
                    <Route path="/ShowLocation"
                           element={<ShowLocation/>}
                    />
                    <Route path="/Profile"
                           element={<Profile/>}
                    />
                    <Route path="/Items"
                           element={<Items/>}
                    />
                    <Route path="/Position"
                           element={<Position/>}
                    />
                    <Route path="/*"
                           element={<AuthenticatedApp/>}
                    />
                </Routes>
            ) : (
                <Routes>
                    <Route path="/Login"
                           element={<Login/>}
                    />
                </Routes>
            )}
            <Footer/>
        </div>
    );
}

export default App;
