import React from 'react';
import './list-sensors.css';
import * as Utils from '../../utils';
import { Button } from "../../components/button/button.style";
import AllSensors from '../all-sensors/all-sensors';
import ViewSensor from '../view-sensors/view-sensors';
import { useParams } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
const ListSensors = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sensors, setSensors] = React.useState(null);
  const [lastUpdate, setLastUpdate] = React.useState(null);
  const [activeSensor, setActiveSensor] = React.useState(null);
  const { sensorId } = useParams();
  const selectSensor = (sensor) => {
    setLastUpdate(null);
    setActiveSensor(sensors[sensor[0]]);
    navigate("/"+sensor[1].id);
  };
  React.useEffect(() => {
    Utils.Fetcher.fetchJSON('/sensors').then((data) => {
      let foundSensor = false;
      if (sensorId != undefined) {
        //they supplied a sensor, make sure its in the list
        Object.keys(data).map((key) => {
          if (sensorId === data[key].id) {
            foundSensor = true;
            setActiveSensor(data[key]);
          }
        });
      }
      if (sensorId === undefined || !foundSensor) {
        //First load, or no sensor was found, so auto select the first one
        let firstKey = Object.keys(data)[0];
        navigate("/"+data[firstKey].id);
        setActiveSensor(data[firstKey]);
      }
      setSensors(data);
    })
  }, []);
  return (
    <main>
      <nav>
        <div className="selected_sensor">
          <Button theme="blue">{!activeSensor ? 'loading' : activeSensor.name}&nbsp;&nbsp;<b>v</b></Button>
          <div className='select_sensor'>
            {sensors && Object.entries(sensors).map((sensor, index) => {
              return <div className={activeSensor && activeSensor.id === sensor[1].id ? 'selected' : ''} onClick={() => { selectSensor(sensor) }} key={sensor[1].id}>{sensor[1].name}</div>
            })}
          </div>
        </div>
        <div className="last_updated">Last updated: {!lastUpdate ? 'loading' : Utils.Misc.timeSince(lastUpdate)}</div>
      </nav>
      {location.pathname.includes('/sensor/') ?
        <ViewSensor></ViewSensor>
        :
        <AllSensors activeSensor={activeSensor} setLastUpdate={setLastUpdate}></AllSensors>
      }
    </main>
  );
};

export default ListSensors; 