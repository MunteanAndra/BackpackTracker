import {UnauthenticatedApp} from "./UI/Components/UnauthenticatedApp";
import {Routes, Route} from 'react-router-dom';
import {Login} from "./UI/Pages/Login";
import {Navbar} from "./UI/Components/Navbar";
import {Footer} from "./UI/Components/Footer";
import {SignUp} from "./UI/Pages/SignUp";
import {AuthenticatedApp} from "./UI/Components/AuthenticatedApp";

const App = () => {

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path = "/"
                       element = { <UnauthenticatedApp /> }
                />
                <Route path = "/Authenticated"
                       element = { <AuthenticatedApp /> }
                />
                <Route path = "/Login"
                       element = { <Login /> }
                />
                <Route path = "/SignUp"
                       element = { <SignUp /> }
                />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
