import React from 'react';
import './view-sensors.css';
import { Button } from "../../components/button/button.style";
import { useParams } from 'react-router-dom';
import * as Utils from '../../utils';
import { useNavigate } from "react-router-dom";
const ViewSensor = () => {
  const navigate = useNavigate();
  const { sensorId } = useParams();
  const params = new URLSearchParams(window.location.search);
  const sensors = params.get("view").split(',');
  const sensorList = ['temp','ph','tds','ec','sal','sg'];
  const sensorColors = {
    temp: "red",
    tds: "gray",
    ph: "phgreen",
    ec: "yellow",
    sal: "lightgray",
    sg: "black  "
  };
  const addSensor = (sensor) => {
    let newSensors = [...sensors, sensor];
    navigate("/sensor/"+sensorId+"/?view="+newSensors.join(","));
  };
  const removeSensor = (sensor) => {
    if (sensors.length>1) {
      let newSensors = sensors.filter((sensr) => { return sensor != sensr});
      navigate("/sensor/"+sensorId+"/?view="+newSensors.join(","));
    } else {
      alert(`You can't remove the last sensor`);
    }
  };
  React.useEffect(() => {
    /*Utils.Fetcher.fetchJSON('/sensors').then((data) => {
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
      if (sensorId === undefined || foundSensor) {
        //First load, or no sensor was found, so auto select the first one
        let firstKey = Object.keys(data)[0];
        navigate("/"+data[firstKey].id);
        setActiveSensor(data[firstKey]);
      }
      setSensors(data);
    })*/
  }, []);
  return (
    <section className='view-sensors'>
      <nav className='sensor_nav'>
        {sensors.map((sensor) => {
          return <Button key={sensor} title={'Remove '+Utils.Misc.formatProperSensorName(sensor)+' Sensor'}
                         onClick={() => { removeSensor(sensor); }}
                         theme={sensorColors[sensor]}>{Utils.Misc.formatProperSensorName(sensor)}</Button>
        })}
        <div className='add_sensor' style={{display: 'inline-block'}}>
          <button title="Add Sensor" className='add_icon'>-</button>
          <div className='add_sensor_list'>
          {sensorList.map(sensor => {
            if (!sensors.includes(sensor)) {
              return <div key={sensor} onClick={() => { addSensor(sensor); }}>{Utils.Misc.formatProperSensorName(sensor)}</div>
            }
        })}
          </div>
        </div>
      </nav>
    </section>
  );
};

export default ViewSensor;