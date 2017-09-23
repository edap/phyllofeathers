import {Vector3, Geometry, Line, LineBasicMaterial } from 'three';
import {createPath} from './path.js';

const TWEEN = require('@tweenjs/tween.js');
let flying = false;

export default class Animator {
    constructor(){
        this.spline = this._createCurve();
        this.speed = 0.0008;
        this.schedule = {x: 0, y:0};
        this.destination = {x:1.0, y:1};

        // Fly animation
        this.timeNextFly = 0;
        this.flyDurationMill = 3000;
        this.calmStartSec = 3; // at the beginning do not flip
        this.minIntervalMill = this.flyDurationMill + 500;
        this.maxIntervalMill = this.minIntervalMill + 5000;
    }

    _getRandomDelay(){
        return Math.random() * (this.maxIntervalMill -this.minIntervalMill) + this.minIntervalMill;
    }

    move(time, objects, group){
        TWEEN.update();
        if (time >= this.timeNextFly && time > this.calmStartSec && flying === false) {
            this.schedule = {x:0, y:0};
            let delay = this._getRandomDelay();

            this._flip(objects, {x:0,y:0});// this is because otherwise the rotation
            // on the z axis goes out of fase, onUpdate is executing when schedule.x is already
            // bigger than 0
            this.flyAround = new TWEEN.Tween(this.schedule)
                .to(Object.assign({}, this.destination), this.flyDurationMill)
                //.easing(TWEEN.Easing.Quadratic.Out) this was messing up, a lot, the rotations
                .onUpdate( (current) =>{
                    this._fly(objects, current, group );
                }).onComplete( (current) => {
                    flying = false;
                } )
            .start().delay(delay);
            flying = true;
            this.timeNextFly = time + (this.flyDurationMill + delay) / 1000.0;
        }
    }

    _fly(objects, current, group){
        //console.log(current.y-0.5);
        this._moveInCircle(current, group);
        this._flip(objects, current);
    }

    _flip(objects, current){
        let angle = Math.sin((current.y-0.5) * 0.4);
        console.log(angle);
        for (var index in objects) {
            let object = objects[index];
            // this is to avaoid a scaleRatio of 0, that would cause a warning while scaling for 0
            object.rotateOnAxis(new Vector3(0, 0 ,1), angle);
        }
    }

    _moveInCircle(currFrame, group, n_circles = 1){
        let currPos = this.spline.getPointAt(currFrame.x);
        group.position.set(currPos.x, 0, currPos.z);

        //orientate to next point on curve direction
        let next = currFrame.x + this.speed * 20;
        let lookAtPoint = (next > 1) ? 0 : next;
        let look = this.spline.getPointAt(lookAtPoint);
        group.lookAt(look);

        //but keep the crown looking up
        group.rotateX(-Math.PI/2);
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
