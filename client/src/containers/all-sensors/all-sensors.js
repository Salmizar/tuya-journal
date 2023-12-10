import React from 'react'
import * as Utils from '../../utils';
import SensorCard from '../sensor-card/sensor-card';
import { LoadingSpinner } from '../../components/loader/loader.style';
import { useParams } from 'react-router-dom';
const AllSensors = ({ setLastUpdate }) => {
    const { sensorId } = useParams();
    const [sensorData, setSensorData] = React.useState(null);
    React.useEffect(() => {
        const updateSensor = () => {
            if (sensorId !== undefined) {
                Utils.Fetcher.fetchJSON(`/sensor/${sensorId}`).then((data) => {
                    setSensorData(data[0]);
                    let lastEventDate = new Date(data[0].created_date);
                    let when = Date.now() - lastEventDate.getTime();
                    setLastUpdate(when);
                });
            }
        };
        //Get Active Sensor latest data
        updateSensor();
        const timer = setInterval(() => {
            updateSensor();
        }, 1000 * 30);
        return () => { clearInterval(timer) };
    }, [setLastUpdate, sensorId]);
    return (
        <section>
            {!sensorData || sensorId === undefined ?
                <LoadingSpinner></LoadingSpinner>
                :
                Object.entries(sensorData).map((sensr) => {
                    if (!'sensor_data_id,created_date,sensor_id'.includes(sensr[0])) {
                        return <SensorCard key={sensr[0]} sensorData={sensr}></SensorCard>
                    }
                    return ''
                })}
        </section>
    )
}

export default AllSensors