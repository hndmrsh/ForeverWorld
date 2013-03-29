#pragma strict

var x : int;
var y : int;
var isFringe : boolean;

function GenerateTiles() {
	var factory = GameObject.FindGameObjectWithTag("Global").GetComponent(NewTileFactory);

	isFringe = false;
	
	factory.GenerateTile(x,y+1); // N
	factory.GenerateTile(x,y-1); // S
	factory.GenerateTile(x+1,y); // E
	factory.GenerateTile(x-1,y); // W
	
	
}
