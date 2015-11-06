var express = require('express'); 
var app     = express(); 
var server  = require('http').Server(app);
var io      = require('socket.io')(server); 
var bodyParser = require('body-parser'); 

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use(express.static(__dirname + '/public')); 

app.set('view engine', 'ejs'); 
app.set('views', __dirname + '/views'); 

app.get('/', function (req, res) {
    res.render('index.ejs');
}); 

app.post('/:channel',function(req,res){
	var channel = req.params.channel; 
	var data = req.body || null;  

	if( ! data || ! data.message ) 
		return res.status(400).send('bad request'); 

	io.to(channel).emit('message', { 
    	msg: data.message
    });

    res.status(200).json({status: 'sent'}); 

}); 

io.on('connection', function (socket) {

	socket.on('subscribe', function(channel){
		console.log('SUBSCRIPTION', channel);
		socket.join(channel);  
	}); 

}); 

var listener = server.listen(8080, function(){
	console.log('Server started on ', listener.address().port); 
}); 