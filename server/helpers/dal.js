const { Client } = require('pg');
require('dotenv').config();
const useSSL = false;
exports.query = (query, values) => {
    return new Promise(async (resolve, reject) => {
        getClient().then(async (client) => {
            //query('INSERT INTO sensor_data(name) VALUES($1);', [`${name}`]);
            let insertRow = await client.query(query, values);
            resolve(insertRow);
            await client.end();
        },
        (error) => {
            console.error('error', error);
            reject(error);
        });
    });
};
const getClient = () => {
    return new Promise(async (resolve, reject) => {
        const client = new Client({
            host: process.env.PG_HOST,
            port: process.env.PG_PORT,
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE,
            ssl: useSSL,
        });
        await client.connect();
        resolve(client);
    });
};
exports.connect = () => {
    (async () => {
        console.log('Connecting to postgres...');
        const client = new Client({
            host: process.env.PG_HOST,
            port: process.env.PG_PORT,
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE,
            ssl: useSSL,
        });
        await client.connect();
        const res = await client.query('SELECT $1::text as connected', ['Connection to postgres successful!']);
        console.log(res.rows[0].connected);
        await client.end();
    })();
};