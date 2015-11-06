function Pshr(config){
	var config = config || {}; 
	this._url = config.url || location.host; 
	this._schema = config.schema || 'ws';  
};   

Pshr.prototype.subscribe = function(channel){
	var url = [this._schema, this._url].join('://'); 
	
	this.socket = io.connect(url);
	this.socket.emit('subscribe', channel); 
	this.socket.on('message', function(data){
		console.log('recieved message', data); 
	}); 
} 

p = new Pshr(); 
p.subscribe('hey'); 
	   