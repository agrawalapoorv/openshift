/*
 * GET home page.
 */

exports.index = function(req, res){

var Client = require('node-rest-client').Client;
	var client = new Client();

	// direct way
	client.get("https://gumballmachinepivotal.cfapps.io/gumballs.json", function(data, response){
var a={};
a=data;
var collection=[];
collection.push(a[0].modelNumber);
collection.push(a[0].serialNumber);
collection.push("NoCoinState");
collection.push(a[0].countGumballs);
res.render('gumball', { gm: collection });
});
};

exports.gumballdisp=function(req,res){
	
	var event=req.param('event');
	var state=req.param('state');
	var count=req.param('count');
	var modelno=req.param('modelno');
	var serialno=req.param('serialno');
	console.log(event + state + count + modelno +serialno);

	if(event==='InsertQuater' && state==='NoCoinState'){
		
		state='HasACoin';
		var collection=[];
		collection.push(modelno);
		collection.push(serialno);
		collection.push(state);
		collection.push(count);
		console.log(event + state + count + modelno +serialno);
		res.render('index', { gm: collection });
		
	}
	if(event==='TurnTheCrank' && state==='HasACoin'){
		var Collection_Post=[];
		var Client = require('node-rest-client').Client;
		var client = new Client();
		client.get("https://gumballmachinepivotal.cfapps.io/gumballs.json", function(data, response){
			var a={};
            
            a=data;
            
            var count=a[0].countGumballs;
            console.log("value of the " + count);
            
            if(count!==0){
            	count=count-1;
            	var args = {
            			  data: { countGumballs: count },
            			  headers:{"Content-Type": "application/json"} 
            			};
            	client.put("https://gumballmachinepivotal.cfapps.io/gumballs/1", args, function(data,response) {
            	      // parsed response body as js object
            	    console.log(data);
            	    // raw response
            	    console.log(response);
            	    var collection=[];
            	    Collection_Post.push(modelno);
            	    Collection_Post.push(serialno);
            	    Collection_Post.push("NoCoinState");
            	    Collection_Post.push(count);
            		res.render('gumball', { gm: Collection_Post });
            	});
            	
            }
			
			
		});
		
		
	}
	
};