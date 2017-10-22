export function removeEntityByName(name,scene) {
    let selectedObject = scene.getObjectByName(name);
    if(selectedObject){
        scene.remove( selectedObject );
    }
}

export function limitControls(controls) {
    controls.minPolarAngle = Math.PI/6.5;
    controls.maxPolarAngle = Math.PI/1.1;
    controls.minDistance = 200;
    controls.maxDistance = 600;
}
