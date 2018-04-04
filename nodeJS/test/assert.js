var assert = require('assert');

var assertTest = {};

assertTest.test = function(){
	var b = true;
	assert(b,'test');   // 当b为true 时  程序正常执行  为false 时  抛出错误
	
	const buf = Buffer.from('runoob','ascii');
	console.log(buf.toString('hex'));
}

module.exports = assertTest;