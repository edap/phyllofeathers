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

            let coord = phyllotaxisConical(i, angleInRadians, params.spread, params.growth);
            object.position.set(coord.x, coord.y, coord.z);
            if (isPetal) {
                this.transformIntoPetal(object, i, angleInRadians, params);
            } else {
                object.rotateZ( i* angleInRadians);
                if (params.growth_regular) {
                    object.rotateY( (90 + params.angle_open ) * -PItoDeg );
                } else {
                    object.rotateY( (90 + params.angle_open + i * 100/params.num ) * -PItoDeg );
                }
            }
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
        //object.rotateY(Math.PI/2);
        let PItoDeg = Math.PI/180.0;

        // the scale ratio is a value between 0.001 and 1.
        // It is 0.0001 for the first element, and 1 for the last ones
        let ratio = Math.abs(iter/params.petals_from);
        // this is to avaoid a scaleRatio of 0, that would cause a warning while scaling
        // an object for 0
        let scaleRatio = ratio === 0 ? 0.001 : ratio;

        object.rotateZ( iter* angleInRadians);

        let yrot = (iter/params.angle_open) * params.petals_from;
        //object.rotateY( (yrot ) * -PItoDeg );
        let y_angle = params.angle_open * scaleRatio;
        //object.rotateX( (params.starting_angle_open + y_angle + iter * 200/params.num ) * -PItoDeg );

        // as they grow up, they become bigger
        object.scale.set(5 * scaleRatio ,1 ,1);
        // la concavita' del petalo e' rivolta verso l'alto
        object.rotateY((Math.PI/2));
    }

    makePetalGeom(params){
        let points = [];
        let phistart = params.petals_phistart;
        let philength = params.petals_philength;
        let amp = params.petals_amplitude;
        let freq = params.petals_freq;
        let distanceFromCenter = params.petals_fromcenter;
        let segment = params.petals_segment;
        let segment_length = params.petals_segment_length;
        let length = params.petals_length;
        for ( var i = 0; i < length; i ++ ) {
	          points.push( new THREE.Vector2( Math.sin( i * freq ) * amp + distanceFromCenter, ( i - distanceFromCenter ) * segment_length ) );
        }
        let geometry = new THREE.LatheGeometry( points, segment ,phistart, philength);
        return geometry;
    }
}
