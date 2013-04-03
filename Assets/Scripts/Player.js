#pragma strict

private var cameras : GameObject[];
private var currentCam : int = 0;

function Start(){
	cameras = GameObject.FindGameObjectsWithTag("MainCamera");
	for(var i : int = 0; i < cameras.length; i++){
		if(i != currentCam){
			cameras[i].SetActive(false);
		}
	}
}

function Update () {

	CheckOptionsKeys();
	Walk();

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
	//print(walk*100);
	transform.rigidbody.AddForce(walk*10);
}

function OnGUI() {	
	GUI.Box (Rect (10,10,250,40), cameras[currentCam].name + " (" + (currentCam+1) + "/" + cameras.length + ")");
}