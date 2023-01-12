import {UnauthenticatedApp} from "./UI/Components/UnauthenticatedApp";
import {Routes, Route, useNavigate} from 'react-router-dom';
import {Login} from "./UI/Pages/Login";
import {Navbar} from "./UI/Components/Navbar";
import {Footer} from "./UI/Components/Footer";
import {SignUp} from "./UI/Pages/SignUp";
import {AuthenticatedApp} from "./UI/Components/AuthenticatedApp";
import {AddItem} from "./UI/Pages/AddItem";
import {ShowLocation} from "./UI/Pages/ShowLocation";
import Profile from "./UI/Pages/Profile";
import {Settings} from "./UI/Pages/Settings";
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, loginFromRedux} from "./store/Auth";
import {useEffect} from "react";

export const App = () => {

    const storeAuth = useSelector(state => authSelector(state));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(loginFromRedux());
        } else {
            if (!storeAuth) {
                navigate('/UnauthenticatedApp');
            }
        }

    }, []);

    return (
        <div className="App">
            <Navbar/>
            { storeAuth ? (
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
                    <Route path="/Settings"
                           element={<Settings/>}
                    />
                    <Route path="/Login"
                           element={<Login/>}
                    />
                    <Route path="/SignUp"
                           element={<SignUp/>}
                    />
                </Routes>
            ) : (
                <Routes>
                    <Route path="/UnauthenticatedApp"
                           element={<UnauthenticatedApp/>}
                    />
                </Routes>
            )}
            <Footer/>
        </div>
    );
}

export default App;
