function createTscreen(tscreen){

	tscreen._score = 0;
	tscreen._gamestarted = false;

	tscreen.createAR = function(pantalla){
		tscreen.ar = [];
		for(var y = 0;y < 20; y++){
			tscreen.ar[y] = [];
			for(var x = 0;x < 10;x++){
				var newdiv = document.createElement("div");
				pantalla.appendChild(newdiv);
				newdiv.setAttribute("id",y+"."+x);
				newdiv.style.width = "30px";
				newdiv.style.height = "30px";
				newdiv.style.left = (x * 30) + "px";
				newdiv.style.top = (y * 30) + "px";
				newdiv.style.float = "left";
				newdiv.style.position = "absolute";
				newdiv.style.backgroundSize = "100% 100%";
				tscreen.ar[y][x] = [false,"white"];
			}
		}
	};

	tscreen.resetGame = function(){
		for(var y = 0;y < 20; y++){
			for(var x = 0;x < 10;x++){
				var squarediv = document.getElementById(y + "." + x);
				squarediv.style.backgroundColor = "white";
                squarediv.style.backgroundImage = "none";
				tscreen.ar[y][x] = [false,"white"];
			}
		}
	};

	tscreen.addScore = function(score){
		this._score += score;
		document.getElementById("score").innerHTML = this._score;
	};

	tscreen.setScore = function(score){
		this._score = score;
		document.getElementById("score").innerHTML = this._score;
	};

	tscreen.gameOver = function(){
		clearInterval(falling_interval);
		document.getElementById("fade").innerHTML = "<h1 style='color:yellow;text-align:center;'>Tu puntuación ha sido de "+ tscreen._score + " </h1><h3 style='color:yellow;text-align:center;'>Pulsa enter para empezar de nuevo el juego</h3>";
		document.getElementById("fade").style.visibility="visible";
		tscreen.setScore(0);
		tscreen._gamestarted = false;
	}
}
