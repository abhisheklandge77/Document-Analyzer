import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Loader from "./components/Loader/Loader";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";

function App() {
  const [showLoader, setShowLoader] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    if (
      window.location.pathname !== "/signup" &&
      window.location.pathname !== "/login"
    ) {
      setShowNavbar(true);
    }
  }, [window.location.pathname]);

  return (
    <>
      <BrowserRouter>
        {showNavbar && (
          <Navbar setShowNavbar={setShowNavbar} setShowLoader={setShowLoader} />
        )}
        <Routes>
          <Route path="/" element={<Home setShowLoader={setShowLoader} />} />
          <Route
            path="/login"
            element={<Login setShowLoader={setShowLoader} />}
          />
          <Route
            path="/signup"
            element={<Signup setShowLoader={setShowLoader} />}
          />
          <Route
            path="/forgot-password"
            element={<ForgotPassword setShowLoader={setShowLoader} />}
          />
          <Route
            path="/profile"
            element={<Profile setShowLoader={setShowLoader} />}
          />
          <Route
            path="/update-profile"
            element={<UpdateProfile setShowLoader={setShowLoader} />}
          />
          <Route
            path="/reset-password/:id/:token"
            element={
              <ResetPassword
                setShowLoader={setShowLoader}
                setShowNavbar={setShowNavbar}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
      <Loader showLoader={showLoader} />
    </>
  );
}

export default App;
