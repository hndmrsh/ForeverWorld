#pragma strict

// inspector variables

var type : String;

var x : int;
var y : int;
var isFringe : boolean;

// private variables
private var probabilityOfRepetition : double;

function GenerateTiles() {
	isFringe = false;
	
	var factory : TileFactory = GameObject.FindGameObjectWithTag("Global").GetComponent(TileFactory);
	factory.GenerateTile(x,y+1); // N
	factory.GenerateTile(x,y-1); // S
	factory.GenerateTile(x+1,y); // E
	factory.GenerateTile(x-1,y); // W
}

function DetermineProbabilityOfRepetition(originalProb : double) {
	if(!(originalProb > 0.0)){
		// we have not repeated a tile by cloning it
		DetermineProbabilityOfRepetition();
		return;
	}
	
	switch(type){
	case("GrassTile"):
		probabilityOfRepetition = originalProb * 0.99;
		break;
	case("WaterTile"):
		probabilityOfRepetition = originalProb * 0.95;
		break;
	default:
		probabilityOfRepetition = 0.0;
		break;
	}
}

function DetermineProbabilityOfRepetition() {
	switch(type){
	case("GrassTile"):
		probabilityOfRepetition = 0.99;
		break;
	case("WaterTile"):
		probabilityOfRepetition = 0.95;
		break;
	default:
		probabilityOfRepetition = 0.0;
		break;
	}
	
	print("test");
}

function GetProbabilityOfRepetition() : double{
	return this.probabilityOfRepetition;
}

function SetProbabilityOfRepetition(prob : double){
	probabilityOfRepetition = prob;
}