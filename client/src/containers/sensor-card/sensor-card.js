import React from 'react'
import "./sensor-card.css";
import { useNavigate, useParams } from "react-router-dom";
import * as Utils from '../../utils';
const SensorCard = ({ sensorData, size }) => {
    const { sensorId } = useParams();
    const navigate = useNavigate();
    const navigateToSensor = () => {
        let interval = 'hour';
        switch (process.env.REACT_APP_INTERVAL) {
            case 'D':
                interval = 'day';
                break;
            case 'W':
                interval = 'week';
                break;
            case 'M':
                interval = 'month';
                break;
            default://'Yy
                interval = 'year';
                break;
        }
        navigate(`/sensor/${sensorId}?&display=${interval}&view=${sensorData[0]}`);
    };
    return (
        <div title={`View historical ${Utils.Misc.formatSensorName(sensorData[0])} data`} style={{ backgroundColor: Utils.Theme.theme[Utils.Theme.sensorColors[sensorData[0]]].muted }} className="card" onClick={navigateToSensor}>
            <img alt="Sensor Details" className={'card_ico card_ico_' + sensorData[0]} src={'/images/' + sensorData[0] + '.svg'}></img>
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