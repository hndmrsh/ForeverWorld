#pragma strict

static var debug : boolean = false;

var backgroundTexture : Texture;
var grassTileTexture : Texture;
var waterTileTexture : Texture;
var playerTexture : Texture;

private var showingMap : boolean = false;
private var paused : boolean = false;

private var player : Player;

// map tile size
private var tileSize = 5;

function Start(){
	player = GameObject.FindGameObjectWithTag("Player").GetComponent(Player);
}

function Update (){
	// check for pause/unpause first
 	if(Input.GetButtonUp("Pause")){
		paused = !paused;
		Time.timeScale = (paused ? 0.0 : 1.0);
	}
	
	if(!paused){
		if(Input.GetButtonUp("Show Map")){
			showingMap = !showingMap;
		}
	}
}

function OnGUI(){
	if(paused){
		ShowPause();
	} else if(showingMap){
		ShowMap();
	}
}

function ShowPause(){
	if(backgroundTexture){
		GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), backgroundTexture, ScaleMode.StretchToFill, true);
	}
	GUI.Label(Rect(Screen.width / 2 - 50, Screen.height / 2 - 10, 100, 20), "Paused");
}

private var mapSizeInTiles = 100;
function ShowMap(){
	if(backgroundTexture){
		GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), backgroundTexture, ScaleMode.StretchToFill, true);
	}
	
	GUI.Box(Rect(
		(Screen.width - (mapSizeInTiles * tileSize) - 20) / 2, 
		(Screen.height - (mapSizeInTiles * tileSize) - 20) / 2, 
		mapSizeInTiles * tileSize + 20, 
		mapSizeInTiles * tileSize + 20), "");
	
	var xOffset = (Screen.width - tileSize) / 2;
	var yOffset = (Screen.height - tileSize) / 2;
	
	var playerX = player.GetX();
	var playerY = player.GetY();
	
	for(var x = -(mapSizeInTiles / 2); x < (mapSizeInTiles / 2); x++){
		for(var y = -(mapSizeInTiles / 2); y < (mapSizeInTiles / 2); y++){
			var tile : Tile = this.gameObject.GetComponent(TileFactory).GetAllTiles()[TileFactory.Key(x+playerX, y+playerY)];
			if(tile){
				var destX = x * tileSize + xOffset;
				var destY = -y * tileSize + yOffset;
				DrawTile(tile, destX, destY, (x == 0 && y == 0));
			}	
		}
	}
}

function DrawTile(tile : Tile, x : int, y : int, isPlayer : boolean){
	if(isPlayer){
		GUI.DrawTexture(Rect(x, y, tileSize, tileSize), playerTexture, ScaleMode.StretchToFill, true);
	} else if(tile.type == "GrassTile"){
		GUI.DrawTexture(Rect(x, y, tileSize, tileSize), grassTileTexture, ScaleMode.StretchToFill, true);
	} else if(tile.type == "WaterTile"){
		GUI.DrawTexture(Rect(x, y, tileSize, tileSize), waterTileTexture, ScaleMode.StretchToFill, true);
	}
}

function IsShowingMenu() : boolean {
	return showingMap;
}