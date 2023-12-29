import React, { useCallback, useState } from 'react';
import './journal.css';
import JournalItem from '../journal-item/journal-item';
import JournalEntry from '../journal-entry/journal-entry';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/button/button.style';
import * as Utils from '../../utils';
import { LoadingSpinner } from '../../components/loader/loader.style';
import Pagination from '../../components/pagination/pagination';
import { Input } from '../../components/input/input.style';
const Journal = () => {
  const navigate = useNavigate();
  const { journalId } = useParams();
  const [journalEntries, setJournalEntries] = useState(null);
  const [journalState, setJournalState] = useState({ perpage: 20, page: 1, total: 0, search: '', entries:[] });
  const setSearch = (search) => {
    const results = journalEntries.filter((entry) => entry.details.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    setJournalState({ ...journalState, search, entries: results, total: results.length });
  }
  const addJournalEntry = () => {
    navigate('/journal/add/');
  };
  const updateJournals = () => {
    Utils.Fetcher.get(`/api/journals/`).then((data) => {
      setJournalState({ ...journalState, total: data.length, entries: data });
      setJournalEntries(data);
    });
  };
  React.useEffect(() => {
    Utils.Fetcher.get(`/api/journals/`).then((data) => {
      setJournalState({ ...journalState, total: data.length, entries: data });
      setJournalEntries(data);
    });
  }, []);
  return (
    <main className='journal'>
      <aside className='journal_nav'>
        {journalEntries === null ?
          <LoadingSpinner></LoadingSpinner>
          :
          Object.entries(journalState.entries).map((entry, index) => {
            if (index >= (journalState.page - 1) * journalState.perpage && index < journalState.page * journalState.perpage) {
              return <JournalItem key={entry[1].journal_id} journalData={entry[1]}></JournalItem>
            } else {
              return null;
            }
          })
        }
      </aside>
      <Pagination paging={journalState} setPaging={setJournalState}></Pagination>
      <aside className='journal_entry'>
        {journalId !== undefined ?
          <JournalEntry journalId={journalId} updateJournals={updateJournals}></JournalEntry>
          :
          <>
            <div className='search_journal_entry'>
              Search Journals: &nbsp;&nbsp;
              <Input
                value={journalState.search}
                title="Type to search journal entries"
                onChange={(e) => setSearch(e.target.value)}
              ></Input>
              {journalState.search !== '' ?
                <img title="Clear search criteria for searching journals" onClick={() => { setSearch('') }} src='../images/close.svg'></img>
                :
                null
              }
            </div>
            <Button title='Add a new journal entry' className='add_journal_entry' onClick={addJournalEntry}>Add Journal Entry</Button>
          </>

        }
      </aside>
    </main>
  );
};

export default Journal;