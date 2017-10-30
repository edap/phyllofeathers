import { Vector3, Geometry, Line, LineBasicMaterial } from 'three';
import EventEmitter from './eventEmitter.js';
import { createPath } from './path.js';
import * as THREE from 'three';
import wrongPhyllo from './json/revolving.json';
import rightPhyllo from './json/flowers.json';
const TWEEN = require('@tweenjs/tween.js');
const SPEED = 0.8;
const FADE_FLOWER_TIME = 6000;
const FADE_PLANE_TIME = 6000;
const ROTATION_TIME = 12000;
const DELAY = 1000; //this decides how much every scene will last
const flying = false;

const states = ['DEBUG', 'FLOWERS', 'COMPLETE'];
const currentState = states[0];

export default class Animator extends EventEmitter {
	constructor(){
		super();
	}

	update(){
		TWEEN.update();
	}
	init(flower, bufferFlower, plane, slideDirection){
		const petalsFactor = { x: 0 };
		const planeFactor = { x: 0 };

		// Fly animation
		const schedule = { x: 0, y: 0 };
		const destination = { x: 1.0, y: 1 };
		const flyDurationMill = 16000;
		const frequency = 44;
		const amplitude = 0.0035;
		//Flower Animations
		const flipFlower = this._rotateObj(
			flower.group,
			{ z: Math.PI },
			{
				duration: ROTATION_TIME * SPEED,
				delay: DELAY * SPEED,
				easing: TWEEN.Easing.Elastic.Out
			}
		);
		const flipBufferFlower = this._rotateObj(
			bufferFlower,
			{ z: Math.PI },
			{
				duration: ROTATION_TIME * SPEED,
				delay: DELAY * SPEED,
				easing: TWEEN.Easing.Elastic.Out
			}
		);

		const incFlower = this._fadeInOrOutFlower(
			flower,
			petalsFactor,
			{ x: 1 },
			{
				duration: FADE_FLOWER_TIME * SPEED + DELAY,
				easing: TWEEN.Easing.Sinusoidal.In
			}
		);

		const flyFlower = this._flyAway(flower.group, schedule, destination, flyDurationMill, frequency, amplitude, {
			duration: FADE_FLOWER_TIME * SPEED + DELAY,
			easing: TWEEN.Easing.Sinusoidal.In
		});

		const decFlower = this._fadeInOrOutFlower(
			flower,
			petalsFactor,
			{ x: 0 },
			{
				duration: FADE_FLOWER_TIME * SPEED,
				delay: DELAY * SPEED,
				callback: () => {
					flower.switchTo('wrong');
					this.emit('COPY-FLOWER-TO-BUFFERFLOWER');
				}
			}
		);
		const incWrongPhyllo = this._fadeInOrOutFlower(
			flower,
			petalsFactor,
			{ x: 1 },
			{
				duration: FADE_FLOWER_TIME * SPEED,
				delay: DELAY * SPEED,
				easing: TWEEN.Easing.Sinusoidal.In
			}
		);
		const decWrongPhyllo = this._fadeInOrOutFlower(
			flower,
			petalsFactor,
			{ x: 0 },
			{
				duration: FADE_FLOWER_TIME * SPEED,
				delay: DELAY * SPEED,
				callback: () => {
					flower.switchTo('right');
					this.emit('COPY-FLOWER-TO-BUFFERFLOWER');
				}
			}
		);
		// Plane Animations
		const slide = this._moveVec(slideDirection, new THREE.Vector2(0.001, 0.001), {
			easing: TWEEN.Easing.Sinusoidal.Out,
			duration: FADE_FLOWER_TIME * SPEED,
			delay: DELAY * SPEED
		});
		const fadePlaneOut = this._fadeObj(
			plane,
			planeFactor,
			{ x: 0 },
			{
				duration: FADE_PLANE_TIME * SPEED,
				delay: DELAY * SPEED,
				completeCallback: () => {
					this.removePlane();
				}
			}
		);

		const fadePlaneIn = this._fadeObj(
			plane,
			planeFactor,
			{ x: 1 },
			{
				duration: FADE_PLANE_TIME * SPEED,
				delay: DELAY * SPEED,
				startCallback: () => {
					this.addPlane();
				}
			}
		);

		switch (currentState){
			case 'DEBUG':
				incFlower.chain(flyFlower);
				incFlower.start();
				break;
			case 'FLOWERS':
				incFlower.chain(decFlower);
				decFlower.chain(incWrongPhyllo);
				incWrongPhyllo.chain(decWrongPhyllo);
				decWrongPhyllo.chain(incFlower);
				incFlower.start();
				break;
			case 'COMPLETE':
				//incFlower.chain(fadePlaneIn);
				fadePlaneIn.chain(slide);
				slide.chain(decFlower);
				decFlower.chain(incWrongPhyllo);
				incWrongPhyllo.chain(flipBufferFlower);
				flipBufferFlower.chain(fadePlaneOut);
				fadePlaneOut.chain(flipFlower);
				flipFlower.chain(decWrongPhyllo);
				decWrongPhyllo.chain(incFlower);
				incFlower.start();
			default:
				incFlower.start();
				break;
		}
	}

