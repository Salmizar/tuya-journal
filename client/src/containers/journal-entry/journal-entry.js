import React, { useState } from 'react'
import './journal-entry.css';
import AllSensors from '../all-sensors/all-sensors';
import * as Utils from '../../utils';
import { LoadingSpinner } from '../../components/loader/loader.style';
import { Button } from '../../components/button/button.style';
import { TextArea } from '../../components/textarea/textarea.style';
import { useNavigate } from 'react-router-dom';
const JournalEntry = ({ journalId }) => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [journalEntry, setJournalEntry] = useState(null);
  const [sensors, setSensors] = React.useState(null);
  const [activeSensor, setActiveSensor] = React.useState(null);
  const [journalDate, setJournalDate] = React.useState(null);
  const selectSensor = (sensor) => {
    setActiveSensor(sensors[sensor[0]]);
  };
  const updateEntry = () => {

  }
  const handleDeleteEntry = () => {
    if (window.confirm('Are you sure you want to delete this Journal entry?')) {

    }
  }
  const handleCancelEntry = () => {
    if (window.confirm('Are you sure?')) {
      if (journalId==='add') {
        navigate('/journal/');
      } else {
        navigate('/journal/'+journalId);
        setEditing(false);
      }
    }
  }
  const handleSaveEntry = () => {

  }
  const handleEditEntry = () => {
    setEditing(!editing);;
    navigate('/journal/'+journalId+((!editing)?'/edit':''));
  }
  React.useEffect(() => {
    const dteFormat = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', };
    if (journalId === 'add') {
      const blankEntry = {
        created_date: Date.now(),
        details: ''
      }
      setJournalEntry(blankEntry);
      setJournalDate(new Intl.DateTimeFormat('en-US', dteFormat).format(new Date()));
    } else if (journalId != undefined) {
      Utils.Fetcher.fetchJSON(`/journal/${journalId}`).then((data) => {
        setJournalEntry(data[0]);
        setJournalDate(new Intl.DateTimeFormat('en-US', dteFormat).format(new Date(data[0].created_date)));
      });
    }
  }, [journalId]);
  React.useEffect(() => {
    Utils.Fetcher.fetchJSON('/sensors').then((data) => {
      setSensors(data);
      let firstKey = Object.keys(data)[0];
      setActiveSensor(data[firstKey]);
    });
  }, [journalEntry]);
  return (
    <>
      <h1>Journal Entry</h1>
      <h2>{journalDate}</h2>
      <div className='entry_sensor_data'>
        <div className="selected_sensor">
          <Button theme="blue">{!activeSensor ? 'loading' : activeSensor.name}&nbsp;&nbsp;<b>v</b></Button>
          <div className='select_sensor'>
            {sensors && Object.entries(sensors).map((sensor, index) => {
              return <div className={activeSensor && activeSensor.id === sensor[1].id ? 'selected' : ''} onClick={() => { selectSensor(sensor) }} key={sensor[1].id}>{sensor[1].name}</div>
            })}
          </div>
        </div>
        {sensors != null && journalEntry ?
          <AllSensors setLastUpdate={null} sensorId={activeSensor.id} captureDate={journalEntry.created_date} size='small'></AllSensors>
          :
          <LoadingSpinner></LoadingSpinner>
        }
      </div>
      <TextArea readOnly={(journalId != 'add' && !editing)} value={journalEntry ? journalEntry.details : ''} onChange={updateEntry}></TextArea>
      <div className='entry_buttons'>
        {editing &&
          <Button theme='red' onClick={handleDeleteEntry}>Delete</Button>
        }
        {(editing || journalId === 'add') &&
          <Button theme='blue_inactive' onClick={handleCancelEntry}>Cancel</Button>
        }
        {(editing || journalId === 'add') ?
          <Button onClick={handleSaveEntry}>Save</Button>
          :
          <Button onClick={handleEditEntry}>Edit</Button>
        }
      </div>
    </>
  )
}

export default JournalEntry