import { removeEntityByName } from './utils.js';
import { PointLights } from './pointLights.js';
import { Object3D } from 'three';

export default class Scenographer {
	constructor(scene, bufferScene, bufferPlane, flowerGroup, emitter){
		this._scene = scene;
		this._bufferScene = bufferScene;
		this._bufferPlane = bufferPlane;
		this._flowerGroup = flowerGroup;
		//this._bufferFlowerGroup = new Object3D().copy(flowerGroup);
		this._bufferFlowerGroup = flowerGroup.clone();
		this._emitter = emitter;
		this._addListeners();
	}

	_addListeners(){
		this._emitter.addListener('ADD-PLANE-TO-SCENE', () => this._onAddPlaneToScene());
		this._emitter.addListener('REMOVE-PLANE-FROM-SCENE', () => this._onRemovePlaneFromScene());

		this._emitter.addListener('COPY-FLOWER-TO-BUFFERFLOWER', () => this.copyFlowerToBufferFlower());
	}

	_onRemovePlaneFromScene(){
		this.removeFromBufferScene(this._bufferFlowerGroup);
		this.remove(this._bufferPlane);
	}

	_onAddPlaneToScene(){
		this.addToBufferScene(this._bufferFlowerGroup);
		this.add(this._bufferPlane);
	}

	turnLightOn(){
		// ambient lights. TODO, use them or not?
		//let ambientLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
		//let ambientLight2 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
		//scene.add( ambientLight2 );
		//bufferScene.add(ambientLight);
		const distance = 320;
		const power = 0.9;
		PointLights(distance, power).map(light => {
			this._scene.add(light);
		});
		PointLights(distance, power).map(light => {
			this._bufferScene.add(light);
		});
	}

	copyFlowerToBufferFlower(){
		//this._bufferFlowerGroup.copy(this._flowerGroup);
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

	getBufferFlower(){
		return this._bufferFlowerGroup;
	}
}
