import './view-sensor.css';
import { Button } from "../../components/button/button.style";
import { useParams } from 'react-router-dom';
import * as Utils from '../../utils';
import { useNavigate } from "react-router-dom";
import SensorData from '../sensor-data/sensor-data';
const ViewSensor = ({ setLastUpdate }) => {
  const navigate = useNavigate();
  const { sensorId } = useParams();
  const params = new URLSearchParams(window.location.search);
  const sensors = params.get("view").split(',');
  const displayInterval = params.get("display");
  const sensorList = ['temp', 'ph', 'tds', 'ec', 'sal', 'sg'];
  const displayIntervals = ['Year', 'Month', 'Week', 'Day', 'Hour'];
  const end_date = params.get("end_date");
  const addSensor = (sensor) => {
    let newSensors = [...sensors, sensor];
    navigateTo(displayInterval, newSensors.join(","));
  };
  const removeSensor = (sensor) => {
    if (sensors.length > 1) {
      let newSensors = sensors.filter((sensr) => { return sensor !== sensr });
      navigateTo(displayInterval, newSensors.join(","));
    } else {
      alert(`You can't remove the last sensor`);
    }
  };
  const updateDisplayInterval = (newInterval) => {
    navigateTo(newInterval, sensors.join(","));
  };
  const navigateTo = (newInterval, sensorList) => {
    let url = `/sensor/${sensorId}?display=${newInterval}&view=${sensorList}`;
    if (params.get('end_date')) {
      url += `&end_date=${params.get('end_date')}`;
    }
    navigate(url);
  };
  return (
    <section className='view_sensor'>
      <div className='view_sensor_date'>{(end_date) ? Utils.Misc.formatDate(parseInt(end_date)) : ''}</div>
      <nav className='sensor_nav'>
        {sensors.map((sensor) => {
          return <Button
            key={sensor}
            title={'Remove ' + Utils.Misc.formatProperSensorName(sensor) + ' Sensor'}
            onClick={() => { removeSensor(sensor); }}
            theme={Utils.Theme.sensorColors[sensor]}
            >
            {Utils.Misc.formatProperSensorName(sensor)}
          </Button>
        })}
        <div className='add_sensor' style={{ display: sensors.length < sensorList.length ? 'inline-block' : 'none' }}>
          <button title="Add Sensor" className='add_icon'>-</button>
          <div className='add_sensor_list'>
            {sensorList.map(sensor => {
              if (!sensors.includes(sensor)) {
                return <div key={sensor} onClick={() => { addSensor(sensor); }}>{Utils.Misc.formatProperSensorName(sensor)}</div>
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </nav>
      <aside className='sensor_aside'>
        {displayIntervals.map(interval => {
          return <Button key={interval} onClick={() => { updateDisplayInterval(interval.toLowerCase()) }}
            theme={displayInterval === interval.toLowerCase() ? 'blue' : 'blue_inactive'}>{interval}</Button>
        })}
        <div className='sensor_chart'>
          <SensorData setLastUpdate={setLastUpdate}></SensorData>
        </div>
      </aside>
    </section>
  );
};

export default ViewSensor;