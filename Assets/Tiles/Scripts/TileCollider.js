#pragma strict

var location : String;

function Start () {

}

function Update () {

}

function OnTriggerEnter(other : Collider){
	print("triggered");
	var otherTile : Tile = other.gameObject.GetComponent(Tile);
	var thisTile : Tile = transform.parent.gameObject.GetComponent(Tile);
	
	if(otherTile){ // ensure the object collided with is actually a tile
		switch(location){
		case "N":
			thisTile.SetN(otherTile);
			break;
		case "S":
			thisTile.SetS(otherTile);
			break;
		case "E":
			thisTile.SetE(otherTile);
			break;
		case "W":
			thisTile.SetW(otherTile);
			break;
		}
	}
}