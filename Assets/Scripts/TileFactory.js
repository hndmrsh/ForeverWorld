#pragma strict

static var tileSize : int = 4;

var initialDistance : int;
var tileObjects : Tile[];
var weights : int[];

private var hashtable = new Hashtable();

function Start () {
	var start = GameObject.FindGameObjectWithTag("Respawn").GetComponent(Tile);
	start.DetermineProbabilityOfRepetition();
	hashtable.Add(Key(start.x, start.y), start);
	
	for(var x = -initialDistance; x <= initialDistance; x++){		
		for(var y = -initialDistance; y <= initialDistance; y++){
			if(y != 0 || x != 0){
				GenerateTile(x, y);
				var tile : Tile = hashtable[Key(x,y)];
				tile.isFringe = Mathf.Abs(x) == initialDistance || Mathf.Abs(y) == initialDistance;
			}
		}
	}
}

function GenerateTile(x : int, y : int) {
	// check if a tile already exists before creating
	if(!hashtable[Key(x,y)]){
		var tile : Tile = RandomTile(x,y);
		
		// assume it's on the fringe -- it probably is, and if it 
		// isn't it'll just get marked as non-fringe later.
		tile.isFringe = true; 
		tile.x = x;
		tile.y = y;
		
		var newTile : Tile = Instantiate(tile, new Vector3(x*tileSize, 0, y*tileSize), tile.transform.rotation);
		newTile.DetermineProbabilityOfRepetition(tile.GetProbabilityOfRepetition());	
		hashtable.Add(Key(x,y), newTile);
	}
}

function RandomTile(x:int, y:int) : Tile {
	var neighbours : Tile[] = new Tile[4];
	neighbours[0] = GetTile(x+1,y);
	neighbours[1] = GetTile(x-1,y);
	neighbours[2] = GetTile(x,y+1);
	neighbours[3] = GetTile(x,y-1);
	
	var probCount : int = 0;
	var probabilities : double[] = new double[4];
	
	for(var n : int = 0; n < neighbours.length; n++){
		if(neighbours[n]){
			probabilities[n] = neighbours[n].GetProbabilityOfRepetition();
			probCount++;
		} else {
			// no neighbour in that direction, set probability of repetition at 0.0
			probabilities[n] = 0.0;
		}
	}
	
	// weight the probabilities by the number of options (i.e. repeat a neighbour or create from scratch; max is 4, min is 1);
	for(var p : int = 0; p < probabilities.length; p++){
		if(probabilities[p] > 0.0){
			//probabilities[p] /= probCount;
			if(Random.value < probabilities[p]){
				print("probabilities[p]="+probabilities[p]);
				print("Cloning neighbour of type " + neighbours[p].gameObject.ToString());
				return neighbours[p];
			}
		}
	}
	
	// if we get here, we want a random type
	var tile : Tile = RandomType(Random.value);
	print("Using tile type " + tile.gameObject.ToString());
	
	return tile;
}

function RandomType(rand : double) : Tile{
	var weightSum : int;
	for(var w : int = 0; w < weights.length; w++){
		weightSum += weights[w];
	}
	
	var type : int = rand * weightSum;
	for(w = 0; w < weights.length; w++){
		type -= weights[w];
		if(type < 0){
			// we want this type!
			return tileObjects[w];
		}
	}
}

static function Key(x : int, y : int) : String{
	var key : String = "x" + x + "y" + y;
	return key;
}

function GetTile(x : int, y : int) : Tile{
	return hashtable[Key(x,y)];
}

function GetAllTiles(){
	return hashtable;
}