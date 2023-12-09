CREATE OR REPLACE FUNCTION getSensorData( sensr_id VARCHAR(50), cut_off_date TIMESTAMP default null) returns
SETOF sensor_data AS $$
begin
	if cut_off_date is null then
    	RETURN QUERY SELECT * FROM sensor_data WHERE sensor_id = sensr_id order by created_date desc limit 1;
    else
    	RETURN QUERY SELECT * FROM sensor_data WHERE sensor_id = sensr_id and created_date > cut_off_date order by created_date desc;
    end if;
END;
$$ language plpgsql;