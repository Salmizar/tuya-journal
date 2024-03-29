import React, { useEffect, useReducer } from 'react';
import './journal.css';
import JournalItem from '../journal-item/journal-item';
import JournalEntry from '../journal-entry/journal-entry';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/button/button.style';
import * as Utils from '../../utils';
import { LoadingSpinner } from '../../components/loader/loader.style';
import Pagination from '../../components/pagination/pagination';
import { Input } from '../../components/input/input.style';
import { useQuery, useQueryClient } from '@tanstack/react-query'

const Journal = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { journalId } = useParams();
  const {
    status: statusJournals,
    data: journalEntries
  } = useQuery({
    queryKey: ["journals"],
    queryFn: () => Utils.Fetcher.get(`/api/journals/`)
  })
  useEffect(() => {
    if (journalEntries) {
      updateState({ type: 'entries', entries: journalEntries });
    }
  }, [journalEntries]);

  const stateReducer = (state, action) => {
    switch (action.type) {
      case "entries":
        return { ...state, entries: action.entries };
      case "search":
        const results = journalEntries.filter((entry) => entry.details.toLocaleLowerCase().includes(action.search.toLocaleLowerCase()));
        return { ...state, entries: results, search: action.search };
      case "page":
        return { ...state, page: action.page };
      default:
        return state;
    }
  };
  const [state, updateState] = useReducer(stateReducer, { perpage: 20, page: 1, search: '', entries: [] });
  const setSearch = (search) => {
    updateState({ type: 'search', search: search });
  }
  const addJournalEntry = () => {
    navigate('/journal/add/');
  };
  const updateJournals = () => {
    queryClient.invalidateQueries({
      queryKey: ['journals'],
      refetchType: 'all'
     });
  };
  return (
    <main className='journal'>
      <aside className='journal_nav'>
        {!journalEntries ?
          <LoadingSpinner></LoadingSpinner>
          :
          Object.entries(state.entries).map((entry, index) => {
            if (index >= (state.page - 1) * state.perpage && index < state.page * state.perpage) {
              return <JournalItem key={entry[1].journal_id} journalData={entry[1]}></JournalItem>
            } else {
              return null;
            }
          })
        }
      </aside>
      <Pagination state={state} updateState={updateState}></Pagination>
      <aside className='journal_entry'>
        {journalId !== undefined ?
          <JournalEntry journalId={journalId} updateJournals={updateJournals}></JournalEntry>
          :
          <>
            <div className='search_journal_entry'>
              Search Journals: &nbsp;&nbsp;
              <Input
                value={state.search}
                title="Type to search journal entries"
                onChange={(e) => setSearch(e.target.value)}
              ></Input>
              {state.search !== '' ?
                <img alt="Clear search criteria for searching journals" onClick={() => { setSearch('') }} src='../images/close.svg'></img>
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