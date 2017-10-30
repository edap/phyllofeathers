import { Vector3, Geometry, Line, LineBasicMaterial } from 'three';
import EventEmitter from './eventEmitter.js';
import { createPath } from './path.js';
import * as THREE from 'three';
import wrongPhyllo from './json/revolving.json';
import rightPhyllo from './json/flowers.json';
const TWEEN = require('@tweenjs/tween.js');
const SPEED = 1.0;
const flying = false;

const states = ['DEBUG', 'FLOWERS', 'COMPLETE', 'PLANE'];
const currentState = states[3];

export default class Animator extends EventEmitter {
	constructor(){
		super();
	}

	update(){
		TWEEN.update();
	}
	init(flower, plane, slideDirection){
		const petalsFactor = { x: 0 };
		//Flower Animations
		const flip = this._rotateObj(
			flower.group,
			{ z: Math.PI / 2 },
			{
				duration: 15000 * SPEED,
				easing: TWEEN.Easing.Elastic.Out
			}
		);
		const incFlower = this._fadeInOrOutFlower(flower, petalsFactor, { x: 1 }, { duration: 2000 * SPEED });
		const decFlower = this._fadeInOrOutFlower(
			flower,
			petalsFactor,
			{ x: 0 },
			{
				duration: 2000 * SPEED,
				//delay:8000*SPEED,
				callback: () => {
					flower.switchTo('wrong');
				}
			}
		);
		const incWrongPhyllo = this._fadeInOrOutFlower(flower, petalsFactor, { x: 1 }, { duration: 2000 * SPEED });
		const decWrongPhyllo = this._fadeInOrOutFlower(
			flower,
			petalsFactor,
			{ x: 0 },
			{
				duration: 2000 * SPEED,
				//delay:8000*SPEED,
				callback: () => {
					flower.switchTo('right');
				}
			}
		);
		// Plane Animations
		const turnTable = this._rotateObj(
			plane,
			{ x: Math.PI / 1.2 },
			{
				duration: 3000 * SPEED,
				easing: TWEEN.Easing.Sinusoidal.Out
			}
		);
		const slide = this._moveVec(slideDirection, new THREE.Vector2(-0.002, -0.001), {
			easing: TWEEN.Easing.Sinusoidal.Out,
			duration: 4000 * SPEED
		});
		const fadePlaneOut = this._fadeObj(plane, 'out', {
			delay: 8000 * SPEED,
			completeCallback: () => {
				this.removePlane();
			}
		});

		const fadePlaneIn = this._fadeObj(plane, 'in', {
			delay: 1000 * SPEED,
			startCallback: () => {
				this.addPlane();
			}
		});

		switch (currentState){
			case 'DEBUG':
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
				incFlower.chain(decFlower);
				decFlower.chain(incWrongPhyllo);
				incWrongPhyllo.chain(fadePlaneIn);
				fadePlaneIn.chain(flip);
				flip.chain(turnTable);
				turnTable.chain(slide);
				slide.chain(fadePlaneOut);
				fadePlaneOut.chain(decWrongPhyllo);
				decWrongPhyllo.chain(incFlower);
				incFlower.start();
				break;
			case 'PLANE':
				incFlower.chain(fadePlaneIn);
				fadePlaneIn.chain(slide);
				slide.chain(decFlower);
				decFlower.chain(incWrongPhyllo);
				incWrongPhyllo.chain(flip);
				flip.chain(fadePlaneOut);
				// slide.chain(fadePlaneOut);
				// fadePlaneOut.chain(decFlower);
				// decFlower.chain(incFlower);
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
		const delay = options.delay || 100 * SPEED;

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

	_fadeObj(object, direction, options){
		options = options || {};
		const easing = options.easing || TWEEN.Easing.Linear.None;
		const duration = options.duration || 2000 * SPEED;
		const delay = options.delay || 100 * SPEED;

		const current = { percentage: direction == 'in' ? 0 : 1 };
		const meshes = object.type === 'Group' ? object.children : [object];
		const tweenOpacity = new TWEEN.Tween(current)
			.to({ percentage: direction == 'in' ? 1 : 0 }, duration)
			.easing(easing)
			.onUpdate(() => {
				for (let i = 0; i < meshes.length; i++){
					meshes[i].material.opacity = current.percentage;
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

	_moveObj(object, stepVector, duration, easyType, delayMs){}

	_moveVec(vec, stepVector, options){
		//_moveVec(vec, stepVector, duration, easyType, delayMs){
		options = options || {};
		const easing = options.easing || TWEEN.Easing.Quadratic.In;
		const duration = options.duration || 2000 * SPEED;
		const delay = options.delay || 1000 * SPEED;

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
		const delay = options.delay || 1000 * SPEED;

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

	// not used yet
	_flip(objects, current, frequency, amplitude){
		const angle = Math.sin((current.y - 0.5) * frequency) * amplitude;
		for (const index in objects){
			const object = objects[index];
			object.rotateOnAxis(new Vector3(0, 0, 1), angle);
		}
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
