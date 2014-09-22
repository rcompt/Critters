function Cell(array){
	this.items = array;
	if(this.items[0] == 0){
		this.isEmpty = true;
	}else{
		this.isEmpty = false;
	}
}

Cell.prototype.getElem = function(){
	return this.items[0];
}