const express = require('express')
const pool = require('../conexion')

async function allteamsquery(req, res) {
    const sql = 'SELECT T.TEAM_ID, T.TEAMNAME, T.FOR_BETTING, T.PRICE, M.USER_ID FROM TEAMS AS T LEFT JOIN USERS_MEMBERSHIP_PAYMENT AS M ON T.TEAM_ID = M.TEAM_ID ORDER BY T.TEAM_ID'
     
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

async function signintoteam(req, res) {
    const sql = 'INSERT INTO USERS_MEMBERSHIP_PAYMENT (USER_ID, TEAM_ID) VALUES ('+ req.body.user_id + ', ' + req.body.team_id + ')'
    console.log(sql)
    pool.query(sql)
        .then(data => {
            console.log(data);
            res.send(data.rows);
        })
}

module.exports = {allteamsquery, newteam, signintoteam}