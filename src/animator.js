import {Vector3, Geometry, Line, LineBasicMaterial } from 'three';
import {createPath} from './path.js';

const TWEEN = require('@tweenjs/tween.js');
let flying = false;

export default class Animator {
    constructor(){
        this.spline = this._createCurve();
        this.positionOnTheCurve = 0; //value that goes from 0 to 1
        this.speed = 0.0008;
        this.schedule = {x: 0, y:0};
        this.destination = {x:1.0, y:1.0};
        this.seconds = 10;
        // Fly animation
        this.timeNextFly = 0;
        this.flyDurationMill = 9000;
        this.minIntervalMill = this.flyDurationMill + 500;
        this.maxIntervalMill = this.minIntervalMill + 5000;
    }

    getRandomArbitrary(min, max){
        return Math.random() * (max -min) +min;
    }

    move(time, objects, group){
        TWEEN.update();
        if (time >= this.timeNextFly && flying === false) {
            this.schedule = {x:0, y:0};
            let delay = Math.random() * (this.maxIntervalMill -this.minIntervalMill) + this.minIntervalMill;
            this.flyAround = new TWEEN.Tween(this.schedule) // Create a new tween that modifies 'coords'.
                .to(Object.assign({}, this.destination), this.flyDurationMill) // Move to (300, 200) in 1 second.
                .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                .onUpdate( (current) =>{ // Called after tween.js updates 'coords'.
                    // Move 'box' to the position described by 'coords' with a CSS translation.
                    this._moveInCircle(time, current, group);
                    this._flip(objects, time);
                }).onComplete(() => {flying = false;})
            .start().delay(delay);
            flying = true;
            this.timeNextFly = time + (this.flyDurationMill + delay) / 1000.0;
        }

        //this._moveInCircle(time, this.schedule, group);
        //start with a circular movement, and an animation dictated from a value that goes from 0 to 1
    }

    _flip(objects, time){
        for (var index in objects) {
            let object = objects[index];
            object.rotateOnAxis(new Vector3(0, 0 ,1), Math.sin(time) * 0.2);
        }
    }

    _moveInCircle(time, currFrame, group, n_circles = 1){
        let currPos = this.spline.getPointAt(currFrame.x);
        console.log(currPos);
        console.log(currFrame.x);

        group.position.set(currPos.x, 0, currPos.z);
        let next = this.positionOnTheCurve + this.speed * 20;
        let lookAtPoint = (next > 1) ? 0 : next;
        let look = this.spline.getPointAt(lookAtPoint);
        //orientate to next point on curve direction
        group.lookAt(look);
        //but keep the crown looking up
        group.rotateX(-Math.PI/2);
        let limit = 1 - this.speed;
        this.positionOnTheCurve= (this.positionOnTheCurve>= limit) ? 0 : this.positionOnTheCurve+= this.speed;
    }

    addDebugCurve(scene){
        let curve_density = 200;
        let geometry = new Geometry();
        geometry.vertices = this.spline.getPoints( curve_density );
        let material = new LineBasicMaterial( { color : 0xff0000 } );
        // Create the final object to add to the scene
        let curveObject = new Line( geometry, material );
        scene.add(curveObject);
    };

    _createCurve(){
        //curve
        let t = 0;
        const radius = 80;
        const radius_offset = 30;
        return createPath(radius, radius_offset);
    }

    // random interval. trig the animation.
    // the animation is not in loop, it is one animation triggered ad
}
