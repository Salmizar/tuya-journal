import React from 'react'
import { useNavigate } from 'react-router-dom'
import './journal-item.css';
const JournalItem = ({sensor_id}) => {
  const navigate = useNavigate();
  const loadEntry = () => {
    console.log('open', sensor_id);
    navigate(`/journal/${sensor_id}`);
  }
  return (
    <div className='journal_entry' onClick={loadEntry}>
        <div className='journal_title'>Checking on plants, everything looks good!</div>
        <div className='journal_date'>Nov 7 2023</div>
    </div>
  )
}

export default JournalItem