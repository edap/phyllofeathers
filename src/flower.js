import * as THREE from 'three';
import {phyllotaxisWrong, phyllotaxisConical} from './phyllotaxis.js';
import Strategy from './strategy.js';

//https://medium.com/@bgolus/anti-aliased-alpha-test-the-esoteric-alpha-to-coverage-8b177335ae4f

export default class Flower {
    constructor(params, materials, assets) {
        this.assets = assets;
        this.materials = materials;
        this.objects = [];
        this.group = new THREE.Group();
        this.strategy = new Strategy(materials);
        this._params = params;
        this.generate(params, 1);
    }

    get(){
        return this.group;
    }

    getParams(){
        return this._params;
    }

    regenerate(params, number){
        this.reset();
        this.generate(params, number);
    }

    generate(params, num){
        let tot_petals = num !== undefined ? num : params.num;
        let PItoDeg = (Math.PI/180.0);
        let angleInRadians = params.angle * PItoDeg;

        let widthSegments = 32;
        let crownGeom = this.makePetalGeom(params, "crown");
        let petalGeom = this.makePetalGeom(params, "petals");
        let secPetalGeom = this.makePetalGeom(params, "sec_petals");
        for (var i = 0; i< tot_petals; i++) {
            let object = this._createObject(i, params.angle, params, crownGeom, petalGeom, secPetalGeom);
            let coord;

            coord = phyllotaxisWrong(i, angleInRadians, params.spread, params.growth);
            //coord = phyllotaxisConical(i, angleInRadians, params.spread, params.growth);
            object.position.set(coord.x, coord.y, coord.z);

            if (i <= params.petals_from) {
                this.positionPetal(object, i, angleInRadians, params, "crown");
            }
            else if(i > params.petals_from && i <= (params.sec_petals_from + params.petals_from)) {
                this.positionPetal(object, i, angleInRadians, params, "petals");
            }
            else {
                this.positionPetal(object, i, angleInRadians, params, "sec_petals");
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

    _createObject(i, angleInRadians, params, crownGeom, petalGeom, secPetalGeom) {
        let strategy = this.strategy.get(i, angleInRadians, params, crownGeom, petalGeom, secPetalGeom);
        let object = new THREE.Mesh(strategy.geometry, strategy.mat);
        strategy.geometry.dispose();
        strategy.mat.dispose();
        object["strategy"] = params.strategy;
        return object;
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

    reset(){
        for (var i = this.group.children.length - 1; i >= 0; i--) {
            this._disposeTextures(this.group.children[i].material);
            //this.group.children[i].material.map.dispose();
            this.group.children[i].geometry.dispose();
            this.group.children[i].material.dispose();
            this.group.remove(this.group.children[i]);
        }
        console.log(this.objects.length);
        // for(var index in this.objects){
        //     let object = this.objects[index];
        //     object.geometry.dispose();
        //     //object.material.alphaMap.dispose();
        //     //object.material.map.dispose();
        //     //object.material.normalMap.dispose();
        //     //object.material.specularMap.dispose();
        //     object.material.dispose();
        //     //object.material.map.dispose();
			  //     this.group.remove( object );
        //     this.scene.remove(object);
        // }
        this.objects = [];
        // TODO probabilmente dovrebbe anche togliersi dalla scena
    }

    positionPetal(object, iter, angleInRadians, params, suffix){
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
        //object.rotateZ( (params.starting_angle_open + y_angle + iter * 90/params.num ) * PItoDeg );
        object.rotateX(Math.PI/2);

        // Scale:
        // do not scale petals in the crown depending on the iteration number
        let scaleMag;
        if (suffix != "crown") {
            scaleMag = params[`${suffix}_scale`] * scaleRatio;
        } else {
            scaleMag = params[`${suffix}_scale`] * 1.0;
        }
        //object.scale.set(scaleMag, scaleMag, scaleMag);
        object.rotateX((Math.PI/2));
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
        //return new THREE.BoxGeometry(1.1,1.1,1.1);
    }
}
