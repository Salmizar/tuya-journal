import React from 'react'
import "./sensor-card.css";
import { useNavigate, useParams } from "react-router-dom";
import * as Utils from '../../utils';
const SensorCard = ({ sensorData }) => {
    const { sensorId } = useParams();
    const navigate = useNavigate();
    const navigateToSensor = () => {
        navigate("/sensor/"+sensorId+"?&display=hour&view="+sensorData[0]);
    };
    return (
        <div title={`View historical ${Utils.Misc.formatSensorName(sensorData[0])} data`} className="card" onClick={navigateToSensor}>
            <img alt="Sensor Details" className={'card_ico card_ico_'+sensorData[0]} src={'/images/'+sensorData[0]+'.svg'}></img>
            <div className="card_title">
                {sensorData[0].toUpperCase()}
            </div>
            <div>
                {Utils.Misc.formatSensorData(sensorData)}
            </div>
        </div>
    )
}

export default SensorCard