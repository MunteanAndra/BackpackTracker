import {UnauthenticatedApp} from "./UI/Components/UnauthenticatedApp";
import {Routes, Route} from 'react-router-dom';
import {Login} from "./UI/Pages/Login";
import {Navbar} from "./UI/Components/Navbar";
import {Footer} from "./UI/Components/Footer";

const App = () => {

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path = "/"
                       element = { <UnauthenticatedApp /> }
                />
                <Route path = "/Login"
                       element = { <Login /> }
                />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
