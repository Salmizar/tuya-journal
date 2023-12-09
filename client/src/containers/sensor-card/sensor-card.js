import React from 'react'
import "./sensor-card.css";
import { useNavigate } from "react-router-dom";
const SensorCard = ({ sensorData, activeSensor }) => {
    const navigate = useNavigate();
    const formatSensorData = () => {
        switch( sensorData[0]) {
            case "temp":
                return sensorData[1]/10+'°C';
            case "ph":
                return sensorData[1]/100;
            case "tds":
            case "sal":
                return sensorData[1]+' PPM';
            case "ec":
                return sensorData[1]+' US';
            case "sg":
                return sensorData[1]/1000;
        }
    }
    const formatSensorName = () => {
        switch( sensorData[0]) {
            case "temp":
                return "temperature";
            case "ph":
                return "PH";
            case "tds":
                return "total disolved solids";
            case "sal":
                return "salinity";
            case "ec":
                return "electrical conductivity";
            case "sg":
                return "specific gravity";
        }
    }
    const navigateToSensor = () => {
        navigate("/sensor/"+activeSensor.id+"?view="+sensorData[0]);
    };
    return (
        <div title={`View historical ${formatSensorName()} data`} className="card" onClick={navigateToSensor}>
            <img className={'card_ico card_ico_'+sensorData[0]} src={'/images/'+sensorData[0]+'.svg'}></img>
            <div className="card_title">
                {sensorData[0].toUpperCase()}
            </div>
            <div>
                {formatSensorData()}
            </div>
        </div>
    )
}

export default SensorCard