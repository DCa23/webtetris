function createTetrimino(tetrimino){
	tetrimino.speed = 1;
	tetrimino.style.zIndex = 1;
	tetrimino.style.position = "relative";
	tetrimino.style.float = "left";
	tetrimino.style.backgroundSize = "100% 100%";

	tetrimino.setForm = function(forma){
		if(!forma){
			var num = (Math.floor(Math.random() * 7) + 1);
			if(num == 1){
				tetrimino.forma = "cuadrado";
			}else if(num == 2){
				tetrimino.forma = "palo";
			}else if(num == 3){
				tetrimino.forma = "Z";
			}else if(num == 4){
				tetrimino.forma = "ZI";
			}else if(num == 5){
				tetrimino.forma = "SC";
			}else if(num == 6){
				tetrimino.forma = "L1";
			}else if(num == 7){
				tetrimino.forma = "L2";
			}
		}else{
			tetrimino.forma = forma;
		}
		tetrimino.swp = "initial";
	};

	tetrimino.setWH = function(W,H){
		this._w = W;
		this._h = H;
	}

	tetrimino.setXY = function(X,Y){
		this._x = X;
		this._y = Y;
	};

	tetrimino.setInitialMeasure = function(){
		if(this.forma === "palo"){
			tetrimino.col = "azul";
			tetrimino.setWH(4,1);
			tetrimino.position = [[0,3],[0,4],[0,5],[0,6]];
			tetrimino.style.backgroundImage = "url('img/t4l.png')";
		}else if(this.forma==="cuadrado"){
			tetrimino.col = "amarillo";
			tetrimino.setWH(2,2);
			tetrimino.position = [[0,3],[0,4],[1,3],[1,4]];
			tetrimino.style.backgroundImage = "url('img/t5.png')";
		}else if(this.forma==="Z"){
			tetrimino.col = "rojo";
			tetrimino.setWH(3,2);
			tetrimino.position = [[0,3],[0,4],[1,4],[1,5]];
			tetrimino.style.backgroundImage = "url('img/t7i.png')";
		}else if(this.forma==="ZI"){
			tetrimino.col = "naranja";
			tetrimino.setWH(3,2);
			tetrimino.position = [[0,5],[0,4],[1,4],[1,3]];
			tetrimino.style.backgroundImage = "url('img/t6i.png')";
		}else if(this.forma==="SC"){
			tetrimino.col = "rosa";
			tetrimino.setWH(3,2);
			tetrimino.position = [[0,4],[1,3],[1,4],[1,5]];
			tetrimino.style.backgroundImage = "url('img/t3i.png')";
		}else if(this.forma==="L1"){
			tetrimino.col = "lila";
			tetrimino.setWH(3,2);
			tetrimino.position = [[0,5],[1,3],[1,4],[1,5]];
			tetrimino.style.backgroundImage = "url('img/t1i.png')";
		}else if(this.forma==="L2"){
			tetrimino.col = "verde";
			tetrimino.setWH(3,2);
			tetrimino.position = [[0,3],[1,3],[1,4],[1,5]];
			tetrimino.style.backgroundImage = "url('img/t2i.png')";
		}
		tetrimino.setXY(3,0);
	};

	tetrimino.spawn = function(op){
		tetrimino.setForm(op.forma);
		tetrimino.setInitialMeasure();
		tetrimino.updatepos();
		tetrimino.updatesize();

		if(tetrimino.isTraped()){
			tscreen.gameOver();
		}
	};

	tetrimino.updatepos = function(){
		tetrimino.style.left = (tetrimino._x * 30) + "px";
		tetrimino.style.top = (tetrimino._y * 30)+ "px";
	};

	tetrimino.updatesize = function(){
		tetrimino.style.width = (tetrimino._w * 30) + "px";
		tetrimino.style.height = (tetrimino._h * 30) + "px";
	};

	tetrimino.grey = function(){
		for(var i = 0; i < 4;i++){
			tscreen.ar[tetrimino.position[i][0]][tetrimino.position[i][1]][0] = true;
			tscreen.ar[tetrimino.position[i][0]][tetrimino.position[i][1]][1] = tetrimino.col;
			var cuadrao = document.getElementById(tetrimino.position[i][0]+"." + tetrimino.position[i][1]);
			cuadrao.style.backgroundImage = "url('img/c/"+tetrimino.col+".png')";
		}
	};

	tetrimino.canMoveDown = function(){
		if(tetrimino._y + tetrimino._h >= 20) return false;
		if(tscreen.ar[tetrimino.position[0][0] + 1][tetrimino.position[0][1]][0] || tscreen.ar[tetrimino.position[1][0] + 1][tetrimino.position[1][1]][0] || tscreen.ar[tetrimino.position[2][0] + 1][tetrimino.position[2][1]][0] || tscreen.ar[tetrimino.position[3][0] + 1][tetrimino.position[3][1]][0]) return false; 
		return true;
	};

	tetrimino.canMoveLeft = function(){
		if(tetrimino._x <= 0)return false;
		if(tetrimino._x + tetrimino._w >= 10) return true;
		if(tscreen.ar[tetrimino.position[0][0]][tetrimino.position[0][1] - 1][0] || tscreen.ar[tetrimino.position[1][0]][tetrimino.position[1][1] - 1][0] || tscreen.ar[tetrimino.position[2][0]][tetrimino.position[2][1] - 1][0] || tscreen.ar[tetrimino.position[3][0]][tetrimino.position[3][1] - 1][0]) return false;
		return true;
	};

	tetrimino.canMoveRight = function(){
		if(tetrimino._x + tetrimino._w >= 10) return false;
		if(tscreen.ar[tetrimino.position[0][0]][tetrimino.position[0][1] + 1][0] || tscreen.ar[tetrimino.position[1][0]][tetrimino.position[1][1] + 1][0] || tscreen.ar[tetrimino.position[2][0]][tetrimino.position[2][1] + 1][0] || tscreen.ar[tetrimino.position[3][0]][tetrimino.position[3][1] + 1][0]) return false;
		return true;
	};

	tetrimino.right = function(){
		if(this._right) return;
		this._right = setInterval(function(){
			if(!tetrimino.canMoveRight()) return;
			tetrimino._x = tetrimino._x + tetrimino.speed;
			for(var i = 0; i < 4; i++){
				tetrimino.position[i][1]+=1;
			}
			tetrimino.updatepos();
		},75);
	};

	tetrimino.left = function(){
		if(this._left) return;
		this._left = setInterval(function(){
			if(!tetrimino.canMoveLeft()) return;
			tetrimino._x = tetrimino._x - tetrimino.speed;
			for(var i = 0; i < 4; i++){
				tetrimino.position[i][1]-=1;
			}
			tetrimino.updatepos();
		},75);
	};


	tetrimino.internalLeft = function(){
		if(this._left) return;
		if(!tetrimino.canMoveLeft()) return;
		tetrimino._x = tetrimino._x - tetrimino.speed;
		for(var i = 0; i < 4; i++){
			tetrimino.position[i][1]-=1;
		}
		tetrimino.updatepos();
	};

	tetrimino.down = function(){
		if(this._down) return;
		if(tetrimino.canMoveDown()){	
			tetrimino._y = tetrimino._y + tetrimino.speed;
			for(var i = 0; i < 4; i++){
				tetrimino.position[i][0]+=1;
			}
			tetrimino.updatepos();
		}else{
			tetrimino.grey();
			tetrimino.checkTetris();
			tetrimino.spawn({});
			tetrimino.uSaved = false;
		}
	};

	tetrimino.saveTetrimino = function(){
		var current = tetrimino.forma;
		if(!tetrimino.uSaved){
			tetrimino.spawn({forma:tetrimino.saved})
			tetrimino.uSaved = true;
			tetrimino.saved = current;
			var urlimg = "";
			if(current == "cuadrado"){urlimg = "t5.png";}else if(current == "palo"){urlimg = "t4l.png";}else if(current == "Z"){urlimg = "t7i.png";}else if(current == "ZI"){urlimg = "t6i.png";}else if(current == "SC"){urlimg = "t3i.png";}else if(current == "L1"){urlimg = "t1i.png";}else if(current == "L2"){urlimg = "t2i.png";}
			document.getElementById("holdimg").innerHTML = "<img src='img/"+urlimg+"' />";
		}
	}

	tetrimino.checkTetris = function(){
		var ltetris = [];var total = 0;
		for(var line = 0;line < 20;line++){
			for(var sq = 0;sq < 10; sq++){
				if(!tscreen.ar[line][sq][0]) break;
				if(sq == 9){
					tscreen.addScore(10);
					ltetris[total] = line;
					total++;
				}
			}
		}
		for(var i = 0; i < total;i++){
			var copyLine;
			var prevLine = [[false,"white"],[false,"white"],[false,"white"],[false,"white"],[false,"white"],[false,"white"],[false,"white"],[false,"white"],[false,"white"],[false,"white"]]
			for(var x = 0; x <= ltetris[i];x++){
				copyLine = tscreen.ar[x].slice();
				tscreen.ar[x] = prevLine.slice();
				prevLine = copyLine.slice();
				for(var cl = 0;cl < 10;cl++){//Repintar lineas
					var cuadrao = document.getElementById( x + "." + cl);
					if(tscreen.ar[x][cl][0]){
						console.log(tscreen.ar[x][cl][1]);
						cuadrao.style.backgroundImage = "url('img/c/"+tscreen.ar[x][cl][1]+".png')";
					}else{
						cuadrao.style.backgroundImage = "url('')";
					}
				}
			}
		}
	};


	tetrimino.fitin = function(){
		while(tetrimino._x + tetrimino._w > 10){
			if(tetrimino.canMoveLeft()){
				tetrimino.internalLeft();
			}
		}
	};

	tetrimino.instaFall = function(){
		while(tetrimino.canMoveDown()){
			tetrimino.down();
		}tetrimino.down();
	};

	tetrimino.isTraped = function(){
		return tscreen.ar[tetrimino.position[0][0]][tetrimino.position[0][1]][0] || tscreen.ar[tetrimino.position[1][0]][tetrimino.position[1][1]][0] || tscreen.ar[tetrimino.position[2][0]][tetrimino.position[2][1]][0] ||tscreen.ar[tetrimino.position[3][0]][tetrimino.position[3][1]][0];
		return false;
	}
	tetrimino.swap = function(){
		
		var prevPosition = tetrimino.position.slice();
		var prevBackground = tetrimino.style.backgroundImage;
		var prev_w = tetrimino._w;var prev_h = tetrimino._h;
		var prev_y = tetrimino._y;var prev_x = tetrimino._x;
		var prevSWP = tetrimino.swp.slice();
		if(tetrimino.forma ==="cuadrado"){
			console.log("trololol");
		}else if(tetrimino.forma ==="palo"){
			if(tetrimino.swp === "initial"){
				tetrimino.swp = "vertical";
				tetrimino.position[1] = [tetrimino.position[0][0] + 1,tetrimino.position[0][1]];
				tetrimino.position[2] = [tetrimino.position[0][0] + 2,tetrimino.position[0][1]];
				tetrimino.position[3] = [tetrimino.position[0][0] + 3,tetrimino.position[0][1]];
				tetrimino.setWH(1,4);
				tetrimino.style.backgroundImage = "url('img/t4i.png')";
			}else if(tetrimino.swp === "vertical"){
				tetrimino.swp = "initial";
				tetrimino.position[1] = [tetrimino.position[0][0],tetrimino.position[0][1] + 1];
				tetrimino.position[2] = [tetrimino.position[0][0],tetrimino.position[0][1] + 2];
				tetrimino.position[3] = [tetrimino.position[0][0],tetrimino.position[0][1] + 3];
				tetrimino.setWH(4,1);
				tetrimino.style.backgroundImage = "url('img/t4l.png')";
			}
		}else if(tetrimino.forma ==="Z"){
			if(tetrimino.swp === "initial"){
				tetrimino.position[0] = [tetrimino.position[0][0],tetrimino.position[0][1] + 1];
				tetrimino.position[1] = [tetrimino.position[0][0] + 1,tetrimino.position[0][1]];
				tetrimino.position[2] = [tetrimino.position[0][0] + 1,tetrimino.position[0][1] - 1];
				tetrimino.position[3] = [tetrimino.position[0][0] + 2,tetrimino.position[0][1] - 1];
				tetrimino.setWH(2,3);
				tetrimino.style.backgroundImage = "url('img/t7l.png')";
				tetrimino.swp = "vertical";
			}else if(tetrimino.swp === "vertical"){
				tetrimino.position[0] = [tetrimino.position[0][0],tetrimino.position[0][1] - 1];
				tetrimino.position[1] = [tetrimino.position[0][0],tetrimino.position[0][1] + 1];
				tetrimino.position[2] = [tetrimino.position[0][0] + 1,tetrimino.position[0][1] + 1];
				tetrimino.position[3] = [tetrimino.position[0][0] + 1,tetrimino.position[0][1] + 2];
				tetrimino.setWH(3,2);
				tetrimino.style.backgroundImage = "url('img/t7i.png')";
				tetrimino.swp = "initial";
			}
		}else if(tetrimino.forma==="ZI"){
			if(tetrimino.swp === "initial"){
				tetrimino.position[0] = [tetrimino.position[0][0] + 2,tetrimino.position[0][1] - 1];
				tetrimino.position[1] = [tetrimino.position[0][0] - 1,tetrimino.position[0][1]];
				tetrimino.position[2] = [tetrimino.position[0][0] - 1,tetrimino.position[0][1] - 1];
				tetrimino.position[3] = [tetrimino.position[0][0] - 2,tetrimino.position[0][1] - 1];

				tetrimino.setWH(2,3);
				tetrimino.style.backgroundImage = "url('img/t6l.png')";
				tetrimino.swp = "vertical";
			}else if(tetrimino.swp === "vertical"){
				tetrimino.position[0] = [tetrimino.position[0][0] - 2,tetrimino.position[0][1] + 1];
				tetrimino.position[1] = [tetrimino.position[0][0],tetrimino.position[0][1] - 1];
				tetrimino.position[2] = [tetrimino.position[0][0] + 1,tetrimino.position[0][1] - 1];
				tetrimino.position[3] = [tetrimino.position[0][0] + 1,tetrimino.position[0][1] - 2];
				tetrimino.setWH(3,2);
				tetrimino.style.backgroundImage = "url('img/t6i.png')";
				tetrimino.swp = "initial";
			}
		}else if(tetrimino.forma==="SC"){
			if(tetrimino.swp === "initial"){
				tetrimino.position[0] = [tetrimino.position[0][0] + 1,tetrimino.position[0][1]];
				tetrimino.position[1] = [tetrimino.position[0][0] - 1,tetrimino.position[0][1] - 1];
				tetrimino.position[2] = [tetrimino.position[0][0] ,tetrimino.position[0][1] - 1];
				tetrimino.position[3] = [tetrimino.position[0][0] + 1,tetrimino.position[0][1] - 1];
				tetrimino.setWH(2,3);
				tetrimino.style.backgroundImage = "url('img/t3r.png')";
				tetrimino.swp = "right";
			}else if(tetrimino.swp === "right"){
				tetrimino.position[0] = [tetrimino.position[0][0] ,tetrimino.position[0][1]];
				tetrimino.position[1] = [tetrimino.position[0][0] - 1,tetrimino.position[0][1] - 1];
				tetrimino.position[2] = [tetrimino.position[0][0] - 1,tetrimino.position[0][1]];
				tetrimino.position[3] = [tetrimino.position[0][0] - 1,tetrimino.position[0][1] + 1];

				tetrimino.setWH(3,2);
				tetrimino.style.backgroundImage = "url('img/t3d.png')";
				tetrimino.swp = "down";
			}else if(tetrimino.swp === "down"){
				tetrimino.position[0] = [tetrimino.position[0][0] ,tetrimino.position[0][1] - 1];
				tetrimino.position[1] = [tetrimino.position[0][0] - 1,tetrimino.position[0][1] + 1];
				tetrimino.position[2] = [tetrimino.position[0][0] ,tetrimino.position[0][1] + 1];
				tetrimino.position[3] = [tetrimino.position[0][0] + 1,tetrimino.position[0][1] + 1];
				tetrimino.setWH(2,3);
				tetrimino.style.backgroundImage = "url('img/t3l.png')";
				tetrimino.swp = "left";
			}else if(tetrimino.swp === "left"){
				tetrimino.position[0] = [tetrimino.position[0][0] ,tetrimino.position[0][1] + 1];
				tetrimino.position[1] = [tetrimino.position[0][0] + 1,tetrimino.position[0][1] - 1];
				tetrimino.position[2] = [tetrimino.position[0][0] + 1,tetrimino.position[0][1]];
				tetrimino.position[3] = [tetrimino.position[0][0] + 1,tetrimino.position[0][1] + 1];
				tetrimino.setWH(3,2);
				tetrimino.style.backgroundImage = "url('img/t3i.png')";
				tetrimino.swp = "initial";
			}
		}else if(tetrimino.forma==="L1"){
			if(tetrimino.swp === "initial"){
				tetrimino.position[0] = [tetrimino.position[0][0] + 2,tetrimino.position[0][1] -1];
				tetrimino.position[1] = [tetrimino.position[0][0] ,tetrimino.position[0][1] -1];
				tetrimino.position[2] = [tetrimino.position[0][0] - 1,tetrimino.position[0][1] -1];
				tetrimino.position[3] = [tetrimino.position[0][0] - 2,tetrimino.position[0][1] -1];

				tetrimino.setWH(2,3);
				tetrimino.style.backgroundImage = "url('img/t1r.png')";
				tetrimino.swp = "right";
			}else if(tetrimino.swp === "right"){
				tetrimino.position[0] = [tetrimino.position[0][0] - 1,tetrimino.position[0][1] - 1];
				tetrimino.position[1] = [tetrimino.position[0][0] - 1,tetrimino.position[0][1] ];
				tetrimino.position[2] = [tetrimino.position[0][0] - 1,tetrimino.position[0][1] + 1];
				tetrimino.position[3] = [tetrimino.position[0][0] - 1,tetrimino.position[0][1] + 2];

				tetrimino.setWH(3,2);
				tetrimino.style.backgroundImage = "url('img/t1d.png')";
				tetrimino.swp = "down";
			}else if(tetrimino.swp === "down"){
				tetrimino.position[0] = [tetrimino.position[0][0] - 1,tetrimino.position[0][1]];
				tetrimino.position[1] = [tetrimino.position[0][0] ,tetrimino.position[0][1] + 1];
				tetrimino.position[2] = [tetrimino.position[0][0] + 1,tetrimino.position[0][1] + 1];
				tetrimino.position[3] = [tetrimino.position[0][0] + 2,tetrimino.position[0][1] + 1];
				tetrimino.setWH(2,3);
				tetrimino.style.backgroundImage = "url('img/t1l.png')";
				tetrimino.swp = "left";
			}else if(tetrimino.swp === "left"){
				tetrimino.position[0] = [tetrimino.position[0][0] ,tetrimino.position[0][1] + 2];
				tetrimino.position[1] = [tetrimino.position[0][0] + 1,tetrimino.position[0][1]];
				tetrimino.position[2] = [tetrimino.position[0][0] + 1,tetrimino.position[0][1] - 1];
				tetrimino.position[3] = [tetrimino.position[0][0] + 1,tetrimino.position[0][1] - 2];
				tetrimino.setWH(3,2);
				tetrimino.style.backgroundImage = "url('img/t1i.png')";
				tetrimino.swp = "initial";
			}
		}else if(tetrimino.forma==="L2"){
			if(tetrimino.swp === "initial"){
				tetrimino.position[0] = [tetrimino.position[0][0] ,tetrimino.position[0][1] + 1];
				tetrimino.position[1] = [tetrimino.position[0][0] ,tetrimino.position[0][1] - 1];
				tetrimino.position[2] = [tetrimino.position[0][0] + 1,tetrimino.position[0][1] -1];
				tetrimino.position[3] = [tetrimino.position[0][0] + 2,tetrimino.position[0][1] -1];

				tetrimino.setWH(2,3);
				tetrimino.style.backgroundImage = "url('img/t2r.png')";
				tetrimino.swp = "right";
			}else if(tetrimino.swp === "right"){
				tetrimino.position[0] = [tetrimino.position[0][0] + 1,tetrimino.position[0][1] + 1];
				tetrimino.position[1] = [tetrimino.position[0][0] - 1,tetrimino.position[0][1] ];
				tetrimino.position[2] = [tetrimino.position[0][0] - 1,tetrimino.position[0][1] - 1];
				tetrimino.position[3] = [tetrimino.position[0][0] - 1,tetrimino.position[0][1] - 2];

				tetrimino.setWH(3,2);
				tetrimino.style.backgroundImage = "url('img/t2d.png')";
				tetrimino.swp = "down";
			}else if(tetrimino.swp === "down"){
				tetrimino.position[0] = [tetrimino.position[0][0] + 1,tetrimino.position[0][1] - 2];
				tetrimino.position[1] = [tetrimino.position[0][0]  ,tetrimino.position[0][1] + 1];
				tetrimino.position[2] = [tetrimino.position[0][0] - 1,tetrimino.position[0][1] + 1];
				tetrimino.position[3] = [tetrimino.position[0][0] - 2,tetrimino.position[0][1] + 1];
				tetrimino.setWH(2,3);
				tetrimino.style.backgroundImage = "url('img/t2l.png')";
				tetrimino.swp = "left";
			}else if(tetrimino.swp === "left"){
				tetrimino.position[0] = [tetrimino.position[0][0] -2 ,tetrimino.position[0][1]];
				tetrimino.position[1] = [tetrimino.position[0][0] +1 ,tetrimino.position[0][1] ];
				tetrimino.position[2] = [tetrimino.position[0][0] +1 ,tetrimino.position[0][1] + 1];
				tetrimino.position[3] = [tetrimino.position[0][0] +1 ,tetrimino.position[0][1] + 2];
				tetrimino.setWH(3,2);
				tetrimino.style.backgroundImage = "url('img/t2i.png')";
				tetrimino.swp = "initial";
			}
		}
		tetrimino.fitin();
		if(tetrimino.isTraped()){
			tetrimino.position = prevPosition;
			tetrimino.style.backgroundImage = prevBackground;
			tetrimino.setWH(prev_w,prev_h);
			tetrimino.setXY(prev_x,prev_y);
			tetrimino.swp = prevSWP;
		}
		tetrimino.updatesize();
		tetrimino.updatepos();
	};
}
