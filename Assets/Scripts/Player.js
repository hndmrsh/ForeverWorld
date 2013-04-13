#pragma strict

private var cameras : GameObject[];
private var currentCam : int = 0;

private var gui : Gui;

private var x : int;
private var y : int;

function Start(){
	cameras = GameObject.FindGameObjectsWithTag("MainCamera");
	gui = GameObject.FindGameObjectWithTag("Global").GetComponent(Gui);
	
	for(var i : int = 0; i < cameras.length; i++){
		if(i != currentCam){
			cameras[i].SetActive(false);
		}
	}
}

function Update () {
	// update this object's (x,y) coords
	UpdatePosition();
	
	if(!gui.IsShowingMenu()){
		CheckOptionsKeys();
		Walk();
	}
}

function CheckOptionsKeys(){
	if(Input.GetButtonUp("Switch Camera")){
		cameras[currentCam].SetActive(false);
		currentCam = (currentCam + 1) % cameras.length;
		cameras[currentCam].SetActive(true);
	}
}

function GetCurrentCamera() : GameObject{
	for(var i : int = 0; i < cameras.length; i++){
		if(cameras[i].activeSelf){
			return cameras[i];
		}
	}
	
	return null; // uh oh
}

function Walk(){
	// we need some axis derived from camera but aligned with floor plane
	var cameraTransform : Transform = GetCurrentCamera().transform;
	var forward : Vector3 = cameraTransform.TransformDirection(Vector3.forward);
	forward.y = 0f;
	forward = forward.normalized;
	var right : Vector3 = new Vector3(forward.z, 0.0f, -forward.x);
	 
	
	var h : float = Input.GetAxis("Horizontal");
	var v : float = Input.GetAxis("Vertical");
	
	var walkDirection : Vector3 = (h * right + v * forward);
	
	var walk : Vector3 = transform.TransformDirection(walkDirection);
	
	transform.rigidbody.AddForce(walk*10);
}

function UpdatePosition(){
	x = transform.position.x;
	if(x >  0){
		x = x + 2;
	} else {
		x = x - 2;
	}
	x = x / TileFactory.tileSize;
	
	y = transform.position.z;
	if(y >  0){
		y = y + 2;
	} else {
		y = y - 2;
	}
	y = y / TileFactory.tileSize;
}

function OnGUI() {	
	if(Gui.debug){
		GUI.Box(Rect (10,10,180,20), cameras[currentCam].name + " (" + (currentCam+1) + "/" + cameras.length + ")");
		GUI.Box(Rect (Screen.width - 120,10,100,20), "(" + x + "," + y + ")");
	}
}

function GetX() : int{
	return x;
}

function GetY() : int{
	return y;
}