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

app.use(Express.static(path.join(__dirname, '..', 'client')));
//处理用户数据
app.post('/login', function(req, res) {
    //先判断用户名是否存在
    connection.query('select * from user where name="' + req.body.name + '"', function(err, result) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        if (result[0]) {
            //存在，进行下一步
            checkPassword(req)
        } else {
            //用户名不存在，返回结果
            res.send(JSON.stringify({
                "status": "用户名不存在"
            }))
        }
    });

    function checkPassword(req) {
        connection.query('select * from user where name="' + req.body.name + '" and password="' + req.body.password + '"', function(err, result) {
            if (err) {
                console.log('[query] - :' + err);
                return;
            }
            if (result[0]) {
                res.send(JSON.stringify({
                    "status": "success"
                }))
            } else {
                //密码错误，返回结果
                res.send(JSON.stringify({
                    "status": "密码错误"
                }))

            }
        });
    }
});
app.post('/signup', function(req, res) {
    //先判断用户名是否存在
    connection.query('select * from user where name="' + req.body.name + '"', function(err, result) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        if (result[0]) {
            //存在，返回结果
            res.send(JSON.stringify({
                "status": "用户名已存在"
            }))
        } else {
            //用户名不存在，进行下一步
            connection.query('INSERT INTO user(name,password) VALUES("' + req.body.name + '","' + req.body.password + '")', function(err, result) {
                if (err) {
                    console.log('[query] - :' + err);
                    return;
                }
                res.send(JSON.stringify({
                    "status": "success"
                }))
            });
        }
    });
});


//处理note数据
app.get('/mynote', function(req, res) {
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

app.post('/editNote', function(req, res) {
    connection.query('update notes set content="' + req.body.content + '",time="' + req.body.time + '" where id=' + req.body.id, function(err, result) {
        if (err) {
            console.log('[query] - :' + err);
            return;
        }
        res.send(success)
    });
});

app.post('/deleteNote', function(req, res) {
    connection.query('delete from notes where id=' + req.body.id, function(err, result) {
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
