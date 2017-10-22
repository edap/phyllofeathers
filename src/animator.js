import {Vector3, Geometry, Line, LineBasicMaterial } from 'three';
import {createPath} from './path.js';

const TWEEN = require('@tweenjs/tween.js');
let flying = false;

export default class Animator {
    constructor(){
    }

    update(){
        TWEEN.update();
    }

    //Init and carousel are not compatible. o una o l'altra
    init(flowerGroup, plane, slideDirection){
        let flip = this._rotateObj(flowerGroup, {z: Math.PI/2}, 15000,TWEEN.Easing.Elastic.Out, 1000);
        let turnTable = this._rotateObj(plane, {x: Math.PI/2}, 3000,TWEEN.Easing.Elastic.Out, 1000);
        flip.chain(turnTable);
        flip.start();
    }

    _fadeOutObj(object){
        //https://marmelab.com/blog/2017/06/15/animate-you-world-with-threejs-and-tweenjs.html
        // https://medium.com/@lachlantweedie/animation-in-three-js-using-tween-js-with-examples-c598a19b1263
    }

    _moveObj(object, destination, duration, easyType, delayMs){
    }

    //.easing(TWEEN.Easing.Cubic.InOut)
    //.easing(TWEEN.Easing.Elastic.Out)
    //.easing(TWEEN.Easing.Quartic.InOut)
    //.easing(TWEEN.Easing.Sinusoidal.InOut)
    _rotateObj(object, destination, duration,easyType,delayMs){
        let rotation = new TWEEN.Tween(object.rotation)
            .to(Object.assign(destination), duration)
            .easing(easyType)
            .delay(delayMs)
            .onUpdate( (current) =>{
                //console.log(object.rotation);
            });
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
