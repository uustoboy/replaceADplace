let svnUltimate = require('node-svn-ultimate');
let commands = svnUltimate.commands;
let filterFile = require('./util.js');
let replaceADplace = [
	{	//首页
		path:'',
		textReplace:{
			'' : '',  //首页标题1
			'' : '' //首页标题2
		}
	},
	{  //新版 我的侧边侧栏
		path:[
			'', //我的侧边侧栏 测试环境
			''	//我的侧边侧栏 线上环境
		],
		textReplace:{
			'' : '',  //侧边侧栏标题1
			'' : '' //侧边侧栏标题2
		}
	},
	{  //老版 我的侧边侧栏
		path:[
			'',  //老版侧边侧栏 测试环境
			'' //老版侧边侧栏 线上环境
		],
		textReplace:{
			'' : ''  //侧边侧栏标题1
		}
	},
	{  //导航 -> 服务
		path:[
			'',	//新版导航 测试环境
			'', //新版导 线上环境
			// '',  //老版导航 测试环境
			// ''  //老版导航 线上环境
		],
		textReplace:{
			'' : ''  //导航服务标题
		}
	}
];

let svnArr = [];
for(var i=0;i<replaceADplace.length;i++){
	let path = replaceADplace[i].path;
	if( Array.isArray(path) ){
		svnArr.push(...path)
	}else{
		svnArr.push(path)
	}
}
let repTextStart = ()=>{
	for(var i=0;i<replaceADplace.length;i++){
		let path = replaceADplace[i].path;
		let textReplace = replaceADplace[i].textReplace;
		filterFile(path,textReplace);
	}
}

let update = (n)=>{
	svnArr.forEach((val,index,arr)=>{
		commands.update(val,{
	        username: "",
	        password: ""
		},
	    function( err ) {
	    	if(err){
	    		console.log(err)
	    	}else{
	    		console.log( `Update complete` );
	    	}
	    } );
	});
	
}

let commit = ()=>{
	svnArr.forEach((val,index,arr)=>{
		commands.commit( val,{
			username: "",
	        password: "",
	        params: [ '-m "node xxx"' ] // extra parameters to pass
		},
	    function( err ) {
	    	if(err){
	    		console.log(err);
	    	}else{
	    		console.log( `commit complete` );
	    	}
	    } );
	});
}

let cleanup = ()=>{
	commands.cleanup( '',{
			username: "",
	        password: ""
		},
	    function( err ) {
	    	if(err){
	    		console.log(err);
	    	}else{
	    		console.log( `cleanup complete` );
	    	}
	    } );
}

let pro = (cb) =>{
	return new Promise((res,rej)=>{
		let time = null;
		time = setTimeout(()=>{
			clearTimeout(time);
			res(cb());
		},9000);
	});
}
// cleanup();
//俄罗斯套娃;
pro(update)
.then(()=>{
  pro(repTextStart);
})
.then(()=>{
  pro(commit);
});