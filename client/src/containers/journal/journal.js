import React from 'react';
import './journal.css';
import JournalItem from '../journal-item/journal-item';
const Journal = () => {
  const entries = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  return (
    <main>
      <nav className='journal_nav'>
        {Object.keys(entries).map(key => {
          return <JournalItem key={key} sensor_id={key}></JournalItem>
        })}
      </nav>
      <aside>
        
      </aside>
    </main>
  );
};

export default Journal;