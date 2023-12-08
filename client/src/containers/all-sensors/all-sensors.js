import React from 'react';
import './all-sensors.css';
const AllSensors = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    let domain = window.location.origin.substring(0, String(window.location).lastIndexOf(":"));
    let port = 3001;
    fetch(`${domain}:${port}/sensors`)
      .then((res) => res.json())
      .then((data) => {
        console.log(Object.keys(data)[0]);
        setData(data.message);
      });
  }, []);
  return (
    <main>
      <button className="active">{!data ? 'loading' : Object.keys(data)[0]}</button>
      <div className="last_updated">Last updated: 9secs ago</div>
    </main>
  );
};

export default AllSensors;