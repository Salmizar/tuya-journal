CREATE OR REPLACE FUNCTION updateJournalEntry( update_journal_id int, updated_details text, updated_created_date TIMESTAMP) returns
SETOF journals AS $$
BEGIN
    UPDATE journals SET details = updated_details, created_date = updated_created_date WHERE journal_id = update_journal_id;
   
	RETURN QUERY SELECT * FROM journals WHERE journal_id = update_journal_id;
END;
$$ language plpgsql;