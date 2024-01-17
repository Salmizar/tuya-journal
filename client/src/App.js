import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListSensors from "./containers/list-sensors/list-sensors";
import Journal from "./containers/journal/journal";
import Header from "./containers/header/header";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
          <Routes>
            <Route path="/" element={<ListSensors />} />
            <Route path="/:sensorId" element={<ListSensors />} />
            <Route path="/sensor/:sensorId/" element={<ListSensors />} />
            <Route path="/journal/" element={<Journal />} />
            <Route path="/journal/:journalId" element={<Journal />} />
            <Route path="/journal/:journalId/edit" element={<Journal />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;