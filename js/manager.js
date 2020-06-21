function connect() {
	var ip = query.get("ip") || "localhost";
	var port = query.get("port") || 1235;
	var hasConnection = false;

	var socket = new WebSocket(`ws://${ip}:${port}`);

	socket.addEventListener("open", () => {
		console.log("WebSocket opened");
		hasConnection = true;
	});

	socket.addEventListener("message", (message) => {
		var data = JSON.parse(message.data.replace(/[\u0000\u00ff]/g, ''));
		var command = commands[data.command];

		if (command) {
			command(data.data, data.time);
		}
		else {
			console.log("Unknown Command:", data.command);
		}
	});

	socket.addEventListener("close", () => {
		if(hasConnection) {
			ui.hide();
			ui.timer.stop();
			hasConnection = false;
		}
		console.log("Failed to connect to server, retrying in 3 seconds");
		setTimeout(connect, 3000);
	});
}

connect();