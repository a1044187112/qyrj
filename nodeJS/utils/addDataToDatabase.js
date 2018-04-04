var db  =  require('./connectionDB.js');

var addData = {};

// 添加用户数据
addData.user = function(data){
	var nowDate = (new Date()).getTime();
	console.log(data.name);
	
	var sql = 'INSERT INTO user(`name`,`phone`,`msg`,`createDate`) VALUES(?,?,?,?)'; 
	var param = [data.name,data.phone,data.msg,13];
	db.sqlAddData(sql,param,function(results){
		console.log(results);
	});
}

// 查询案例cases
addData.query = function(classType,fn){
	var sql;
	switch (classType){
		case "all":
			sql = 'select * from project a ,images b where a.classType="all" and a.id=b.belongProject and b.classType=1;' ;  // 查询项目数据
			break;
		case "app":
			sql = 'select * from project a ,images b where a.classType="app" and a.id=b.belongProject and b.classType=1;';  // 查询app数据
			break;
		case "game":
			sql = 'select * from project a ,images b where a.classType="game" and a.id=b.belongProject and b.classType=1;';  // 查询游戏项目数据
			break;
		case "applets":
			sql = 'select * from project a ,images b where a.classType="applets" and a.id=b.belongProject and b.classType=1;';  // 查询小程序数据
			break;
		case "website":
			sql = 'select * from project a ,images b where a.classType="website" and a.id=b.belongProject and b.classType=1;';  // 查询网站项目数据
			break;
		default:
			break;
	}
	db.query(sql,fn);  // 根据id查询项目图片
}

// 查询案例cases
addData.queryDetail = function(id,fn){
	var	sql = 'select * from project a ,images b where a.id='+id+' and b.belongProject='+id+' and b.classType=0;' ;  // 查询项目数据
	console.log(sql);
	db.query(sql,fn);  // 根据id查询项目图片
}
module.exports = addData;
