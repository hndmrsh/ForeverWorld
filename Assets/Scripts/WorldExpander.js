#pragma strict

function OnTriggerEnter(other : Collider){
	print("triggered");
	
	var tile : Tile = other.GetComponent(Tile);
	if(tile && tile.isFringe){
		tile.GenerateTiles();
	}
}

