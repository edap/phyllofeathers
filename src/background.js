
import * as THREE from 'three';

export default class Bg {
    constructor(tex){
        this.mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2, 0),
            new THREE.MeshBasicMaterial({map: tex})
        );

        // The bg plane shouldn't care about the z-buffer.
        this.mesh.material.depthTest = false;
        this.mesh.material.depthWrite = false;

        this.bgScene = new THREE.Scene();
        this.bgCam = new THREE.Camera();
        this.bgScene.add(this.bgCam);
        this.bgScene.add(this.mesh);
    }

    getCamera(){
        return this.bgCam;
    }

    getScene(){
        return this.bgScene;
    }
}
