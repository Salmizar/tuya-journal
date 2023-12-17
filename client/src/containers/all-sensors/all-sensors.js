import React from 'react'
import './all-sensors.css';
import * as Utils from '../../utils';
import SensorCard from '../sensor-card/sensor-card';
import { LoadingSpinner } from '../../components/loader/loader.style';
const AllSensors = ({ setLastUpdate, sensorId, size="normal", captureDate=undefined }) => {
    const [sensorData, setSensorData] = React.useState(null);
    React.useEffect(() => {
        const updateSensor = () => {
            if (sensorId !== undefined) {
                const capDate = new Date(captureDate);
                const url = (captureDate!==undefined)?`/sensor/${sensorId}/entry/${capDate.getTime()}`:`/sensor/${sensorId}`;
                Utils.Fetcher.get(url).then((data) => {
                    setSensorData(data[0]);
                    let lastEventDate = new Date(data[0].created_date);
                    let when = Date.now() - lastEventDate.getTime();
                    if (setLastUpdate!==null) {
                        setLastUpdate(when);
                    }
                });
            }
        };
        //Get Active Sensor latest data
        updateSensor();
        if (captureDate===null) {
            const timer = setInterval(() => {
                updateSensor();
            }, 1000 * 30);
            return () => { clearInterval(timer) };
        }
    }, [setLastUpdate, sensorId, captureDate]);
    return (
        <section className='all_sensors'>
            {!sensorData || sensorId === undefined ?
                <LoadingSpinner></LoadingSpinner>
                :
                Object.entries(sensorData).map((sensor) => {
                    if (!'sensor_data_id,created_date,sensor_id'.includes(sensor[0])) {
                        return <SensorCard key={sensor[0]} sensorData={sensor} size={size}></SensorCard>
                    } else {
                        return null;
                    }
                })}
        </section>
    )
}

export default React.memo(AllSensors)