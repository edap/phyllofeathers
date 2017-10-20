import {Vector3, Geometry, Line, LineBasicMaterial } from 'three';
import {createPath} from './path.js';

const TWEEN = require('@tweenjs/tween.js');
let flying = false;

export default class Animator {
    constructor(){
        this.speed = 0.0008;
        this.schedule = {x: 0, y:1};
        this.destination = {x:1.0, y:0};

        // Fly animation
        this.timeNextFly = 0;
        this.flyDurationMill = 16000;
        this.flipFrequency = 44;
        this.flipAmplitude = 0.0035;
        this.calmStartSec = 5; // at the beginning do not flip
        this.minIntervalMill = 5000;
        this.maxIntervalMill = 15000;

        this.rotationScale = 0.04;
    }

    _getRandomDelay(){
        return Math.random() * (this.maxIntervalMill -this.minIntervalMill) + this.minIntervalMill;
    }


    rotateTween(time, group){
        TWEEN.update();
        if (time >= this.timeNextFly && time > this.calmStartSec && flying === false) {
            this.schedule = {x:0, y:1};
            let delay = this._getRandomDelay();
            this.flyAround = new TWEEN.Tween(this.schedule)
                .to(Object.assign({}, this.destination), this.flyDurationMill)
                //.easing(TWEEN.Easing.Cubic.InOut)// this was messing up, a lot, the rotations
                .easing(TWEEN.Easing.Elastic.Out)
                //.easing(TWEEN.Easing.Quartic.InOut)
                //.easing(TWEEN.Easing.Sinusoidal.InOut)// this was messing up, a lot, the rotations
                .onUpdate( (current) =>{
                    group.rotateZ( current.y * this.rotationScale);
                }).onComplete( (current) => {
                    flying = false;
                } )
            .start().delay(delay);
            flying = true;
            this.timeNextFly = time + (this.flyDurationMill + delay) / 1000.0;
        }
    }

    move(time, objects, group){
        TWEEN.update();
        if (time >= this.timeNextFly && time > this.calmStartSec && flying === false) {
            this.schedule = {x:0, y:0};
            let delay = this._getRandomDelay();

            this._flip(objects, {x:0,y:0}, this.flipFrequency, this.flipAmplitude);// this is because otherwise the rotation
            // on the z axis goes out of fase, onUpdate is executing when schedule.x is already
            // bigger than 0
            this.flyAround = new TWEEN.Tween(this.schedule)
                .to(Object.assign({}, this.destination), this.flyDurationMill)
                //.easing(TWEEN.Easing.Cubic.InOut)// this was messing up, a lot, the rotations
                .easing(TWEEN.Easing.Sinusoidal.InOut)// this was messing up, a lot, the rotations
                .onUpdate( (current) =>{
                    this._flip(objects, current, group );
                }).onComplete( (current) => {
                    flying = false;
                } )
            .start().delay(delay);
            flying = true;
            this.timeNextFly = time + (this.flyDurationMill + delay) / 1000.0;
        }
    }

    _flip(objects, current, frequency, amplitude){
        let angle = Math.sin((current.y-0.5) * frequency) * amplitude;
        for (var index in objects) {
            let object = objects[index];
            object.rotateOnAxis(new Vector3(0, 0 ,1), angle);
        }
    }
}
