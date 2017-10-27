import * as THREE from 'three';
import {phyllotaxisWrong, phyllotaxisConical} from './phyllotaxis.js';
import Strategy from './strategy.js';
import {getWrongPhylloParamsForBird, getRightPhylloParamsForBird} from './store.js';
import {positionPetalsWrongPhyllotaxis,
        positionPetalsPhyllotaxis,
        createPetalMesh,
        makePetalGeom,
        disposeTextures} from './flowerModeller.js';

export default class Flower {
    constructor(params, materials, assets, birdType) {
        this.assets = assets;
        this.materials = materials;
        this.birdType = birdType;
        this.objects = [];
        this.group = new THREE.Group();
        this.strategy = new Strategy(materials);
        this._params = params;
        if (params.hasOwnProperty("crown_z") && params.hasOwnProperty("crown_z")) {
            this.phyllotaxisWrong = false;
        } else {
            this.phyllotaxisWrong = true;
        }
        this.generate(params, 1);
    }

    get(){
        return this.group;
    }

    getParams(){
        return this._params;
    }

    setParams(params){
        this._params = params;
        if (params.hasOwnProperty("crown_z") && params.hasOwnProperty("crown_z")) {
            this.phyllotaxisWrong = false;
        } else {
            this.phyllotaxisWrong = true;
        }
    }

    switchToWrong(){
        let params = getWrongPhylloParamsForBird(this.birdType);
        this.setParams(params);
    }

    switchToRight(){
        let params = getRightPhylloParamsForBird(this.birdType);
        this.setParams(params);
    }


    regenerate(params, number){
        this.reset();
        this.generate(params, number);
    }

    generate(params, num){
        let wrongPhyllo = this.phyllotaxisWrong;
        let tot_petals = num !== undefined ? num : params.num;
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
            this.objects.push(object);
            this.group.add(this.objects[i]);
        }

        // at the end, make the object looking up
        // UNCOMMENTED JUST FOR SKETCH PURPOSTE
        //this.group.rotateX(-Math.PI/2);
    }

    reset(){
        for (var i = this.group.children.length - 1; i >= 0; i--) {
            disposeTextures(this.group.children[i].material);
            this.group.children[i].geometry.dispose();
            this.group.children[i].material.dispose();
            this.group.remove(this.group.children[i]);
        }
        this.objects = [];
    }
}
