export function removeEntityByName(name, scene){
	const selectedObject = scene.getObjectByName(name);
	if (selectedObject){
		scene.remove(selectedObject);
	}
}

export function limitControls(controls){
	controls.minPolarAngle = Math.PI / 3.5;
	controls.maxPolarAngle = Math.PI / 1.6;
	controls.minAzimuthAngle = -Math.PI / 4;
	controls.maxAzimuthAngle = Math.PI / 4;
	controls.minDistance = 100;
	controls.maxDistance = 200;
}
