const Pool = require('pg').Pool
const path = require('path')
const fs = require('fs');
require('dotenv').config()


const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT
});

const sqlScriptPath = path.join(__dirname, 'sampleTablesAndData.sql');
const pgScript = fs.readFileSync(sqlScriptPath, 'utf-8');
// console.log({ pgScript });
pool.query(pgScript, (error, results) => {
    if (error) {
        console.log('Error running scripts', error);
    }
    else {
        console.log({results});
        console.log('Script executed successfully');
    }
    process.exit(1);
})

