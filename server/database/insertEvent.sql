CREATE OR REPLACE FUNCTION getSensorData( sensr_id VARCHAR(50), cut_off_date TIMESTAMP default null) returns
TABLE (temp int4, ph int4, tds int4, ec int4, sal int4, sg int4, created_date timestamp)  AS $$
declare total_rows integer;
declare total_records integer = 300;
begin
	if cut_off_date is null then
    	RETURN QUERY SELECT sd.temp, sd.ph, sd.tds, sd.ec, sd.sal, sd.sg, sd.created_date FROM sensor_data as sd WHERE sd.sensor_id = sensr_id order by sd.created_date desc limit 1;
    else	
		total_rows := (select COUNT(*) FROM sensor_data as sd WHERE sd.sensor_id = sensr_id and sd.created_date > cut_off_date);
		return QUERY SELECT sd.temp, sd.ph, sd.tds, sd.ec, sd.sal, sd.sg, sd.created_date
		FROM (
			SELECT sd.temp, sd.ph, sd.tds, sd.ec, sd.sal, sd.sg, sd.created_date, row_number() OVER(ORDER BY sd.sensor_data_id ASC) AS row FROM sensor_data as sd
    		WHERE sd.sensor_id = sensr_id and sd.created_date > cut_off_date order by sd.created_date desc
    		) sd
    	where sd.row % round(total_rows / total_records::numeric)  = 0;
    end if;
END;
$$ language plpgsql;