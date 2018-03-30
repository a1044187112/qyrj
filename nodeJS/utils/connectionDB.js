var mysql = require("mysql"); 

var db = {};
var connection = mysql.createConnection({  // 创建连接  确定参数
	host : "localhost",
	user : "root",
	password : "gzqyrj123456",
	database : "qyrj",
	port : "3306",
}); 	
connection.connect(); // 开始连接
db.query = function sqlQuery(sql,param,fn){
		
		connection.query(sql,param,function(error,results,fields){
			if(error){
				throw error;
			}
			console.log(results);
			fn(results);	
		});
	}

//db.insert = function sqlInsert(sql){
//	connection.insert(sql,function(error,results,fields){
//			if(error){
//				throw error;
//			}
//			console.log(results);
//				
//		});
//}

module.exports = db;