	_fadeInOrOutFlower(flower, from, dest, options){
		options = options || {};
		const easing = options.easing || TWEEN.Easing.Linear.None;
		const duration = options.duration || 2000 * SPEED;
		const delay = options.delay || 0;

		const grow = new TWEEN.Tween(from)
			.to(dest, duration)
			.easing(easing)
			.delay(delay)
			.onUpdate(current => {
				flower.makePetalsVisible(current.x);
			})
			.onComplete(() => {
				if (options.callback){
					options.callback();
				}
			});
		return grow;
	}

	_flyAway(object, schedule, destination, flyDurationMill, frequency, amplitude, options){
		const easing = options.easing || TWEEN.Easing.Linear.None;
		const duration = options.duration || 2000 * SPEED;
		const delay = options.delay || 0;
		const meshes = object.type === 'Group' ? object.children : [object];
		const flyAround = new TWEEN.Tween(schedule)
			.to(Object.assign({}, destination), flyDurationMill)
			//.easing(TWEEN.Easing.Cubic.InOut)// this was messing up, a lot, the rotations
			.easing(TWEEN.Easing.Sinusoidal.InOut) // this was messing up, a lot, the rotations
			.onUpdate(current => {
				//console.log(current);
				this._fly(meshes, current, frequency, amplitude);
			});
		return flyAround;
	}

	_fly(objects, current, frequency, amplitude){
		const angle = Math.sin((current.y - 0.5) * frequency) * amplitude;
		for (const index in objects){
			const object = objects[index];
			object.rotateZ(angle);
		}
	}

	_fadeObj(object, from, to, options){
		options = options || {};
		const easing = options.easing || TWEEN.Easing.Linear.None;
		const duration = options.duration || 2000 * SPEED;
		const delay = options.delay || 0;

		const meshes = object.type === 'Group' ? object.children : [object];
		const tweenOpacity = new TWEEN.Tween(from)
			.to(to, duration)
			.easing(easing)
			.onUpdate(current => {
				for (let i = 0; i < meshes.length; i++){
					meshes[i].material.opacity = current.x;
				}
			})
			.delay(delay)
			.onStart(() => {
				if (options.startCallback){
					options.startCallback();
				}
			})
			.onComplete(() => {
				if (options.completeCallback){
					options.completeCallback();
				}
			});
		return tweenOpacity;
	}

	_moveVec(vec, stepVector, options){
		//_moveVec(vec, stepVector, duration, easyType, delayMs){
		options = options || {};
		const easing = options.easing || TWEEN.Easing.Quadratic.In;
		const duration = options.duration || 2000 * SPEED;
		const delay = options.delay || 0;

		const destination = new THREE.Vector2().addVectors(vec, stepVector);
		const moveVec = new TWEEN.Tween(vec)
			.to(Object.assign({}, destination), duration)
			.easing(easing)
			.delay(delay)
			//.onStart(() => {console.log("STARTED");})
			//.onUpdate((curr) => {console.log(curr);})
			.onComplete(() => {
				if (options.callback){
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
		const easing = options.easing || TWEEN.Easing.Quadratic.In;
		const duration = options.duration || 2000 * SPEED;
		const delay = options.delay || 0;

		const rotation = new TWEEN.Tween(object.rotation)
			.to(Object.assign({}, destination), duration)
			.easing(easing)
			.onComplete(() => {
				if (options.callback){
					options.callback();
				}
			})
			.delay(delay);
		return rotation;
	}

	removePlane(){
		//this.emit('ADD-FLOWER-TO-SCENE');
		this.emit('REMOVE-PLANE-FROM-SCENE');
		this.emit('REMOVE-FLOWER-FROM-BUFFERSCENE');
	}

	addPlane(){
		//this.emit('REMOVE-FLOWER-FROM-SCENE');
		this.emit('ADD-FLOWER-TO-BUFFERSCENE');
		this.emit('ADD-PLANE-TO-SCENE');
	}
}
