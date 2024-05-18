import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useState } from "react";
import Timeline from "./components/Timeline";
import Explore from "./components/Explore";
import ExploreEvents from "./components/ExploreEvents";
import DataState from "./context/data/DataState";
import ExploreForm from "./components/ExploreForm";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  return (
    <>
    <DataState>
    <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <div className="mx-5">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/explore" element={<Explore />} />
              <Route exact path="/exploreForm/:eventId" element={<ExploreForm showAlert={showAlert} />} />
              <Route exact path="/explore/:tId/:eId" element={<ExploreEvents />} />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
              <Route
                exact
                path="/events/:id"
                element={<Timeline showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </BrowserRouter>
    </DataState>
    </>
  );
}

export default App;
