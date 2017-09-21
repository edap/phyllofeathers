import {Vector3, Geometry, Line, LineBasicMaterial } from 'three';
import {createPath} from './path.js';

const TWEEN = require('@tweenjs/tween.js');

export default class Animator {
    constructor(){
        this.ring = this._createCurve();
    }

    flipAtRandomIntervals(time, objects, group){
        // start with a circular movement, and an animation dictated from a value that goes from 0 to 1
        this._moveInCircle(time, group);
        // for (var index in objects) {
        //     let object = objects[index];
        //     object.rotateOnAxis(new Vector3(0, 0 ,1), Math.sin(time));
        // }
    }

    _moveInCircle(time, group, n_circles = 1){
        let x = Math.sin(time*0.02);
        let y = Math.cos(time*0.02);
        group.position.set(x*20, 0, y*20);
    }

    addDebugCurve(scene){
        let curve_density = 200;
        let geometry = new Geometry();
        geometry.vertices = this.ring.getPoints( curve_density );
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
