import * as THREE from 'three';
import {phyllotaxisWrong, phyllotaxisConical} from './phyllotaxis.js';
import Strategy from './strategy.js';
import { addTexturesToMaterial, setTexture } from './materialHelper.js';
import {getWrongPhylloParamsForBird, getRightPhylloParamsForBird} from './store.js';
import {positionPetalsWrongPhyllotaxis,
        positionPetalsPhyllotaxis,
        createPetalMesh,
        makePetalGeom,
        disposeTextures
       } from './flowerModeller.js';

const isPhyllotaxisWrong = (params) => {
    return (!params.hasOwnProperty("crown_z"));
};

export default class Flower {
    constructor(params, materials, assets, birdType) {
        this.assets = assets;
        this.materials = materials;
        this.birdType = birdType;
        this.objects = [];
        this.group = new THREE.Group();
        this.strategy = new Strategy(materials);
        this._params = params;
        this._phyllotaxisWrong = isPhyllotaxisWrong(params);
        this.generate(params);
    }

    setParams(params){
        this._params = params;
        this._phyllotaxisWrong = isPhyllotaxisWrong(params);
    }

    switchTo(type){
        let params;
        if (type === "wrong") {
            params = getWrongPhylloParamsForBird(this.birdType);
        } else {
            params = getRightPhylloParamsForBird(this.birdType);
        }
        this.setParams(params);
        this.reset();
        this.generate(params);
    }

    regenerate(params, debug = false){
        this.generate(params, debug);
    }

    makePetalsVisible(opacity){
        for (var i = this.group.children.length - 1; i >= 0; i--) {
            this.group.children[i].material.opacity = opacity;
        }
    }

    generate(params, debug = false){
        let wrongPhyllo = this._phyllotaxisWrong;
        let tot_petals = params.num;
        let PItoDeg = (Math.PI/180.0);
        let angleInRadians = params.angle * PItoDeg;

        let widthSegments = 32;
        let crownGeom = makePetalGeom(params, "crown");
        let petalGeom = makePetalGeom(params, "petals");
        let secPetalGeom = makePetalGeom(params, "sec_petals");
        for (var i = 0; i< tot_petals; i++) {
            let angle = params.angle;
            let strategy = this.strategy.get(i, angle, params, crownGeom, petalGeom, secPetalGeom);
            let opt = {
                params: params,
                geometry: strategy.geometry,
                material: strategy.mat
            };
            let object = createPetalMesh(opt);
            if (wrongPhyllo) {
                positionPetalsWrongPhyllotaxis(i, params, object, angleInRadians);
            } else {
                positionPetalsPhyllotaxis(i, params, object, angleInRadians);
            }
            object.castShadow = true;
            object.receiveShadow = true;
            if (!debug) {
                object.material.opacity = 0.0; // all the petals are invisible at the beginning
            }
            this.objects.push(object);
            this.group.add(this.objects[i]);
        }
        // this rotation make sense only in the animation,
        // where the 2 phyllotaxis types alternate themselves
        if(!wrongPhyllo){
            this.group.rotateY(Math.PI/2);
        } else {
            this.group.rotateY(-Math.PI/2);
        }
    }

    reset(){
        for (var i = this.group.children.length - 1; i >= 0; i--) {
            //disposeTextures(this.group.children[i].material);
            this.group.children[i].geometry.dispose();
            this.group.children[i].material.dispose();
            this.group.remove(this.group.children[i]);
        }
        this.objects = [];
    }
}
