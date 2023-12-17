import React, { useCallback, useState } from 'react'
import './journal-entry.css';
import AllSensors from '../all-sensors/all-sensors';
import * as Utils from '../../utils';
import { LoadingSpinner } from '../../components/loader/loader.style';
import { Button } from '../../components/button/button.style';
import { TextArea } from '../../components/textarea/textarea.style';
import { useLocation, useNavigate } from 'react-router-dom';
const JournalEntry = ({ journalId }) => {
  const dteFormat = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', };
  const navigate = useNavigate();
  const location = useLocation();
  const [editing, setEditing] = useState(location.pathname.includes("/edit"));
  const [journalEntry, setJournalEntry] = useState(null);
  const [sensors, setSensors] = React.useState(null);
  const [activeSensor, setActiveSensor] = React.useState(null);
  const [journalDate, setJournalDate] = React.useState(null);
  const selectSensor = (sensor) => {
    setActiveSensor(sensors[sensor[0]]);
  };
  const updateEntry = (value) => {
    const updatedEntry = { ...journalEntry, details: value };
    setJournalEntry(updatedEntry);
  }
  const handleDeleteEntry = () => {
    if (window.confirm('Are you sure you want to delete this Journal entry?')) {
      Utils.Fetcher.fetchDelete(`/journal/${journalId}`).then((data) => {
        navigate(`/journal/`);
      });
    }
  }
  const handleSaveEntry = () => {
    if (journalEntry.details.length < 3) {
      alert('Try and include some substance in your journal entry.');
      document.getElementById('journal_entry').focus();
    } else if (journalId === 'add') {
      Utils.Fetcher.post(`/journal/`, journalEntry).then((data) => {
        navigate(`/journal/${data[0].journal_id}`);
      });
    } else {
      Utils.Fetcher.put(`/journal/${journalId}`, journalEntry).then((data) => {
        setEditing(!editing);
        navigate('/journal/' + journalId );
        setJournalEntry(data[0]);
        setJournalDate(new Intl.DateTimeFormat('en-US', dteFormat).format(new Date(data[0].created_date)));
      });
      console.log('save existing', journalId);
    }
  }
  const handleEditEntry = () => {
    setEditing(!editing);;
    navigate('/journal/' + journalId + ((!editing) ? '/edit' : ''));
  }
  const handleCancelEntry = () => {
    if (journalId === 'add') {
      navigate('/journal/');
    } else if (window.confirm('Are you sure?')) {
      navigate('/journal/' + journalId);
      getJournalEntry();
      setEditing(false);
    }
  }
  const handleClose = () => {
    navigate('/journal/');
  }
  const getJournalEntry = useCallback(() => {
    const dteFormat = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', };
    if (journalId === 'add') {
      const blankEntry = {
        created_date: Date.now(),
        details: ''
      }
      setJournalEntry(blankEntry);
      setJournalDate(new Intl.DateTimeFormat('en-US', dteFormat).format(new Date()));
    } else if (journalId !== undefined) {
      Utils.Fetcher.get(`/journal/${journalId}`).then((data) => {
        setJournalEntry(data[0]);
        setJournalDate(new Intl.DateTimeFormat('en-US', dteFormat).format(new Date(data[0].created_date)));
      });
    }
  }, [journalId]);
  React.useEffect(() => {
    getJournalEntry();
  }, [journalId, getJournalEntry]);
  React.useEffect(() => {
    Utils.Fetcher.get('/sensors').then((data) => {
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
              return <div
                className={activeSensor && activeSensor.id === sensor[1].id ? 'selected' : ''}
                onClick={() => { selectSensor(sensor) }} key={sensor[1].id}>
                {sensor[1].name}
              </div>
            })}
          </div>
        </div>
        {sensors !== null && journalEntry ?
          <AllSensors setLastUpdate={null} sensorId={activeSensor.id} captureDate={journalEntry.created_date} size='small'></AllSensors>
          :
          <LoadingSpinner></LoadingSpinner>
        }
      </div>
      <TextArea
        id="journal_entry"
        maxLength="1000"
        autoFocus
        readOnly={(journalId !== 'add' && !editing)}
        value={journalEntry ? journalEntry.details : ''}
        onChange={(e) => updateEntry(e.target.value)}>
      </TextArea>
      <div className='entry_buttons'>
        {editing &&
          <Button theme='red' onClick={handleDeleteEntry}>Delete</Button>
        }
        {(editing || journalId === 'add') ?
          <Button theme='blue_inactive' onClick={handleCancelEntry}>Cancel</Button>
          :
          <Button theme='blue_inactive' onClick={handleClose}>Close</Button>
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