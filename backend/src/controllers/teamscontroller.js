const express = require('express')
const pool = require('../conexion')

async function allteamsquery(req, res) {
    const sql = 'SELECT * FROM TEAMS'
     
    pool.query(sql)
        .then(data => {
            console.log(data);
            res.send(data.rows);
        })
}

async function newteam(req, res) {
    const sql = 'INSERT INTO TEAMS (TEAMNAME, FOR_BETTING, PRICE) VALUES (\''+ req.body.teamname + '\', ' + req.body.for_betting + ',' + req.body.price + ')'
    console.log(sql)
    pool.query(sql)
        .then(data => {
            console.log(data);
            res.send(data.rows);
        })
}

module.exports = {allteamsquery, newteam}