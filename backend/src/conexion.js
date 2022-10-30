const Pool = require('pg').Pool;

require('dotenv').config();
  
const pool = new Pool({
    user: 'postgres',
    host: '34.122.250.229',
    database: 'quiniela',
    password: '@dm!n',
    dialect: 'postgres',
    port: '5432'
});
  
pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
})

module.exports = pool;