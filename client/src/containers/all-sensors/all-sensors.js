import React from 'react';
import './all-sensors.css';
import * as Utils from '../../utils';
import SensorCard from '../sensor-card/sensor-card';
import { LoadingSpinner } from '../../components/loader/loader.style';
const AllSensors = () => {
  const [sensors, setSensors] = React.useState(null);
  const [lastUpdate, setLastUpdate] = React.useState(null);
  const [activeSensor, setActiveSensor] = React.useState(null);
  const [sensorData, setSensorData] = React.useState(null);
  const updateInterval = 1000 * 30;
  const selectSensor = (sensor) => {
    setLastUpdate(null);
    setSensorData(null);
    setActiveSensor(sensors[sensor[0]]);
  };
  const updateSensor = () => {
    Utils.Fetcher.fetchJSON(`/sensor/${activeSensor.id}`).then((data) => {
      setSensorData(data[0]);
      let lastEventDate = new Date(data[0].created_date);
      let when = Date.now() - lastEventDate.getTime();
      setLastUpdate(when);
    })
  };
  React.useEffect(() => {
    Utils.Fetcher.fetchJSON('/sensors').then((data) => {
      setSensors(data);
      let firstKey = Object.keys(data)[0];
      setActiveSensor(data[firstKey]);
    })
  }, []);
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
    <main>
      <nav>
        <div className="selected_sensor">
          <button className='active'>{!activeSensor ? 'loading' : activeSensor.name}&nbsp;&nbsp;<b>v</b></button>
          <div className='select_sensor'>
            {sensors && Object.entries(sensors).map((sensor, index) => {
              return <div className={activeSensor.id === sensor[1].id ? 'selected' : ''} onClick={() => { selectSensor(sensor) }} key={sensor[1].id}>{sensor[1].name}</div>
            })}
          </div>
        </div>
        <div className="last_updated">Last updated: {!lastUpdate ? 'loading' : Utils.Misc.timeSince(lastUpdate)}</div>
      </nav>
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
    </main>
  );
};

export default AllSensors; 