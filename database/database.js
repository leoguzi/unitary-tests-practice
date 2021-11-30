import pg from 'pg';

const { Pool } = pg;

const connection = new Pool({
    host: 'localhost',
    port: 5433,
    user: 'postgres',
    password: '123456',
    database: 'memepedia',
});

export default connection;