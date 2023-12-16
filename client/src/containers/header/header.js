import React from 'react'
import "./header.css";
import { Button } from "../../components/button/button.style";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigateToAllSensors = () => { navigate("/"); }
  const navigateToJournal = () => { navigate("/journal"); }
  return (
    <header>
      <Button theme={!location.pathname.includes("/journal") ? "blue" : "blue_inactive"} onClick={navigateToAllSensors}>Sensors</Button>
      <Button theme={location.pathname.includes("/journal") ? "blue" : "blue_inactive"} onClick={navigateToJournal}>Journal</Button>
    </header>
  )
}

export default Header