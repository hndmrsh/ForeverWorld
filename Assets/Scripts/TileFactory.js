#pragma strict

var initialDistance : int;

var tileSize : int = 10;
var tileObjects : Tile[];

private var hashtable = new Hashtable();

function Start () {
	var start = GameObject.FindGameObjectWithTag("Respawn").GetComponent(Tile);
	hashtable.Add(Key(start.x, start.y), start);
	
	/* 
	 * this is inefficient, but will only need
	 * to ever run once at start of level, so it 
	 * should be OK. 
	 */
	for(var i = 0; i < initialDistance; i++){
		var fringe : Array = new Array();
		for(var tile : Tile in hashtable.Values){
			if(tile.isFringe){
				fringe.Add(tile);
			}
		}
		
		// generate tiles for tiles in fringe
		for(var newTile : Tile in fringe){
			newTile.GenerateTiles();
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
		
		var newTile : Tile = Instantiate(tile, new Vector3(x*tileSize*2, 0, y*tileSize*2), tile.transform.rotation);
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