import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllSensors from "./containers/all-sensors/all-sensors";
import ViewSensor from "./containers/view-sensor/view-sensor";
import Journal from "./containers/journal/journal";
import Header from "./containers/header/header";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<AllSensors />} />
          <Route path="/sensor/*" element={<ViewSensor />} />
          <Route path="/journal/*" element={<Journal />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;