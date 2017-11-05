export function removeEntityByName(name, scene){
	const selectedObject = scene.getObjectByName(name);
	if (selectedObject){
		scene.remove(selectedObject);
	}
}

export function limitControls(controls){
	controls.minPolarAngle = Math.PI / 6.5;
	controls.maxPolarAngle = Math.PI / 1.1;
	controls.minDistance = 100; //era 100
	//controls.minDistance = 20;
	controls.maxDistance = 200;
}
