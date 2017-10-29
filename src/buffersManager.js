import * as THREE from 'three';
import { getPlaneShader } from './shaders.js';

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
        this._textureA = new THREE.WebGLRenderTarget( targetSize, targetSize, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter});
        this._textureB = new THREE.WebGLRenderTarget(targetSize, targetSize, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter} );
        //Pass textureA to shader
        this._slideDirection = new THREE.Vector2(1.0,1.0);
        this._bufferMaterial = new THREE.ShaderMaterial( {
            uniforms: {
                bufferTexture: { type: "t", value: this._textureA.texture },
                slideDirection: {type: 'v2', value: this._slideDirection},
                res : {type: 'v2',value:new THREE.Vector2(targetSize, targetSize)}//Keeps the resolution
            },
            fragmentShader: this._fragmentShader
        } );
        let plane = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight );
        let bufferObject = new THREE.Mesh( plane, this._bufferMaterial );
        this._bufferScene.add(bufferObject);

        //Draw textureB to screen
        let finalMaterial =  new THREE.MeshBasicMaterial({map: this._textureB.texture, transparent:true});
        finalMaterial.side = THREE.DoubleSide; //just in case you are rotating the plane
        this._quad = new THREE.Mesh( plane, finalMaterial );
        this._quad.name = 'quad';
    }

    update(){
        if (this.updateBuffer) {
            let t = this._textureA;
            this._textureA = this._textureB;
            this._textureB = t;
            this._quad.material.map = this._textureB.texture;
            this._bufferMaterial.uniforms.bufferTexture.value = this._textureA.texture;
            this._bufferMaterial.uniforms.slideDirection.value = this._slideDirection;
        }
    }

    getBufferScene(){
        return this._bufferScene;
    }

    getSlideDirection(){
        return this._slideDirection;
    }

    getPlane(){
        return this._quad;
    }

    getTextureB(){
        return this._textureB;
    }
}
