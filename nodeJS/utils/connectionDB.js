var mysql = require("mysql"); 

var db = {};
var connection = mysql.createConnection({  // 创建连接  确定参数
	host : "localhost",
	user : "root",
	password : "gzqyrj123456",
	database : "qyrj",
	port : "3306",
}); 	
connection.connect(); // 
db.sqlAddData = function sqlAddData(sql,param,fn){  // 添加
		
		connection.query(sql,param,function(error,results,fields){
			if(error){
				throw error;
			}
			console.log(results);
			fn(results);	
		});
	}

db.query = function sqlQuery(sql,fn){
	connection.query(sql,function(error,results,fields){
			if(error){
				throw error;
			}
			console.log(results);
			fn(results);	
		});
}
 

module.exports = db;