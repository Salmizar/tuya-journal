import React from 'react';
import './list-sensors.css';
import * as Utils from '../../utils';
import { Button } from "../../components/button/button.style";
import AllSensors from '../all-sensors/all-sensors';
import ViewSensor from '../view-sensor/view-sensor';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { LoadingSpinner } from '../../components/loader/loader.style';
import useSensors from '../../hooks/useSensors';
const ListSensors = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sensorId } = useParams();
  const {sensors, activeSensor, setActiveSensor} = useSensors();
  const [lastUpdate, setLastUpdate] = React.useState(null);
  const selectSensor = (sensor) => {
    setLastUpdate(null);
    setActiveSensor(sensors[sensor[0]]);
    navigate("/" + sensor[1].id);
  };
  React.useEffect(() => {
    if (sensors) {
      let foundSensor = false;
      if (sensorId !== undefined) {
        //they supplied a sensor, make sure its in the list
        Object.keys(sensors).forEach((key) => {
          if (sensorId === sensors[key].id) {
            foundSensor = true;
            setActiveSensor(sensors[key]);
          }
        });
      }
      if (sensorId === undefined || !foundSensor) {
        //First load, or no sensor was found, auto select the first one
        let firstKey = Object.keys(sensors)[0];
        navigate("/" + sensors[firstKey].id);
        setActiveSensor(sensors[firstKey]);
      }
    }
  }, [sensors, sensorId, navigate, setActiveSensor]);
  return (
    <main className='sensor_main'>
      <nav>
        <div className="selected_sensor">
          <Button theme="blue">{!activeSensor ? 'loading' : activeSensor.name}&nbsp;&nbsp;<b>v</b></Button>
          <div className='select_sensor'>
            {sensors && Object.entries(sensors).map((sensor, index) => {
              return <div className={activeSensor && activeSensor.id === sensor[1].id ? 'selected' : ''} onClick={() => { selectSensor(sensor) }} key={sensor[1].id}>{sensor[1].name}</div>
            })}
          </div>
        </div>
        <div className="last_updated">{!lastUpdate ? 'loading' : Utils.Misc.timeSince(lastUpdate)}</div>
      </nav>
      {activeSensor ?
        location.pathname.includes('/sensor/') ?
          <ViewSensor setLastUpdate={setLastUpdate}></ViewSensor>
          :
          <AllSensors setLastUpdate={setLastUpdate} sensorId={sensorId}></AllSensors>
        :
        <LoadingSpinner></LoadingSpinner>
      }
    </main>
  );
};

export default ListSensors; 