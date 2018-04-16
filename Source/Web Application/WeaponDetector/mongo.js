var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var app = express();

var url = 'mongodb://admin:admin@ds127963.mlab.com:27963/hackathon_login'; //mongodb://<dbuser>:<dbpassword>@ds239128.mlab.com:39128/<dbname>

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/verifyCredentials', function (req, res) {
    debugger;
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to the database");
            res.end();
        }

        var dbase = db.db("hackathon_login");
        dbase.collection('LoginDB').find({"username": req.query.username, "password": req.query.password}).toArray(function(err, result){
            if(err)
            {
                res.write("Failed, Error while connecting to the database");
                res.end();
            }else
            {
                res.send(JSON.stringify(result));
            }
            db.close();
        });
    });
});



var server = app.listen(8082, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Hackathon app listening at http://%s:%s", host, port)
});