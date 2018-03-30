var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var db = require('./utils/connectionDB.js');

var addData = require('./utils/addDataToDatabase.js');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser  = bodyParser.urlencoded({ extended: false }); 

app.use(express.static('public')); // 存放静态文件  图片  css javascript
app.listen(8081);

app.all("*",function(req,res,next){  // 处理跨域问题
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    next();
});

app.get('/', function (req, res) {
//	db.query();
	
	res.send('Hello World');
});

app.post('/user',urlencodedParser,function(req,res){
//	if(!req.body){
//		res.sendStatus(400);
//		return;
//	}
	var response = {
		"name":req.body.name,
		"phone":req.body.phone,
		"msg":req.body.msg
	};
	addData.user(req.body);
	res.end(JSON.stringify(response));
});
