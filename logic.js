window.onload = function(e){

	var tetrimino = document.createElement("div");
	var pantalla = document.getElementById("divplayscreen");

	document.onkeydown = function(e){
		switch(e.keyCode){
			case 37: tetrimino.left(); break;
			case 38: tetrimino.swap(); break;//Up key
			case 39: tetrimino.right(); break;
			case 40: tetrimino.down(); break;
			case 32: tetrimino.instaFall();break;
			case 67: tetrimino.saveTetrimino();break;
			case 13: startGame();break;
		}
	};

	document.onkeyup = function(e){
		switch(e.keyCode){
			case 37: clearInterval(tetrimino._left); tetrimino._left = undefined; break;
			case 39: clearInterval(tetrimino._right); tetrimino._right = undefined; break;
			case 40: clearInterval(tetrimino._down); tetrimino._down = undefined; break;
		}
	};
	
	tscreen = {};
	createTscreen(tscreen);
	tscreen.createAR(pantalla);

	createTetrimino(tetrimino);
	pantalla.appendChild(tetrimino);
	console.log(tscreen.ar);
	document.getElementById("audio").addEventListener('ended', function() {
    	this.currentTime = 0;
    	this.play();
	}, false);
	document.getElementById("audio").play();

	function startGame(){
		if(!tscreen._gamestarted){
			tscreen.resetGame();
			tetrimino.spawn({});
			falling_interval = setInterval(function(){
				tetrimino.down();
			},1000);
			document.getElementById("fade").style.visibility="hidden";
			tscreen._gamestarted = true;
		}
	}
}
