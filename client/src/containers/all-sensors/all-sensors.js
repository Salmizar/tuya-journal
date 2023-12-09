import React from 'react'
import * as Utils from '../../utils';
import SensorCard from '../sensor-card/sensor-card';
import { LoadingSpinner } from '../../components/loader/loader.style';
const AllSensors = ({ activeSensor, setLastUpdate }) => {
    const [sensorData, setSensorData] = React.useState(null);
    const updateInterval = 1000 * 30;
    const updateSensor = () => {
        Utils.Fetcher.fetchJSON(`/sensor/${activeSensor.id}`).then((data) => {
            setSensorData(data[0]);
            let lastEventDate = new Date(data[0].created_date);
            let when = Date.now() - lastEventDate.getTime();
            setLastUpdate(when);
        })
    };
    React.useEffect(() => {
        //Get Active Sensor latest data
        if (activeSensor != null) {
            updateSensor();
            const timer = setInterval(() => {
                updateSensor();
            }, updateInterval);
            return () => { clearInterval(timer) };
        }
    }, [activeSensor]);
    return (
        <section>
            {!sensorData ?
                <LoadingSpinner></LoadingSpinner>
                :
                Object.entries(sensorData).map((sensr) => {
                    if (!'sensor_data_id,created_date,sensor_id'.includes(sensr[0])) {
                        return <SensorCard key={sensr[0]} sensorData={sensr} activeSensor={activeSensor}></SensorCard>
                    }
                })}
        </section>
    )
}

export default AllSensors