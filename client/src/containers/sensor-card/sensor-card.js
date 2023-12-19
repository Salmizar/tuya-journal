import React from 'react'
import "./sensor-card.css";
import { useNavigate } from "react-router-dom";
import * as Utils from '../../utils';
const SensorCard = ({ sensorData, sensorId, captureDate }) => {
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
            default://'Y'
                interval = 'year';
                break;
        }
        let url = `/sensor/${sensorId}?view=${sensorData[0]}`;
        if (captureDate) {
            let dte = new Date(captureDate);
            url += `&end_date=${(dte.getTime())}&display=hour`;
        } else {
            url += `&display=${interval}`;
        }
        navigate(url);
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