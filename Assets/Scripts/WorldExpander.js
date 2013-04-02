#pragma strict

function OnTriggerEnter(other : Collider){
	print("triggered");
	
	var tile : NewTile = other.GetComponent(NewTile);
	if(tile && tile.isFringe){
		tile.GenerateTiles();
	}
}

