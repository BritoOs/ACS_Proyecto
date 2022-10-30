const express = require('express')
const pool = require('../conexion')

async function loginquery(req, res) {
    const sql = 'SELECT USER_ID AS TOKEN FROM USERS WHERE EMAIL = \''+ req.body.username +'\' AND PASSWORD = \'' + req.body.password + '\''
     
    pool.query(sql)
        .then(testData => {
            console.log(testData);
            res.send(testData.rows[0]);
        })
}

module.exports = {loginquery}