document.getElementById("t1").innerHTML = 'I comming.';
require.ensure([], function () {//这里是异步的
	console.log("进入require.ensure回调")
	require("./module.js");
	require("./module2.js");
	console.log("调用完require.ensure")
});
require.ensure([], function () {//这里是异步的
	require("./module3.js");
});
