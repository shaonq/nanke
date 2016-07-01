var express = require('express');
var router = express.Router();
var crypto = require('crypto'), sha1 =function (data) { return crypto.createHash('sha1').update(data).digest('hex'); };
/*mysql */
var mysql = require('mysql');
var conn,mysql_new_conn = function  () {
  var fn = arguments.callee;
  conn = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'yy_jiangnan', port: 3306});
  conn.connect(function (err) {  //连接错误，2秒重试
    if (err) {
      console.log('error when connecting to db:', err);
      setTimeout( fn, 2000);
    }
  });
  conn.on('error', function (err) {
    console.log('db error', err);// 如果是连接断开，自动重新连接
    if (err.code === 'PROTOCOL_CONNECTION_LOST') { fn(); } else { throw err; }
  });
  return fn;
}();
/* GET users listing. */
router.post('/login', function(req, res, next) {
  var data = {status:4}
    , user =req.body.user
    ,pass =req.body.pass;
  if(user&&pass){
    pass =sha1(pass);
   var q= conn.query('SELECT COUNT(*) AS count FROM user WHERE user = ? AND pass = ?',[user,pass],function(err, rows) {
     if (err) throw err;
     data.status =0;
     data.user =rows[0];
     var userInfo ={
         user:user
         ,name:"南柯一梦"
         ,motto:"这个就是心情了"
     };
    if(data.user.count === 1) res.cookie('user', userInfo,{maxAge:7*24*60*60*1000});
     console.log(q.sql);
     //res.json(data);
       res.redirect('/users/');
    });
  }else {
    data.error="用户名或密码不能为空";
    res.json(data);
  }
});
router.get('/', function(req, res, next) {
    var data={};data.user = req.cookies.user;
    if(data.user){
        res.render('users/index',data);
    }else {
        res.redirect('/');
    }
});

module.exports = router;
