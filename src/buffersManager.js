import * as THREE from 'three';
import { getPlaneShader } from './shaders.js';

const distanceOnZAxis = -300;
const distanceOnYAxis = 0;
const paddingRight = 0;

/*
  This class handles the 2 frame buffers object, initializating them, updateing them
  and providing a PlaneBufferGeometry testured with the result of the ping pong buffers
  */

export default class BuffersManager {
	constructor(targetSize){
		this.updateBuffer = true;
		this._fragmentShader = getPlaneShader();
		//Create buffer scene
		this._bufferScene = new THREE.Scene();
		//Create 2 buffer textures
		const bufferOptions = {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.NearestFilter,
			depthBuffer: false,
			stencilBuffer: false
		};
		this._textureA = new THREE.WebGLRenderTarget(targetSize, targetSize, bufferOptions);
		this._textureB = new THREE.WebGLRenderTarget(targetSize, targetSize, bufferOptions);
		//Pass textureA to shader
		this._bufferMaterial = new THREE.ShaderMaterial({
			uniforms: {
				bufferTexture: { type: 't', value: this._textureA.texture },
				time: { type: 'f', value: 0 },
				res: { type: 'v2', value: new THREE.Vector2(targetSize, targetSize) } //Keeps the resolution
			},
			fragmentShader: this._fragmentShader
		});
		const plane = new THREE.PlaneBufferGeometry(window.innerWidth, window.innerHeight);
		const bufferObject = new THREE.Mesh(plane, this._bufferMaterial);
		this._bufferScene.add(bufferObject);

		//Draw textureB to screen
		const finalMaterial = new THREE.MeshBasicMaterial({
			map: this._textureB.texture,
			transparent: true
			//color: 0xff0000
		});
		finalMaterial.side = THREE.DoubleSide; //just in case you are rotating the plane
		this._quad = new THREE.Mesh(plane, finalMaterial);
		this._quad.name = 'quad';
		this._quad.position.set(-paddingRight, distanceOnYAxis, distanceOnZAxis);
		this._quad.rotateX(-Math.PI);
	}

	update(time){
		const temp = this._textureA;
		this._textureA = this._textureB;
		this._textureB = temp;
		this._quad.material.map = this._textureB.texture;
		this._bufferMaterial.uniforms.bufferTexture.value = this._textureA.texture;
		this._bufferMaterial.uniforms.time.value = time;
	}

	areUsed(){
		// this is hacky, but save resources. If there are more than 4 elements
		// (3 PointLight and the buffer object are already there),
		// it means that there is flower in the buffer scene, and if there is the flower, update it!
		// otherwhise, do not nothing
		//console.log(this._bufferScene.children.length);
		return this._bufferScene.children.length > 4;
	}

	getBufferScene(){
		return this._bufferScene;
	}

	getPlane(){
		return this._quad;
	}

	getTextureB(){
		return this._textureB;
	}
}
