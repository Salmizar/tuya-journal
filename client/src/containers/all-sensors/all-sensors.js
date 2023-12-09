import React from 'react'
import * as Utils from '../../utils';
import SensorCard from '../sensor-card/sensor-card';
import { LoadingSpinner } from '../../components/loader/loader.style';
import { useParams } from 'react-router-dom';
const AllSensors = ({ setLastUpdate }) => {
    const { sensorId } = useParams();
    const [sensorData, setSensorData] = React.useState(null);
    const updateInterval = 1000 * 30;
    const updateSensor = () => {
        if (sensorId!= undefined) {
            Utils.Fetcher.fetchJSON(`/sensor/${sensorId}`).then((data) => {
                setSensorData(data[0]);
                let lastEventDate = new Date(data[0].created_date);
                let when = Date.now() - lastEventDate.getTime();
                setLastUpdate(when);
            })
        }
    };
    React.useEffect(() => {
        //Get Active Sensor latest data
        //if (activeSensor != null) {
            updateSensor();
            const timer = setInterval(() => {
                updateSensor();
            }, updateInterval);
            return () => { clearInterval(timer) };
        //}
    }, [sensorId]);
    return (
        <section>
            {!sensorData || sensorId === undefined ?
                <LoadingSpinner></LoadingSpinner>
                :
                Object.entries(sensorData).map((sensr) => {
                    if (!'sensor_data_id,created_date,sensor_id'.includes(sensr[0])) {
                        return <SensorCard key={sensr[0]} sensorData={sensr}></SensorCard>
                    }
                })}
        </section>
    )
}

export default AllSensors