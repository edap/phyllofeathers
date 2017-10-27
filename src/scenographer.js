import { removeEntityByName } from './utils.js';

export default class Scenographer {
    constructor(scene, bufferScene){
        this.scene = scene;
        this.bufferScene = bufferScene;
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
