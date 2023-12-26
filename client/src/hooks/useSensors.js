import { useEffect, useState } from 'react'
import * as Utils from '../utils';
const useSensors = () => {
    const [sensors, setSensors] = useState(null);
    const [activeSensor, setActiveSensor] = useState(null);
    useEffect(() => {
        Utils.Fetcher.get('/sensors').then((data) => {
            setSensors(data);
            let firstKey = Object.keys(data)[0];
            setActiveSensor(data[firstKey]);
        });
    }, []);
    return {
        sensors,
        activeSensor,
        setActiveSensor
    }

}
export default useSensors;