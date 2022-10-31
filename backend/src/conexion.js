const Pool = require('pg').Pool;

require('dotenv').config();

    const user = process.env.USER
    const host = process.env.HOST
    const database = process.env.DATABASE
    const password = process.env.PASSWORD
    const port = process.env.PORT
  
const pool = new Pool({
    user: user,
    host: host,
    database: database,
    password: password,
    dialect: 'postgres',
    port: port
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