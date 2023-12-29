import React, { useState } from 'react';
import './journal.css';
import JournalItem from '../journal-item/journal-item';
import JournalEntry from '../journal-entry/journal-entry';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/button/button.style';
import * as Utils from '../../utils';
import { LoadingSpinner } from '../../components/loader/loader.style';
import Pagination from '../../components/pagination/pagination';
const Journal = () => {
  const navigate = useNavigate();
  const { journalId } = useParams();
  const [journalEntries, setJournalEntries] = useState(null);
  const [journalPaging, setJournalPaging] = useState({ perpage: 20, page: 1, total: 0 });
  const addJournalEntry = () => {
    navigate('/journal/add/');
  };
  const updateJournals = () => {
    Utils.Fetcher.get(`/api/journals/`).then((data) => {
      setJournalPaging({...journalPaging, total:data.length});
      setJournalEntries(data);
    });
  };
  React.useEffect(() => {
    Utils.Fetcher.get(`/api/journals/`).then((data) => {
      setJournalPaging({...journalPaging, total:data.length});
      setJournalEntries(data);
    });
  }, []);
  return (
    <main className='journal'>
      <aside className='journal_nav'>
        {journalEntries === null ?
          <LoadingSpinner></LoadingSpinner>
          :
          Object.entries(journalEntries).map((journal_entry, i) => {
            if (i>=(journalPaging.page-1) * journalPaging.perpage && i < journalPaging.page * journalPaging.perpage) {
              return <JournalItem key={journal_entry[1].journal_id} journalData={journal_entry[1]}></JournalItem>
            } else {
              return null;
            }
          })
        }
      </aside>
      <Pagination paging={journalPaging} setPaging={setJournalPaging}></Pagination>
      <aside className='journal_entry'>
        {journalId !== undefined ?
          <JournalEntry journalId={journalId} updateJournals={updateJournals}></JournalEntry>
          :
          <Button className='add_journal_entry' onClick={addJournalEntry}>Add Journal Entry</Button>

        }
      </aside>
    </main>
  );
};

export default Journal;