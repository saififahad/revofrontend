import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aviator from "./aviator/Aviator";
import { BetProvider } from "./aviator/context/BetContext";
import { SettingProvider } from "./context/SettingContext";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import ColorPredict from "./wingo/ColorPredict";
import Ludo from "./ludo/Ludo";
import MainLayout from "./website/Layout/MainLayout";
import Protected from "./routes/Protected";
import ScrollToTopController from "./utils/ScrollToTopController";
import Website from "./website/Website";
import PrivacyPolicy from "./website/Pages/PrivacyPolicy";
import TemsConditions from "./website/Pages/TemsConditions";
import InfoLayout from "./website/Layout/InfoLayout";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowForgot(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowForgot(false);
  };
  const handleForgotPassword = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowForgot(true);
  };
  const handleClose = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowForgot(false);
  };

  return (
    <Router>
      <ScrollToTopController />
      <SettingProvider>
        <BetProvider>
          <AuthProvider>
            <SocketProvider>
              <Routes>
                <Route
                  path="/login"
                  index
                  element={
                    <>
                      <MainLayout
                        showRegister={showRegister}
                        showLogin={showLogin}
                        showForgot={showForgot}
                        handleClose={handleClose}
                        handleRegisterClick={handleRegisterClick}
                        handleLoginClick={handleLoginClick}
                        handleForgotPassword={handleForgotPassword}
                      />
                    </>
                  }
                />
                <Route element={<Protected />}>
                  <Route path="/*" element={<Website />} />
                  <Route path="/aviator/*" element={<Aviator />} />
                  <Route path="/wingo/*" element={<ColorPredict />} />
                </Route>
                {/* Routes using InfoLayout (Navbar + Footer for specific pages) */}
                <Route
                  element={
                    <InfoLayout
                      showRegister={showRegister}
                      showLogin={showLogin}
                      showForgot={showForgot}
                      handleClose={handleClose}
                      handleRegisterClick={handleRegisterClick}
                      handleLoginClick={handleLoginClick}
                      handleForgotPassword={handleForgotPassword}
                    />
                  }
                >
                  <Route path="/privacy_policy" element={<PrivacyPolicy />} />
                  <Route
                    path="/terms_conditions"
                    element={<TemsConditions />}
                  />
                </Route>
              </Routes>
            </SocketProvider>
          </AuthProvider>
        </BetProvider>
      </SettingProvider>
    </Router>
  );
}

export default App;
