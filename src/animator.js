import { Vector3, Geometry, Line, LineBasicMaterial } from 'three';
import EventEmitter from './eventEmitter.js';
import { createPath } from './path.js';
import * as THREE from 'three';
const TWEEN = require('@tweenjs/tween.js');
const SPEED = 1.0;
const FADE_FLOWER_TIME = 600;
const FADE_PLANE_IN_TIME = 1000;
const FADE_PLANE_OUT_TIME = 1000;
const DELAY = 1000; //this decides how much every scene will last
const FLY_TIME = 6000;
const FLY_FREQUENCY = 24;
const FLY_AMPLITUDE = 0.0035;

const states = ['DEBUG', 'FLOWERS', 'COMPLETE'];
const currentState = states[2];

export default class Animator extends EventEmitter {
	constructor(){
		super();
	}

	update(){
		TWEEN.update();
	}
	init(opt){
		const { revolver, flower, bufferRevolver, bufferFlower, plane } = opt;
		const petalsFactor = { x: 0 };
		const planeFactor = { x: 0 };

		//Flower Animations
		const flyFlower = this._flyAway(flower.group, { y: 0 }, { y: 1 }, FLY_FREQUENCY, FLY_AMPLITUDE, {
			duration: FLY_TIME * SPEED,
			easing: TWEEN.Easing.Sinusoidal.InOut
		});

		const flipFlower = this._rotateObj(
			revolver.group,
			{ z: -Math.PI },
			{
				duration: FLY_TIME * SPEED,
				easing: TWEEN.Easing.Circular.Out
			}
		);
		const flipBufferFlower = this._rotateObj(
			bufferRevolver,
			{ z: -Math.PI },
			{
				duration: FLY_TIME * SPEED,
				//delay: DELAY * SPEED,
				easing: TWEEN.Easing.Elastic.Out
			}
		);

		const incFlower = this._fadeInOrOutFlower(
			flower,
			petalsFactor,
			{ x: 1 },
			{
				duration: FADE_FLOWER_TIME * SPEED,
				//easing: TWEEN.Easing.Sinusoidal.In
				easing: TWEEN.Easing.Circular.In
			}
		);

		const decFlower = this._fadeInOrOutFlower(
			flower,
			petalsFactor,
			{ x: 0 },
			{
				delay: FLY_TIME * SPEED,
				duration: FADE_FLOWER_TIME * SPEED,
				callback: () => {
					this.emit('ENTER-REVOLVER');
				}
			}
		);
		const incWrongPhyllo = this._fadeInOrOutFlower(
			revolver,
			petalsFactor,
			{ x: 1 },
			{
				duration: FADE_FLOWER_TIME * SPEED,
				delay: DELAY * SPEED,
				easing: TWEEN.Easing.Sinusoidal.In
			}
		);
		const decWrongPhyllo = this._fadeInOrOutFlower(
			revolver,
			petalsFactor,
			{ x: 0 },
			{
				duration: FADE_FLOWER_TIME * SPEED,
				//delay: DELAY * SPEED,
				callback: () => {
					this.emit('ENTER-FLOWER');
				}
			}
		);

		const fadePlaneOut = this._fadeObj(
			plane,
			planeFactor,
			{ x: 0 },
			{
				duration: FADE_PLANE_OUT_TIME * SPEED,
				//delay: DELAY * SPEED,
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
				duration: FADE_PLANE_IN_TIME * SPEED,
				//delay: DELAY * SPEED,
				startCallback: () => {
					this.addPlane();
				}
			}
		);

		switch (currentState){
			case 'DEBUG':
				//incFlower.chain(flyFlower);
				incFlower.start();
				break;
			case 'FLOWERS':
				incFlower.chain(decFlower);
				decFlower.chain(incWrongPhyllo);
				//incWrongPhyllo.chain(decWrongPhyllo);
				//decWrongPhyllo.chain(incFlower);
				incFlower.start();
				break;
			case 'COMPLETE':
				incFlower.chain(flyFlower);
				flyFlower.chain(fadePlaneIn);
				fadePlaneIn.chain(decFlower);
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

	_flyAway(object, from, to, frequency, amplitude, options){
		const easing = options.easing || TWEEN.Easing.Linear.None;
		const duration = options.duration || 2000 * SPEED;
		const delay = options.delay || 0;
		const meshes = object.type === 'Group' ? object.children : [object];
		const flyAround = new TWEEN.Tween(from)
			.to(to, duration)
			//.easing(TWEEN.Easing.Cubic.InOut)// this was messing up, a lot, the rotations
			.easing(TWEEN.Easing.Sinusoidal.InOut) // this was messing up, a lot, the rotations
			.onComplete(() => {
				from.y = 0;
			})
			.onUpdate(current => {
				this._fly(meshes, current, frequency, amplitude);
			});
		return flyAround;
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

	_rotateObj(object, destination, options){
		options = options || {};
		const easing = options.easing || TWEEN.Easing.Quadratic.In;
		const duration = options.duration || 2000 * SPEED;
		const delay = options.delay || 0;

		const rotation = new TWEEN.Tween(object.rotation)
			.to(Object.assign({}, destination), duration)
			.easing(easing)
			.onComplete(() => {
				destination.z = 0;
				// the reset of the rotation is done in the Scenographer
				//object.setRotationFromEuler(originalRotation);
				if (options.callback){
					options.callback();
				}
			})
			.delay(delay);
		return rotation;
	}

	removePlane(){
		this.emit('REMOVE-PLANE-FROM-SCENE');
	}

	addPlane(){
		this.emit('ADD-PLANE-TO-SCENE');
	}
}
