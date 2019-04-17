
//------------------------------------------------------------------------------
// Setup canvas stuff!
var ctx = c.getContext("2d");

(window.onresize = () => {
	c.width = window.innerWidth;
	c.height = window.innerHeight;
	ctx.textBaseline = "alphabetic";
	ctx.font = "60px Fredericka the Great";
})();

//------------------------------------------------------------------------------
// Rendering stuff!

var pastCommands = [];
var command = "";
var text = [
	"You awaken in a dark room.",
	"It's so dark that you can't see a thing.",
];

var noise = new Image();
noise.src = "noise.png";
var noisePattern = ctx.createPattern(noise, "repeat");

function draw() {

	// Background.
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, c.width, c.height);
	ctx.globalAlpha = 0.05;
	var shake = 40;
	var rx = Math.round(-2 + Math.random() * 4) * shake;
	var ry = Math.round(-2 + Math.random() * 4) * shake;
	for (var x=-shake*2; x<c.width; x+=noise.width||100)
	for (var y=-shake*2; y<c.height; y+=noise.height||100) {
		ctx.drawImage(noise, x+rx, y+ry);
	}
	ctx.globalAlpha = 1;

	// Text.
	ctx.fillStyle = "#FFF";
	ctx.textAlign = "center";
	var lineHeight = 90;
	var y = c.height/2 - (text.length-1)*lineHeight/2 - 60;
	for (var n=0; n<text.length; n++)
		ctx.fillText(text[n], c.width/2+Math.random(), y+n*lineHeight+Math.random());

	// Command.
	ctx.textAlign = "left";
	ctx.fillText(`> ${command}`, 20, c.height-60);

}

//------------------------------------------------------------------------------
// Command stuff!
document.addEventListener("keydown", e => {
	switch (e.key) {
		case ("Backspace"): command = command.slice(0, -1); break;
		case ("Enter"): submitCommand(); break;
		default: if (e.key.length === 1) command += e.key; break;
	}
});

function submitCommand() {
	text.push(command);
	// SEND TO SERVER
	pastCommands.push(command);
	command = "";
}

//------------------------------------------------------------------------------
// Loop stuff!
setInterval(() => {
	//requestAnimationFrame(loop);
	draw();
}, ~~(1000/20));
