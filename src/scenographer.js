import { removeEntityByName } from './utils.js';
import { PointLights } from './pointLights.js';

export default class Scenographer {
    constructor(scene, bufferScene, bufferPlane, flowerGroup, emitter){
        this._scene = scene;
        this._bufferScene = bufferScene;
        this._bufferPlane = bufferPlane;
        this._flowerGroup = flowerGroup;
        this._emitter = emitter;
        this._addListeners();
    }

    _addListeners(){
        this._emitter.addListener("ADD-PLANE-TO-SCENE",
                                  () => this._onAddToScene(this._bufferPlane));
        this._emitter.addListener("REMOVE-PLANE-FROM-SCENE",
                                  () => this._onRemoveFromScene(this._bufferPlane));
        this._emitter.addListener("ADD-FLOWER-TO-SCENE",
                                  () => this._onAddToScene(this._flowerGroup));
        this._emitter.addListener("REMOVE-FLOWER-FROM-SCENE",
                                  () => this._onRemoveFromScene(this._flowerGroup));
        this._emitter.addListener("ADD-FLOWER-TO-BUFFERSCENE",
                                  () => this._onAddToBufferScene(this._flowerGroup));
        this._emitter.addListener("REMOVE-FLOWER-FROM-BUFFERSCENE",
                                  () => this._onRemoveFromBufferScene(this._flowerGroup));
    }

    turnLightOn(){
        let distance = 220;
        let power = 0.9;
        PointLights(distance, power).map((light) => {
            this._scene.add( light );
        });
        PointLights(distance, power).map((light) => {
            this._bufferScene.add( light );
        });
    }

    add(obj){
        this._scene.add(obj);
    }

    remove(obj){
        this._scene.remove(obj);
    }

    addToBufferScene(obj){
        this._bufferScene.add(obj);
    }

    removeFromBufferScene(obj){
        this._bufferScene.remove(obj);
    }

    removeFromBufferSceneByName(name){
        removeEntityByName(name, this._bufferScene);
    }

    removeFromSceneByName(name){
        removeEntityByName(name,this._scene);
    }

    _onAddToBufferScene(data){
        this.addToBufferScene(data);
    }

    _onRemoveFromBufferScene(data){
        this.removeFromBufferScene(data);
    }

    _onAddToScene(data){
        this.add(data);
    }

    _onRemoveFromScene(data){
        this.remove(data);
    }
}
