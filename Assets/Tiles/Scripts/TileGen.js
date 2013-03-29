#pragma strict

// rate at which to add new tile
var rate = 50;

var tileObjects : Tile[];

private var timeToNext : int;

function Start () {
	timeToNext = rate;
}

function Update () {
	if(timeToNext > 0){
		timeToNext -= Time.deltaTime;
	} else {
		// reset time to next generation
		timeToNext = rate;
		
		// select a random tile type to generate
		var r : int = Random.value * tileObjects.Length;
		
		print("update using tile #" + r);
		
		var start = GameObject.FindGameObjectWithTag("Respawn");
		//start.GetComponent(Tile).GenTile(tileObjects[r]);
	}
}