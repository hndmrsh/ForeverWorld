#pragma strict

static var tileSize : int = 4;

var initialDistance : int;
var tileObjects : Tile[];

private var hashtable = new Hashtable();

function Start () {
	var start = GameObject.FindGameObjectWithTag("Respawn").GetComponent(Tile);
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
		var tile : Tile = RandomTile();
		
		tile.isFringe = true; // assume it's on the fringe (it probably is)
		tile.x = x;
		tile.y = y;
		
		var newTile : Tile = Instantiate(tile, new Vector3(x*tileSize, 0, y*tileSize), tile.transform.rotation);
		hashtable.Add(Key(x,y), newTile);
	}
}

function RandomTile() : Tile {
	var r : int = Random.value * tileObjects.Length;
	var tile : Tile = tileObjects[r];
	
	print("Using tile type " + tile.gameObject.ToString());
	
	return tile;
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