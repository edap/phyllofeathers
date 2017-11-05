import { removeEntityByName } from './utils.js';
import { PointLights } from './pointLights.js';
import { Object3D, Euler } from 'three';

export default class Scenographer {
	constructor(scene, bufferScene, bufferPlane, flowerGroup, revolverGroup, emitter){
		this._scene = scene;
		this._bufferScene = bufferScene;
		this._bufferPlane = bufferPlane;
		this._flowerGroup = flowerGroup;
		this._revolverGroup = revolverGroup;
		//this._bufferFlowerGroup = new Object3D().copy(flowerGroup);
		this._bufferFlowerGroup = flowerGroup.clone();
		this._bufferRevolverGroup = revolverGroup.clone();
		this._emitter = emitter;
		this._addListeners();
	}

	_addListeners(){
		this._emitter.addListener('ADD-PLANE-TO-SCENE', () => this._onAddPlaneToScene());
		this._emitter.addListener('REMOVE-PLANE-FROM-SCENE', () => this._onRemovePlaneFromScene());
		this._emitter.addListener('ENTER-REVOLVER', () => this._onEnterRevolver());
		this._emitter.addListener('ENTER-FLOWER', () => this._onEnterFlower());
	}

	_onRemovePlaneFromScene(){
		//console.log('received REMOVE-PLANE-FROM-SCENE');
		this.removeFromBufferScene(this._bufferRevolverGroup);
		this.remove(this._bufferPlane);

		this._resetRevolverRotation();
	}

	_onAddPlaneToScene(){
		//console.log('received ADD-PLANE-TO-SCENE');
		this.addToBufferScene(this._bufferFlowerGroup);
		this.add(this._bufferPlane);
	}

	_onEnterRevolver(){
		this.remove(this._flowerGroup);
		this.add(this._revolverGroup);

		this.removeFromBufferScene(this._bufferFlowerGroup);
		this.addToBufferScene(this._bufferRevolverGroup);
	}

	_onEnterFlower(){
		this.add(this._flowerGroup);
		this.remove(this._revolverGroup);
	}

	// hacky, but needed. If I put the reset of the rotation in the animator
	// there is a small jump at the end of the animation
	_resetRevolverRotation(){
		this._bufferRevolverGroup.setRotationFromEuler(new Euler(0, -1.5707963267948966, 0));
		this._revolverGroup.setRotationFromEuler(new Euler(0, -1.5707963267948966, 0));
	}

	turnLightOn(){
		// ambient lights. TODO, use them or not?
		//let ambientLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
		//let ambientLight2 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
		//scene.add( ambientLight2 );
		//bufferScene.add(ambientLight);
		const distance = 220;
		const power = 0.9;
		PointLights(distance, power).map(light => {
			this._scene.add(light);
		});
		PointLights(distance, power).map(light => {
			this._bufferScene.add(light);
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

	getBufferFlower(){
		return this._bufferFlowerGroup;
	}

	getBufferRevolver(){
		return this._bufferRevolverGroup;
	}
}
