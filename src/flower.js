import * as THREE from 'three';
import {phyllotaxisConical} from './phyllotaxis.js';
//https://medium.com/@bgolus/anti-aliased-alpha-test-the-esoteric-alpha-to-coverage-8b177335ae4f

export default class Flower{
    constructor(params, materials, assets) {
        this.assets = assets;
        this.materials = materials;
        this.objects = [];
        this.group = new THREE.Group();
        this.generate(params);
    }

    get(){
        return this.group;
    }

    regenerate(params){
        this.reset();
        this.generate(params);
    }

    generate(params){
        let PItoDeg = (Math.PI/180.0);
        let angleInRadians = params.angle * PItoDeg;

        let widthSegments = 32;
        let crownGeometry = new THREE.SphereGeometry(params.crown_size, widthSegments, widthSegments);
        let petalGeom = this.makePetalGeom(params);
        for (var i = 0; i< params.num; i++) {
            let isPetal = (i >= params.petals_from)? true : false;
            let geometry = isPetal ? petalGeom : crownGeometry;
            let object = new THREE.Mesh(geometry, this.materials[params.material]);
            let coord;
            if (isPetal) {
                coord = phyllotaxisConical(i, angleInRadians, params.spread, params.growth);
                object.position.set(coord.x, coord.y, coord.z);
                this.transformIntoPetal(object, i, angleInRadians, params);
            } else {
                coord = phyllotaxisConical(i, angleInRadians, params.crown_spread, params.crown_growth);
                object.position.set(coord.x, coord.y, coord.z + params.crown_z);
                object.rotateZ( i* angleInRadians);
                if (params.growth_regular) {
                    object.rotateY( (90 + params.angle_open ) * -PItoDeg );
                } else {
                    object.rotateY( (90 + params.angle_open + i * 100/params.num ) * -PItoDeg );
                }
            }
            object.castShadow = true;
            object.receiveShadow = true;
            this.objects.push(object);
            this.group.add(object);
        }
    }

    reset(){
        for(var index in this.objects){
            let object = this.objects[index];
			      this.group.remove( object );
        }
        this.objects = [];
    }

    transformIntoPetal(object, iter, angleInRadians, params){
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
        object.rotateX( (params.starting_angle_open + y_angle + iter * 90/params.num ) * -PItoDeg );

        // Scale:
        let scaleMag = params.petals_scale * scaleRatio;
        object.scale.set(scaleMag, scaleMag, scaleMag);
        object.rotateY((Math.PI/2));
    }

    makePetalGeom(params){
        let points = [];
        let phistart = params.petals_phistart;
        let philength = params.petals_philength;
        let amp = params.petals_amplitude;
        let freq = params.petals_freq;
        let xOffset = params.petals_xoffset;
        let yOffset = params.petals_yoffset;
        let segment = params.petals_segment;
        let segment_length = params.petals_segment_length;
        let length = params.petals_length;
        for ( var i = 0; i < length; i ++ ) {
	          points.push( new THREE.Vector2( Math.cos( i * freq ) * amp + xOffset, ( i - yOffset ) * segment_length ) );
        }
        let geometry = new THREE.LatheGeometry( points, segment ,phistart, philength);
        return geometry;
    }
}
