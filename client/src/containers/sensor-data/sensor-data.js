import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { LoadingSpinner } from '../../components/loader/loader.style';
import './sensor-data.css';
import * as Utils from '../../utils';
import { useParams } from 'react-router-dom';
const SensorData = () => {
    const { sensorId } = useParams();
    const params = new URLSearchParams(window.location.search);
    const displayInterval = params.get("display");
    //var data = [];
    const [data, setData] = React.useState(null);
    const convertDisplayInterval = () => {
        switch(displayInterval) {
            case "year":
                return Utils.Misc.one.year;
            case "month":
                return Utils.Misc.one.month;
            case "week":
                return Utils.Misc.one.week;
            case "day":
                return Utils.Misc.one.day;
            case "hour":
                return Utils.Misc.one.hour;
        }
        return 0
    }
    React.useEffect(() => {
        let cutOffDate = Date.now() - convertDisplayInterval();
        console.log(`/sensor/${sensorId}/${cutOffDate}`, displayInterval);
        console.log(data);
        Utils.Fetcher.fetchJSON(`/sensor/${sensorId}/${cutOffDate}`).then((results) => {
            //console.log(`result`,results);
            let dat = new Array();
            Object.entries(results).map((entry) => {
                let dte = new Date(Date.parse(entry[1].created_date));
                console.log('entry', new Intl.DateTimeFormat('en', { hour: '2-digit', minute:'2-digit' }).format(dte));
                dat.push({
                    "name": new Intl.DateTimeFormat('en', { hour: '2-digit', minute:'2-digit' }).format(dte),
                    "temperature": entry[1].temp,
                    "PH": entry[1].ph 
                });
            });
            //console.log('dat',dat);
            setData(dat);
        })
    }, [sensorId, displayInterval]);
    return (
        <div className='sensor_data'>
            {false &&
                <LoadingSpinner></LoadingSpinner>
            }
            <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#CF4307" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#CF4307" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#96c300" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#96c300" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="temperature" stroke="#CF4307" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" dataKey="PH" stroke="#96c300" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SensorData