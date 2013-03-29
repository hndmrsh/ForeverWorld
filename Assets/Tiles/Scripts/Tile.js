#pragma strict

private var n : Tile;
private var e : Tile;
private var s : Tile;
private var w : Tile;

function GenTiles (depth : int) {
	if(depth < 1){
		return;
	}
		
	var type : Tile = GameObject.FindGameObjectWithTag("Global").GetComponent(TileFactory).RandomTile();

	var location : Vector3 = transform.position;

	// N
	if(!n){
		var nLocation = new Vector3(location.x, location.y, location.z - 64);
		SetN(Instantiate(type, nLocation, transform.rotation));
	}
	
	// S
	if(!s){
		var sLocation = new Vector3(location.x, location.y, location.z + 64);
		SetS(Instantiate(type, sLocation, transform.rotation));
	}
	
	// E
	if(!e){
		var eLocation = new Vector3(location.x - 64, location.y, location.z);
		SetE(Instantiate(type, eLocation, transform.rotation));
	}
	
	// W
	if(!w){
		var wLocation = new Vector3(location.x + 64, location.y, location.z);
		SetW(Instantiate(type, wLocation, transform.rotation));
	}
	
	n.GenTiles(depth - 1);
	s.GenTiles(depth - 1);
	e.GenTiles(depth - 1);
	w.GenTiles(depth - 1);
}

function SetN(other : Tile){
	print("SetN called");
	n = other;
	n.s = this;
}

function SetS(other : Tile){
	print("SetS called");
	s = other;
	s.n = this;
}

function SetW(other : Tile){
	print("SetW called");
	w = other;
	w.e = this;
}

function SetE(other : Tile){
	print("SetE called");
	e = other;
	e.w = this;
}
