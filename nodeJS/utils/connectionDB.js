var mysql = require("mysql"); 
var fs = require('fs'); //文件模块
var db = {};
var connection = mysql.createConnection({  // 创建连接  确定参数
	host : "39.108.82.221",
	user : "root",
	password : "123456",
	database : "nmbb",
	port : "3306",
}); 	
connection.connect(); // 开始连接
//db.query = function sqlQuery(sql,param,fn){
//		
//		connection.query(sql,param,function(error,results,fields){
//			if(error){
//				throw error;
//			}
//			console.log(results);
//			fn(results);	
//		});
//	}

db.insert = function sqlInsert(res){
	//读取json文件
    fs.readFile('area.json', 'utf-8', function(err, data) {
        if (err) {
            res.send('文件读取失败');
        } else {
          data = JSON.parse(data);
          for(var val in data){
          	var sql = 'INSERT INTO area(`id`,`name`,`parentId`) VALUES(?,?,?)'; 
			var addSqlParams = [val,data[val].name,"0"];
			connection.query(sql,addSqlParams,function(error,results,fields){
				if(error){
					throw error;
				}
				console.log(results);
			});
			
			for(var v in data[val].child){
				var sql = 'INSERT INTO area(`id`,`name`,`parentId`) VALUES(?,?,?)'; 
				var addSqlParams = [v,data[val].child[v].name,val];
				connection.query(sql,addSqlParams,function(error,results,fields){
					if(error){
						throw error;
					}
					console.log(results);
				});
				
				for(var a in data[val].child[v].child){
					var sql = 'INSERT INTO area(`id`,`name`,`parentId`) VALUES(?,?,?)'; 
					var addSqlParams = [a,data[val].child[v].child[a],v];
					connection.query(sql,addSqlParams,function(error,results,fields){
						if(error){
							throw error;
						}
						console.log(results);
					});
				}
			}
			
			
			
          }
           
        }
    });


	

}

module.exports = db;