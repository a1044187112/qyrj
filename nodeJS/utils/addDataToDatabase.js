var db  =  require('./connectionDB.js');

var addData = {};

// 用户数据
addData.user = function(data){
	var nowDate = (new Date()).getTime();
	console.log(data.name);
	
	var sql = 'INSERT INTO user(`name`,`phone`,`msg`,`createDate`) VALUES(?,?,?,?)'; 
	var param = [data.name,data.phone,data.msg,13];
//	var sql = 'INSERT INTO user(`name`,`phone`,`msg`,`createDate`) VALUES ('+data.name+',"135","rest",12)'; 
	db.query(sql,param,function(results){
		console.log(results);
	});
}

module.exports = addData;
