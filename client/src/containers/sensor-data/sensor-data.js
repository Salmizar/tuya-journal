import React from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { LoadingSpinner } from '../../components/loader/loader.style';
import './sensor-data.css';
import * as Utils from '../../utils';
import { useParams } from 'react-router-dom';
const SensorData = ({ setLastUpdate }) => {
    const { sensorId } = useParams();
    const params = new URLSearchParams(window.location.search);
    const displayInterval = params.get("display");
    const sensors = params.get("view");
    const end_date = params.get("end_date");
    const sensorAxis = {
        temp: "left",
        ph: "left",
        sg: "left",
        tds: "right",
        ec: "right",
        sal: "right"
    };
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        let url = `/api/sensor/${sensorId}/`;
        if (end_date) {
            let interval = Utils.Misc.one[displayInterval]/2;
            let startDate = parseInt(end_date) - interval;
            let endDate = parseInt(end_date) + interval;
            url += `${startDate}/${endDate}`;
        } else {
            let endDate = Date.now();
            let startDate = endDate - Utils.Misc.one[displayInterval];
            url += `${startDate}/${endDate}`;
        }
        Utils.Fetcher.get(url).then((results) => {
            let dat = [];
            Object.entries(results).forEach((entry) => {
                let dataPoint = {};
                let dteFormat = {};
                switch (displayInterval) {
                    case "hour":
                        dteFormat = { hour: '2-digit', minute: '2-digit' };
                        break;
                    case "day":
                        dteFormat = { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' };
                        break;
                    case "week":
                    case "month":
                        dteFormat = { day: '2-digit', month: '2-digit' };
                        break;
                    default://"year"
                        dteFormat = { day: '2-digit', month: '2-digit', year: '2-digit' };
                        break;
                };
                let dte = new Date(Date.parse(entry[1].created_date));
                dataPoint.name = new Intl.DateTimeFormat('en', dteFormat).format(dte);
                sensors.split(',').forEach((sensor) => {
                    dataPoint[sensor] = Utils.Misc.formatSensorData([sensor, entry[1][sensor]], false);
                });
                dat.push(dataPoint);
            });
            if (results.length > 0) {
                let lastEventDate = new Date(results[results.length - 1].created_date);
                let when = Date.now() - lastEventDate.getTime();
                setLastUpdate(when);
            }
            setData(dat);
        });
    }, [setLastUpdate, sensorId, displayInterval, sensors, end_date]);
    return (
        <div className='sensor_data'>
            {!data ?
                <LoadingSpinner></LoadingSpinner>
                :
                data.length === 0 ?
                    <div>No Data for this period</div>
                    :
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                {Object.entries(data[0]).map((dataEntry) => {
                                    if (dataEntry[0] !== 'name') {
                                        return <linearGradient key={dataEntry} id={'color' + dataEntry[0]} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%"
                                                stopColor={Utils.Theme.theme[Utils.Theme.sensorColors[dataEntry[0]]].default}
                                                stopOpacity={Utils.Theme.sensorColorOpacity[dataEntry[0]]}
                                            />
                                            <stop offset="95%"
                                                stopColor={Utils.Theme.theme[Utils.Theme.sensorColors[dataEntry[0]]].default}
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    } else {
                                        return null;
                                    }
                                })
                                }
                            </defs>
                            <XAxis dataKey="name" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            {Object.entries(data[0]).map((dataEntry) => {
                                if (dataEntry[0] !== 'name') {
                                    return <Area
                                        key={dataEntry}
                                        yAxisId={sensorAxis[dataEntry[0]]}
                                        type="monotone"
                                        dataKey={dataEntry[0]}
                                        stroke={Utils.Theme.theme[Utils.Theme.sensorColors[dataEntry[0]]].default}
                                        fillOpacity={1}
                                        fill={'url(#color' + dataEntry[0] + ')'}
                                    />
                                } else {
                                    return null;
                                }
                            })
                            }
                        </AreaChart>
                    </ResponsiveContainer>
            }
        </div>
    )
}

export default SensorData