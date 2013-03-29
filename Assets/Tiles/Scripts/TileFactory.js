#pragma strict

var initialDistance : int;
var tileObjects : Tile[];

function Start () {
	var start = GameObject.FindGameObjectWithTag("Respawn");
	start.GetComponent(Tile).GenTiles(initialDistance);
}

function RandomTile() : Tile {
	var r : int = Random.value * tileObjects.Length;
	var tile : Tile = tileObjects[r];
	
	print("Using tile type " + tile.gameObject.ToString());
	
	return tile;
}