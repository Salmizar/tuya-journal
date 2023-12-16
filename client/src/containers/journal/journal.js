import React, { useState } from 'react';
import './journal.css';
import JournalItem from '../journal-item/journal-item';
import JournalEntry from '../journal-entry/journal-entry';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/button/button.style';
import * as Utils from '../../utils';
import { LoadingSpinner } from '../../components/loader/loader.style';
const Journal = () => {
  const navigate = useNavigate();
  const { journalId } = useParams();
  const [journalEntries, setJournalEntres] = useState(null);
  const addJournalEntry = () => {
    navigate('/journal/add/');
  };
  React.useEffect(() => {
    Utils.Fetcher.fetchJSON(`/journals/`).then((data) => {
      setJournalEntres(data);
    });
  }, []);
  return (
    <main className='journal'>
      <nav className='journal_nav'>
        {journalEntries === null ?
          <LoadingSpinner></LoadingSpinner>
          :
          Object.entries(journalEntries).map((journal_entry) => {
            return <JournalItem key={journal_entry[1].journal_id} journalData={journal_entry[1]}></JournalItem>
          })
        }
      </nav>
      <aside className='journal_entry'>
        {journalId != undefined ?
          <JournalEntry journalId={journalId}></JournalEntry>
          :
          <Button className='add_journal_entry' onClick={addJournalEntry}>Add Journal Entry</Button>

        }
      </aside>
    </main>
  );
};

export default Journal;