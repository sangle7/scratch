var path = require('path');
var http = require('http');
var Express = require('express');
var bodyParser = require("body-parser");
var mysql = require('mysql');

const app = new Express();
const server = new http.Server(app);

var connection = mysql.createConnection({
    user: 'root', //MySQL认证用户名
    password: '362101', //MySQL认证用户密码
    database: 'scratchUser'
});

const success = {
    "status": "success"
}
connection.connect(function(err) {
    if (err) {
        console.log('[query] - :' + err);
        return;
    }
    console.log('[connection connect]  succeed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ //此项必须在 bodyParser.json 下面,为参数编码
    extended: true
}));

app.post('/login', function(req, res) {
    res.send(JSON.stringify(success))
});
app.get('/', function(req, res) {
    //执行SQL语句
    connection.query('select * from notes where name="' + req.query.user + '"', function(err, result) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        res.set('Access-Control-Allow-Origin', '*');
        res.send(JSON.stringify(result))
    });
});

app.post('/newNote', function(req, res) {
    connection.query('INSERT INTO notes(name,content,time) VALUES("' + req.body.user + '","' + req.body.content + '","' + req.body.time + '")', function(err, result) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        res.send(success)
    });
});



// //关闭connection
// connection.end(function(err) {
//     if (err) {
//         return;
//     }
//     console.log('[connection end] succeed!');
// });

// start the server
const port = process.env.PORT || 7070;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
});
