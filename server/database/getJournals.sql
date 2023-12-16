CREATE OR REPLACE FUNCTION getJournals() returns
TABLE (journal_id int, details text, created_date timestamp)  AS $$
begin
    RETURN QUERY SELECT j.journal_id, left(j.details, 50), j.created_date FROM journals as j order by j.created_date desc;
END;
$$ language plpgsql;