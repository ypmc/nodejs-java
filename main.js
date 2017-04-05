var json = require("JSON2");
var log4js = require('log4js');

log4js.configure({
    appenders: [
        {
            type: "file",
            filename: "test.txt",
            category: [ 'test','console' ]
        },
        {
            type: "console"
        }
    ],
    replaceConsole: false
});

var logger = log4js.getLogger('test');
logger.setLevel('debug');

function parserequest(info,res){
	logger.debug(info);
	var exec = require('child_process').exec, child;
	var exec_path = "java -jar Test.jar " + info.id ;
	var data;
	child = exec(exec_path,function (error, stdout, stderr){	
		logger.debug(stdout);	
		
		data = "{errcode:0,errmsg:'" + stdout +"'}"
		res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8;'}); 
		res.end(JSON.stringify(data));
	
		if(error !== null){
			logger.debug('stderr: ' + stderr);
			logger.debug('exec error: ' + error);
			data = "{errcode:500,errmsg:'" + error + "'}"
			res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8;'}); 
			res.end(JSON.stringify(data));
		}
	});

	
	
}

var http = require('http');  
var server = http.createServer();  
var querystring = require('querystring');  
var url = require("url");

var welcome = function(res){  
    res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8;'});  
	html = {errcode:0,errmsg:''}
    res.end(JSON.stringify(html));  
}  
  

var getPersonalID = function(req,res,params){	
	parserequest(params,res);
}  
var getPersonalIDEx = function(req,res){
	res.writeHead(500, {'Content-Type': 'text/html'});
	var data =  {errcode:500,errmsg:"request is not recognized"} 
	logger.debug(data);
	res.end(JSON.stringify(data));
}

var requests = function (req, res){  
	logger.debug(req.url);
	
	if(req.url == '/'){  
        	return welcome(res);  
    } 
	if(req.method =='GET'){		
		var params = url.parse(req.url, true).query;
		getPersonalID(req,res,params);
	}else{
		getPersonalIDEx(req,res);
	}
}  
  
server.on('request',requests);  
server.listen(1337, "127.0.0.1");    
logger.debug("Server running at http://127.0.0.1:1337/");
 