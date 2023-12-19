import React from 'react'
import './all-sensors.css';
import * as Utils from '../../utils';
import SensorCard from '../sensor-card/sensor-card';
import { LoadingSpinner } from '../../components/loader/loader.style';
const AllSensors = ({ setLastUpdate, sensorId, size = "normal", captureDate = undefined }) => {
    const [sensorData, setSensorData] = React.useState(null);
    React.useEffect(() => {
        const updateSensor = () => {
            if (sensorId) {
                let url = `/sensor/${sensorId}`;
                const capDate = new Date(captureDate);
                if (captureDate) {
                    url += `/${capDate.getTime()}`;
                }
                Utils.Fetcher.get(url).then((data) => {
                    let when;
                    if (captureDate) {
                        when = Date.now() - capDate.getTime();
                        if (data[0]) {
                            let created_date = new Date(data[0].created_date);
                            if (capDate.getTime() - created_date.getTime() < (Utils.Misc.one.hour/2)) {
                                //Only if recorded entry is within a half hour of capture
                                //date, otherwise reading it outside of accepted range.
                                setSensorData(data[0]);
                            } else {
                                setSensorData([]);
                            }
                        } else {
                            setSensorData([]);
                        }
                    } else {
                        const lastEventDate = new Date(data[0].created_date);
                        when = Date.now() - lastEventDate.getTime();
                        setSensorData((data[0]) ? data[0] : []);
                    }
                    if (setLastUpdate) {
                        setLastUpdate(when);
                    }
                });
            }
        };
        //Get Active Sensor latest data
        setSensorData(null);
        updateSensor();
        if (captureDate === null) {
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
                sensorData.length === 0 ?
                    <div className='no_sensor_data'>
                        No sensor data for this period of was found.
                    </div>
                    :
                    Object.entries(sensorData).map((sensor) => {
                        if (!'sensor_data_id,created_date,sensor_id'.includes(sensor[0])) {
                            return <SensorCard key={sensor[0]} sensorData={sensor} captureDate={captureDate} sensorId={sensorId} ></SensorCard>
                        } else {
                            return null;
                        }
                    })}
        </section>
    )
}

export default React.memo(AllSensors)