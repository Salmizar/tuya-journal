CREATE OR REPLACE FUNCTION insertJournalEntry( details text , created_date TIMESTAMP) returns
SETOF journals AS $$
DECLARE new_journal_id INTEGER;
BEGIN
    INSERT INTO journals
    (details, created_date)
     VALUES
     (details, created_date) RETURNING journal_id INTO new_journal_id;

    RETURN QUERY SELECT * FROM journals WHERE journal_id = new_journal_id;
END;
$$ language plpgsql;