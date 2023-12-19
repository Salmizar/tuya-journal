CREATE OR REPLACE FUNCTION getSensorData( sensr_id VARCHAR(50), start_date TIMESTAMP default null, end_date TIMESTAMP default null) returns
TABLE (temp int4, ph int4, tds int4, ec int4, sal int4, sg int4, created_date timestamp)  AS $$
declare total_rows integer = 0;
declare total_records integer = 300;
begin
	if start_date is not null and end_date is not null then
		total_rows := (select COUNT(*) FROM sensor_data as sd WHERE sd.sensor_id = sensr_id and sd.created_date > start_date and sd.created_date < end_date);
		return QUERY SELECT sd.temp, sd.ph, sd.tds, sd.ec, sd.sal, sd.sg, sd.created_date
		FROM (
			SELECT sd.temp, sd.ph, sd.tds, sd.ec, sd.sal, sd.sg, sd.created_date, row_number() OVER(ORDER BY sd.sensor_data_id ASC) AS row FROM sensor_data as sd
    		WHERE sd.sensor_id = sensr_id and sd.created_date > start_date and sd.created_date < end_date order by sd.created_date asc
    		) sd
    	where sd.row % greatest( round(total_rows / total_records::numeric),0.1)  = 0;
    elsif end_date is not null then
    	RETURN QUERY SELECT sd.temp, sd.ph, sd.tds, sd.ec, sd.sal, sd.sg, sd.created_date FROM sensor_data as sd
    				 WHERE sd.sensor_id = sensr_id and sd.created_date	< end_date order by sd.created_date desc limit 1;
    else
    	RETURN QUERY SELECT sd.temp, sd.ph, sd.tds, sd.ec, sd.sal, sd.sg, sd.created_date FROM sensor_data as sd
    				 WHERE sd.sensor_id = sensr_id order by sd.created_date desc limit 1;
    end if;
END;
$$ language plpgsql;