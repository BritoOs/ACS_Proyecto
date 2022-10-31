const express = require('express')
const pool = require('../conexion')

async function allmatchesquery(req, res) {
    const sql = `SELECT M.MATCH_ID, C1.FLAG AS FLAG1, C1.COUNTRY AS OPPONENT1, M.OPPONENT1GOLS, M.OPPONENT2GOLS, C2.COUNTRY AS OPPONENT2, C2.FLAG AS FLAG2, M.MATCHDATE, M.MATCHTIME, M.STADIUM
    FROM 
        COUNTRIES AS C1, COUNTRIES AS C2, MATCHES AS M 
    WHERE 
        C1.COUNTRY_ID = M.OPPONENT1 AND C2.COUNTRY_ID = M.OPPONENT2`
     
    pool.query(sql)
        .then(data => {
            console.log(data);
            res.send(data.rows);
        })
}

module.exports = {allmatchesquery}