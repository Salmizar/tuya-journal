CREATE OR REPLACE FUNCTION deleteJournalEntry( journalId int)
begin
    DELETE FROM journals as J WHERE j.journal_id = journalId;
END;
$$ language plpgsql;