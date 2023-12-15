DO $do$
BEGIN
	/*Revoke public access*/
	REVOKE ALL ON DATABASE tuyajournal FROM public;
	
	/*Create role*/
	CREATE ROLE tuyajournalusers WITH NOLOGIN;
	
	/*Grant permissions to role*/
	GRANT CONNECT ON DATABASE tuyajournal TO tuyajournalusers;
	GRANT USAGE, SELECT , UPDATE ON all sequences IN schema public TO tuyajournalusers;
	GRANT SELECT, UPDATE, DELETE, INSERT, REFERENCES ON ALL TABLES IN SCHEMA public TO tuyajournalusers;
	
	/*Create user*/
	CREATE ROLE tuyajournaluser LOGIN INHERIT IN ROLE tuyajournalusers PASSWORD 'change_me';

	/*pgAdmin bug where valid until is not properly set on password change*/
	ALTER USER tuyajournaluser VALID UNTIL 'infinity';

	/*Create tables and their foreign key references*/
	CREATE TABLE IF NOT EXISTS sensor_data (
		sensor_data_id serial PRIMARY KEY,
		created_date TIMESTAMP NOT NULL,
		sensor_id VARCHAR ( 50 ) NOT NULL,
		temp INT NOT NULL,
		ph INT NOT NULL,
		tds INT NOT NULL,
		ec INT NOT NULL,
		sal INT NOT NULL,
		sg INT NOT NULL
	);
	CREATE TABLE IF NOT EXISTS journals (
		journal_id serial PRIMARY KEY,
		created_date TIMESTAMP NOT NULL,
		details TEXT NOT NULL
	);
END
$do$