module.exports = function(RED) {
	var Fio = require('folders');
	function LocalNode(config) {
		RED.nodes.createNode(this,config);
		var Local = Fio.local();
		var backend = new Local();
		this.on('input', function(msg) {
			console.log("input", msg);
			backend.ls('.', function(err, msg) {
				if(err != null) return node.error("folders local error", msg);
				this.send({"payload": msg});
			});
		});
		this.on('close', function() {
			console.log("close");
		});
		var pipe = this;
		backend.ls('.', function(err, msg) {
			if(err != null) return node.error("folders local error", msg);
			pipe.send({"payload": msg});
		});
	}

	RED.nodes.registerType("folders local" ,LocalNode);
};
