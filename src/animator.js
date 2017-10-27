import {Vector3, Geometry, Line, LineBasicMaterial } from 'three';
import {createPath} from './path.js';
import * as THREE from 'three';

import wrongPhyllo from './json/revolving.json';
import rightPhyllo from './json/flowers.json';


const TWEEN = require('@tweenjs/tween.js');
const SPEED = 1.0;
let flying = false;

export default class Animator{
    update(){
        TWEEN.update();
    }

    init(flower, plane, slideDirection){
        // let grow from 1 to 100
        // grow from 100 to 1
        // change phyllotaxis type
        let petalsFactor = {x:0};
        let flip = this._rotateObj(flower.group,
                                   {z: Math.PI/2},
                                   {duration: 15000*SPEED,
                                    easing: TWEEN.Easing.Elastic.Out});
        let turnTable = this._rotateObj(plane,
                                        {x: Math.PI/2},
                                        {duration: 3000*SPEED,
                                         easing: TWEEN.Easing.Sinusoidal.Out});
        let slide = this._moveVec(slideDirection,
                                  new THREE.Vector2(0.00, -0.001),
                                  {duration: 1000*SPEED});
        let fadePlaneOut = this._fadeObj(plane,'out', {delay: 100000*SPEED});
        //let decFlower = this._incOrDecFlower(flower, petalsFactor, {x:0}, {duration:2000, callback: () => {flower.switchToWrong();}});
        let incFlower = this._incOrDecFlower(flower, petalsFactor, {x:1}, {duration:2000*SPEED});

        let decFlower = this._incOrDecFlower(flower, petalsFactor, {x:0}, {duration:2000*SPEED,
                                                                           callback: () => {flower.switchToWrong();}});

        let incWrongPhyllo = this._incOrDecFlower(flower, petalsFactor, {x:1}, {duration:2000*SPEED});

        let decWrongPhyllo = this._incOrDecFlower(flower, petalsFactor, {x:0}, {duration:2000*SPEED,
                                                                           callback: () => {flower.switchToRight();}});

        incFlower.chain(decFlower);
        decFlower.chain(incWrongPhyllo);
        incWrongPhyllo.chain(decWrongPhyllo);
        //incWrongPhyllo.chain(flip);
        // flip.chain(turnTable);
        // turnTable.chain(slide);
        // slide.chain(fadePlaneOut);
        // fadePlaneOut.chain(decWrongPhyllo);
        decWrongPhyllo.chain(incFlower);
        incFlower.start();
    }

    _incOrDecFlower(flower, from, dest, options){
        options = options || {};
        let easing = options.easing || TWEEN.Easing.Quadratic.In;
        let duration = options.duration || 2000 * SPEED;
        let delay = options.delay || 1000 * SPEED;

        let destination = {x: 1};
        let grow = new TWEEN.Tween(from)
            .to(dest, duration)
            .easing(easing)
            .delay(delay)
            .onUpdate((current) => {
                flower.regenerate(flower.getParams(), Math.ceil(current.x * flower.getParams().num));
            })
            .onComplete(function(){
                if(options.callback){
                    options.callback();
                }
            });
        return grow;
    }


    _fadeObj(object, direction, options){
        options = options || {};
        let easing = options.easing || TWEEN.Easing.Linear.None;
        let duration = options.duration || 2000 * SPEED;
        let delay = options.delay || 1000 * SPEED;

        var current = { percentage : direction == "in" ? 0 : 1 };
        let meshes = object.type === "Group" ? object.children : [object];
        let tweenOpacity = new TWEEN.Tween(current)
            .to({ percentage: direction == "in" ? 1 : 0 }, duration)
            .easing(easing)
            .onUpdate(function() {
                for (var i = 0; i < meshes.length; i++) {
                    meshes[i].material.opacity = current.percentage;
                }
            })
            .delay(delay)
            .onComplete(function(){
                if(options.callback){
                    options.callback();
                }
            });
        return tweenOpacity;
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
            .delay(delay)
            .onComplete(function(){
                if(options.callback){
                    options.callback();
                }
            });
        return moveVec;
    }

    // http://tweenjs.github.io/tween.js/examples/03_graphs.html
    //.easing(TWEEN.Easing.Cubic.InOut)
    //.easing(TWEEN.Easing.Elastic.Out)
    //.easing(TWEEN.Easing.Quartic.InOut)
    //.easing(TWEEN.Easing.Sinusoidal.InOut)
    _rotateObj(object, destination, options){
        // TODO, deve supportare anche i gruppi
        options = options || {};
        let easing = options.easing || TWEEN.Easing.Quadratic.In;
        let duration = options.duration || 2000 * SPEED;
        let delay = options.delay || 1000 * SPEED;

        let rotation = new TWEEN.Tween(object.rotation)
            .to(Object.assign({}, destination), duration)
            .easing(easing)
            .onComplete(function(){
                if(options.callback){
                    options.callback();
                }
            })
           .delay(delay);
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
