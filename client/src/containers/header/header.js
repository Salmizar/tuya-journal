import React from 'react'
import "./header.css";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigateToAllSensors = () => { navigate("/"); }
  const navigateToJournal = () => { navigate("/Journal"); }
  return (
    <header>
      <button className={!location.pathname.includes("/Journal") ? "active":"disabled"} onClick={navigateToAllSensors}>Sensors</button>
      <button className={location.pathname.includes("/Journal") ? "active":"disabled"} onClick={navigateToJournal}>Journal</button>
    </header>
  )
}

export default Header