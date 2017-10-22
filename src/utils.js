export function removeEntityByName(name,scene) {
    let selectedObject = scene.getObjectByName(name);
    if(selectedObject){
        scene.remove( selectedObject );
    }
}
