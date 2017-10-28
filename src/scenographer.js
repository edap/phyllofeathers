import { removeEntityByName } from './utils.js';
import { PointLights } from './pointLights.js';

export default class Scenographer {
    constructor(scene, bufferScene){
        this.scene = scene;
        this.bufferScene = bufferScene;
    }

    turnLightOn(){
        let distance = 120;
        let power = 1.2;
        PointLights(distance, power).map((light) => {
            this.scene.add( light );
        });
        PointLights(distance, power).map((light) => {
            this.bufferScene.add( light );
        });
    }

    add(obj){
        this.scene.add(obj);
    }

    remove(obj){
        this.scene.remove(obj);
    }

    addToBufferScene(obj){
        this.bufferScene.add(obj);
    }

    removeFromBufferScene(obj){
        this.bufferScene.remove(obj);
    }

    removeFromBufferSceneByName(name){
        removeEntityByName(name,this.bufferScene);
    }

    removeFromSceneByName(name){
        removeEntityByName(name,this.scene);
    }


}
