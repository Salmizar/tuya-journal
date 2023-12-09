import React from 'react';
import './view-sensors.css';
import { Button } from "../../components/button/button.style";
import { useParams } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
const ViewSensor = () => {
  const { sensorId } = useParams();
  React.useEffect(() => {
    let params = new URLSearchParams(window.location.search);
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
    console.log(sensorId, params.get("view"));
  }, []);
  return (
    <section className='view-sensors'>
      <nav className='sensor_nav'>
        <Button theme="black">Temperature</Button>
        <Button theme="green">PH</Button>
      </nav>
    </section>
  );
};

export default ViewSensor;