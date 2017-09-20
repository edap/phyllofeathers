import {Vector3} from 'three';

const TWEEN = require('@tweenjs/tween.js');

export default class Animator {

    flipAtRandomIntervals(time, objects){
        // start with a circular movement, and an animation dictated from a value that goes from 0 to 1
        for (var index in objects) {
            let object = objects[index];
            object.rotateOnAxis(new Vector3(0, 0 ,1), Math.sin(time));
        }
    }

    _moveInCircle(time, n_circles = 1){
        let x = Math.sin(time);
        let y = Math.cos(time);
        this.group.position.set(x, y, 0);
    }

    // random interval. trig the animation.
    // the animation is not in loop, it is one animation triggered ad


}
