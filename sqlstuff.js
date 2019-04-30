const express = require("express");
const app = express();
const fs = require('fs');
app.use(express.static('public'));

var mysql = require('mysql');
var config = require('../config.js');
var con = mysql.createConnection){
	host: config.host,
	database: config.db,
	user: config.user,
	password: config.pw
});

app.get('/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	let data = {};
	con.connect(function(err){
		if (err) throw err;
		console.log("Connected!");
		con.query("SELECT row1,row2,row3,row4,row5 FROM rows", function (err, result, fields) {
			if (err) throw err;
			let smalldata = [];
			for(let i = 0; i < 5; i++){
				for(let j = 0; j < 5; j++){
					smalldata[j] = result[j]["row"+i];
				}
				data[i] = smalldata;
			}
	});
});
let to_send = JSON.stringify(data);
res.send(to_send);
});
app.listen(3000);
