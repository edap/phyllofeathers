import {Vector3, Geometry, Line, LineBasicMaterial } from 'three';
import {createPath} from './path.js';
import * as THREE from 'three';

const TWEEN = require('@tweenjs/tween.js');
const SPEED = 0.2;
let flying = false;

export default class Animator {
    constructor(){
    }

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
                                  1000*SPEED,
                                  TWEEN.Easing.Linear.None,
                                  1000*SPEED);
        flip.chain(turnTable);
        turnTable.chain(slide);
        flip.start();
    }

    _fadeOutObj(object){
        //https://marmelab.com/blog/2017/06/15/animate-you-world-with-threejs-and-tweenjs.html
        // https://medium.com/@lachlantweedie/animation-in-three-js-using-tween-js-with-examples-c598a19b1263
    }

    _moveObj(object, stepVector, duration, easyType, delayMs){
    }

    _moveVec(vec, stepVector, duration, easyType, delayMs){
        let destination = new THREE.Vector2().addVectors ( vec, stepVector );
        let moveVec = new TWEEN.Tween(vec)
            .to(Object.assign({},destination), duration)
            .easing(easyType)
            .delay(delayMs)
            // .onUpdate( (current) =>{
            //     console.log(vec);
            // });
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
            .delay(delayMs)
            //.onUpdate( (current) =>{
            //console.log(object.rotation);
            //});
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
