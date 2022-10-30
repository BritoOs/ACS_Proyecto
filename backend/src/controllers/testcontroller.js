const express = require('express')
const pool = require('../conexion')

async function testquery(req, res) {
    console.log("TEST DATA :");
    pool.query('Select * from countries')
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
}

module.exports = {testquery}