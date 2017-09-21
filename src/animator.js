import {Vector3, Geometry, Line, LineBasicMaterial } from 'three';
import {createPath} from './path.js';

const TWEEN = require('@tweenjs/tween.js');

export default class Animator {
    constructor(){
        this.spline = this._createCurve();
        this.positionOnTheCurve = 0; //value that goes from 0 to 1
        this.speed = 0.0008;
    }

    flipAtRandomIntervals(time, objects, group){
        // start with a circular movement, and an animation dictated from a value that goes from 0 to 1
        this._moveInCircle(time, group);
        for (var index in objects) {
            let object = objects[index];
            object.rotateOnAxis(new Vector3(0, 0 ,1), Math.sin(time));
        }
    }


    _moveInCircle(time, group, n_circles = 1){
        let currPos = this.spline.getPointAt(this.positionOnTheCurve);

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
