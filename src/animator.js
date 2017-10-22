import {Vector3, Geometry, Line, LineBasicMaterial } from 'three';
import {createPath} from './path.js';
import * as THREE from 'three';

const TWEEN = require('@tweenjs/tween.js');
const SPEED = 0.2;
let flying = false;

export default class Animator {
    update(){
        TWEEN.update();
    }

    init(flowerGroup, plane, slideDirection){
        console.error(SPEED);
        let flip = this._rotateObj(flowerGroup,
                                   {z: Math.PI/2},
                                   15000*SPEED,
                                   TWEEN.Easing.Elastic.Out,
                                   1000*SPEED);
        let turnTable = this._rotateObj(plane,
                                        {x: Math.PI/2},
                                        3000*SPEED,
                                        TWEEN.Easing.Sinusoidal.Out,
                                        1000*SPEED);
        let slide = this._moveVec(slideDirection,
                                  new THREE.Vector2(0.00, -0.001),
                                  {duration: 1000*SPEED});
        flip.chain(turnTable);
        turnTable.chain(slide);
        flip.start();
    }

    _fadeObj(object, direction, duration, easyType, delayMs){
        var current = { percentage : direction == "in" ? 1 : 0 };

        //https://marmelab.com/blog/2017/06/15/animate-you-world-with-threejs-and-tweenjs.html
        // https://medium.com/@lachlantweedie/animation-in-three-js-using-tween-js-with-examples-c598a19b1263
    }

    _moveObj(object, stepVector, duration, easyType, delayMs){
    }

    _moveVec(vec, stepVector, options){
    //_moveVec(vec, stepVector, duration, easyType, delayMs){
        options = options || {};
        let easing = options.easing || TWEEN.Easing.Quadratic.In;
        let duration = options.duration || 2000 * SPEED;
        let delay = options.delay || 1000 * SPEED;

        let destination = new THREE.Vector2().addVectors ( vec, stepVector );
        let moveVec = new TWEEN.Tween(vec)
            .to(Object.assign({},destination), duration)
            .easing(easing)
            .delay(delay);
        return moveVec;
    }

    // http://tweenjs.github.io/tween.js/examples/03_graphs.html
    //.easing(TWEEN.Easing.Cubic.InOut)
    //.easing(TWEEN.Easing.Elastic.Out)
    //.easing(TWEEN.Easing.Quartic.InOut)
    //.easing(TWEEN.Easing.Sinusoidal.InOut)
    _rotateObj(object, destination, duration,easyType,delayMs){
        let rotation = new TWEEN.Tween(object.rotation)
            .to(Object.assign({},destination), duration)
            .easing(easyType)
            //.onUpdate( (current) =>{
            //console.log(object.rotation);
            //});
            .delay(delayMs);
        return rotation;
    }

    // not used yet
    _flip(objects, current, frequency, amplitude){
        let angle = Math.sin((current.y-0.5) * frequency) * amplitude;
        for (var index in objects) {
            let object = objects[index];
            object.rotateOnAxis(new Vector3(0, 0 ,1), angle);
        }
    }
}
