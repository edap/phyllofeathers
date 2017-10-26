import * as THREE from 'three';
import {phyllotaxisWrong, phyllotaxisConical} from './phyllotaxis.js';
import Strategy from './strategy.js';
import {getWrongPhylloParamsForBird, getRightPhylloParamsForBird} from './store.js';

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
        this._addListeners();
        getWrongPhylloParamsForBird('blue-fronted-parrot');
        console.log(params);
        this.generate(params, 1);
        
    }

    _addListeners(){
        // this.emitter.addListener("crash", (data) => this._onCrash(data));
        // this.emitter.addListener("reset", (data) => this._onReset(data));
        // this.emitter.addListener("init_the_game", (data) => this._onInitTheGame(data));
        // this.emitter.addListener("goal_reached", (data) => this._onGoalReached(data));
        // this.emitter.addListener("not_enough_instructions", () => this._onNotEnough());
        // this.emitter.addListener("too_many_instructions", () => this._tooManyInstructions());
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
        let crownGeom = this.makePetalGeom(params, "crown");
        let petalGeom = this.makePetalGeom(params, "petals");
        let secPetalGeom = this.makePetalGeom(params, "sec_petals");
        for (var i = 0; i< tot_petals; i++) {
            let object = this._createObject(i, params.angle, params, crownGeom, petalGeom, secPetalGeom);
            if (wrongPhyllo) {
                this._positionPetalsWrongPhyllotaxis(i, params, object, angleInRadians);
            } else {
                this._positionPetalsPhyllotaxis(i, params, object, angleInRadians);
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

    // petals can belong to the crown, be the petals shortly after or be the last petals

    _positionPetalsPhyllotaxis(i, params, object, angleInRadians) {
        let coord;
        if (i <= params.petals_from) {
            coord = phyllotaxisConical(i, angleInRadians, params.crown_spread, params.crown_growth);
            object.position.set(coord.x, coord.y, coord.z + params.crown_z);
            this.positionPetal(object, i, angleInRadians, params, "crown", false);
        } else if(i > params.petals_from && i <= (params.sec_petals_from + params.petals_from)) {
            coord = phyllotaxisConical(i, angleInRadians, params.spread, params.growth);
            object.position.set(coord.x, coord.y, coord.z);
            this.positionPetal(object, i, angleInRadians, params, "petals", false);
        } else {
            coord = phyllotaxisConical(i, angleInRadians, params.spread, params.growth);
            object.position.set(coord.x, coord.y, coord.z);
            this.positionPetal(object, i, angleInRadians, params, "sec_petals", false);
        }
    }

    _positionPetalsWrongPhyllotaxis(i, params, object, angleInRadians) {
        let coord = phyllotaxisWrong(i, angleInRadians, params.spread, params.growth);
        object.position.set(coord.x, coord.y, coord.z);
        if (i <= params.petals_from) {
            this.positionPetal(object, i, angleInRadians, params, "crown", true);
        }
        else if(i > params.petals_from && i <= (params.sec_petals_from + params.petals_from)) {
            this.positionPetal(object, i, angleInRadians, params, "petals", true);
        }
        else {
            this.positionPetal(object, i, angleInRadians, params, "sec_petals", true);
        }
    }

    _createObject(i, angleInRadians, params, crownGeom, petalGeom, secPetalGeom) {
        let strategy = this.strategy.get(i, angleInRadians, params, crownGeom, petalGeom, secPetalGeom);
        let object = new THREE.Mesh(strategy.geometry, strategy.mat);
        strategy.geometry.dispose();
        strategy.mat.dispose();
        object["strategy"] = params.strategy;
        return object;
    }

    reset(){
        for (var i = this.group.children.length - 1; i >= 0; i--) {
            this._disposeTextures(this.group.children[i].material);
            this.group.children[i].geometry.dispose();
            this.group.children[i].material.dispose();
            this.group.remove(this.group.children[i]);
        }
        this.objects = [];
    }

    positionPetal(object, iter, angleInRadians, params, suffix, wrongPhyllo = true){
        object.material.side = THREE.DoubleSide;
        //calculate needed variable
        let PItoDeg = Math.PI/180.0;
        // the scale ratio is a value that increase as the flower grows. Petals are smaller near the crown
        // and while they grows the petals rotate from the crown to the outside
        let ratio = Math.abs(iter/params.petals_from);
        // this is to avaoid a scaleRatio of 0, that would cause a warning while scaling for 0
        let scaleRatio = ratio === 0 ? 0.001 : ratio;

        // Rotations:
        object.rotateZ( iter* angleInRadians);
        let yrot = (iter/params.angle_open) * params.petals_from;
        let y_angle = params.angle_open * scaleRatio;
        if (!wrongPhyllo) {
            object.rotateX( (params.starting_angle_open + y_angle + iter * 90/params.num ) * PItoDeg );
        } else {
            object.rotateX(Math.PI/2);
        }

        // Scale:
        // do not scale petals in the crown depending on the iteration number
        let scaleMag;
        if (suffix != "crown") {
            scaleMag = params[`${suffix}_scale`] * scaleRatio;
        } else {
            scaleMag = params[`${suffix}_scale`] * 1.0;
        }

        if (!wrongPhyllo) {
            object.scale.set(scaleMag, scaleMag, scaleMag);
            object.rotateY((Math.PI/2));
        } else {
            object.rotateX((Math.PI/2));
        }
    }

    makePetalGeom(params, suffix){
        let points = [];
        let phistart = params[`${suffix}_phistart`];
        let philength = params[`${suffix}_philength`];
        let amp = params[`${suffix}_amplitude`];
        let freq = params[`${suffix}_freq`];
        let xOffset = params[`${suffix}_xoffset`];
        let yOffset = params[`${suffix}_yoffset`];
        let segment = params[`${suffix}_segment`];
        let segment_length = params[`${suffix}_segment_length`];
        let length = params[`${suffix}_length`];
        for ( var i = 0; i < length; i ++ ) {
	          points.push( new THREE.Vector2( Math.cos( i * freq ) * amp + xOffset, ( i - yOffset ) * segment_length ) );
        }
        let geometry = new THREE.LatheBufferGeometry( points, segment ,phistart, philength);
        return geometry;
    }

    _disposeTextures(material){
        if(material.map !== undefined){
            material.map.dispose();
        }

        if(material.alphaMap !== undefined){
            material.alphaMap.dispose();
        }

        if(material.normalMap !== undefined){
            material.normalMap.dispose();
        }

        if(material.specularMap !== undefined){
            material.specularMap.dispose();
        }
    }
}
