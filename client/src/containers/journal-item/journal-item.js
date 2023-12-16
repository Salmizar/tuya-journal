import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './journal-item.css';
const JournalItem = ({journalData}) => {
  const navigate = useNavigate();
  const { journalId } = useParams();
  const journalDate = new Intl.DateTimeFormat('en-US').format(new Date(journalData.created_date));
  const loadEntry = () => {
    navigate(`/journal/${journalData.journal_id}`);
  }
  return (
    <div className={'journal_item'+(parseInt(journalId)===journalData.journal_id?' journal_selected':'')} onClick={loadEntry}>
        <div className='journal_title'>{journalData.details}</div>
        <div className='journal_date'>{journalDate}</div>
    </div>
  )
}

export default JournalItem