const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan')

const { pool } = require('./conexion');

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

//Routes
app.get('/', (req, res) => {
    res.status(200).json({Message: 'API NodeJS'})
})

app.use('/', require('./routes/testroute'))
app.use('/', require('./routes/loginroute'))
app.use('/', require('./routes/teamsroutes'))
app.use('/', require('./routes/matchesroutes'))

const server = app.listen(4000, function () {
    let host = server.address().address
    let port = server.address().port
    console.log("Starting the Server at the port ", port)
})
