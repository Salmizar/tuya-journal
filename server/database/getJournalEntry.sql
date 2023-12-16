CREATE OR REPLACE FUNCTION getJournalEntry( journalId int) returns
setof journals  AS $$
begin
    RETURN QUERY SELECT * FROM journals as j WHERE j.journal_id = journalId;
END;
$$ language plpgsql;