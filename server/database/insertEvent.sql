CREATE OR REPLACE FUNCTION insertSensorData( created_date TIMESTAMP, sensor_id VARCHAR(50), temp INT, ph INT, tds INT, ec INT, sal INT, sg INT) returns
SETOF sensor_data AS $$
DECLARE new_sensor_data_id INTEGER;
BEGIN
    INSERT INTO sensor_data
    (created_date, sensor_id, temp, ph, tds, ec, sal, sg)
     VALUES
     (created_date, sensor_id, temp, ph, tds, ec, sal, sg) RETURNING sensor_data_id INTO new_sensor_data_id;
    
    RETURN QUERY SELECT * FROM sensor_data WHERE sensor_data_id = new_sensor_data_id;
END;
$$ language plpgsql;