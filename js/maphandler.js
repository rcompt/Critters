
function MapHandler(mapWidth, mapHeight){
	this.mapWidth = mapWidth;
	this.mapHeight = mapHeight;
	this.playerLoc = new Array(0,0);
	this.hasPlayer = false;
	this.map = this.BlankMap();		
}

MapHandler.prototype.setPlayer = function(){
	startLoc = [Math.floor(Math.random()*this.mapHeight), Math.floor(Math.random()*this.mapWidth)]
	while (this.IsWall(startLoc[0],startLoc[1])){
		startLoc = [Math.floor(Math.random()*this.mapHeight), Math.floor(Math.random()*this.mapWidth)]
	}
	this.playerLoc = startLoc;
	this.hasPlayer = true;
}

MapHandler.prototype.isPlayerPresentAtLoc = function(row, col){
	if(this.hasPlayer && this.playerLoc[0] == row && this.playerLoc[1] == col){
		return true;
	}else{
		return false;
	}
}

MapHandler.prototype.getPlayerLoc = function(){
	return this.playerLoc;
}

MapHandler.prototype.getElemAt = function(row, col){
	return this.map[row][col].getElem();
}

	
MapHandler.prototype.RandomFillMap = function(){
	temp_map = this.BlankMap();
	return temp_map;
}


MapHandler.prototype.CloneMap = function(){
	temp_map = new Array(this.mapHeight);
	for (row = 0; row < this.mapHeight; row++){
		newRow = this.map[row].slice();

		temp_map[row] = newRow;
	}
	return temp_map;
}

MapHandler.prototype.PlaceWallLogic = function(row, col){
	numWalls = this.GetAdjacentWalls(row,col,1,1)
	if (this.map[row][col] == 1){
		if (numWalls >= 4){
			return 1;
		}else if (numWalls < 2){
			return 0;
		}
	}else{
		if (numWalls >= 5){
			return 1;
		}
	}
	return 0;
}

MapHandler.prototype.GetAdjacentWalls = function(row,col,scopeRow,scopeCol){
	startRow = row - scopeRow;
	startCol = col - scopeCol;
	endRow = row + scopeRow;
	endCol = col + scopeCol;

	wallCounter = 0;

	for (iR = startRow; iR < endRow+1; iR++){
		for (iC = startCol; iC <  endCol+1; iC++){
			if (!(iR == row && iC == col)){
				if (this.IsWall(iR,iC) == 1){
					wallCounter += 1;
				}
			}
		}
	}
	return wallCounter;
}

MapHandler.prototype.IsWall = function(row, col){
	if (this.IsOutOfBound(row, col)){
		return 1;
	}else{
		return this.map[row][col];
	}
}
MapHandler.prototype.IsOutOfBound = function(row, col){
	if (row < 0 || row >= this.mapHeight){
		return true;
	}else if (col < 0 || col >= this.mapWidth){
		return true;
	}else{
		return false;
	}
}

MapHandler.prototype.mapToString = function(){
	mapStr = "";
	for (i = 0; i < this.mapHeight; i++){
		for (j = 0; j < this.mapWidth; j++){
			if (this.map[i][j] == 0){
				mapStr += '.';
			}else if (this.map[i][j] == 1){
				mapStr += '|';
			}else if (this.map[i][j] == 2){
				mapStr += '$';
			}else{
				mapStr += '0';
			}
		}
		mapStr += "\n";
	}
	return mapStr;
}

MapHandler.prototype.printMap = function(){
	mapStr = this.mapToString();
	console.log(mapStr);
}

MapHandler.prototype.BlankMap = function(){
	map_data = new Array(this.mapHeight);
	for (i = 0; i < this.mapHeight; i++){
		newRow = new Array(this.mapWidth);
		for (j = 0; j < this.mapWidth; j++){
			newRow[j] = new Cell([0]);
		}
		map_data[i] = newRow;
	}
	return map_data;
}

MapHandler.prototype.getWidth = function(){
	return this.mapWidth;
}
	
MapHandler.prototype.getHeight = function(){
	return this.mapHeight;
}

MapHandler.prototype.movePlayer = function(x, y){
	if (!(map.IsWall(this.playerLoc[0] + y, this.playerLoc[1] + x))){
		this.playerLoc[0] = this.playerLoc[0] + y;
		this.playerLoc[1] = this.playerLoc[1] + x;
	}
}
