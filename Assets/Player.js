#pragma strict

function Update () {
	// we need some axis derived from camera but aligned with floor plane
	var cameraTransform : Transform = GameObject.FindGameObjectWithTag("MainCamera").transform;
	var forward : Vector3 = cameraTransform.TransformDirection(Vector3.forward);
	forward.y = 0f;
	forward = forward.normalized;
	var right : Vector3 = new Vector3(forward.z, 0.0f, -forward.x);
	 
	
	var h : float = Input.GetAxis("Horizontal");
	var v : float = Input.GetAxis("Vertical");
	
	var walkDirection : Vector3 = (h * right + v * forward);
	transform.TransformDirection(walkDirection);
}