import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/loginPage/LoginPage";
import MainPage from "./components/mainPage/MainPage";
import CreateGraphPage from "./components/createGraphPage/CreateGraphPage";
import ViewPage from "./components/viewPage/ViewPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/create" element={<CreateGraphPage />} />
        <Route path="/view/:id" element={<ViewPage />} />
      </Routes>
    </Router>
  );
};

export default App;
