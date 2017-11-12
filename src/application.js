/* eslint-env browser */
//const ParrotType = 'blue-fronted-parrot';
//const ParrotType = 'budgeridgar';
//const ParrotType = 'eastern-rosella';
//const ParrotType = 'ring-necked-parakeet';
const ParrotType = 'fischers-lovebird';
const debug = false;
const targetSize = 4096;

import Animator from './animator.js';
import * as THREE from 'three';
import Stats from 'stats.js';
import { loadBird } from './assets.js';

import { limitControls } from './utils.js';
import { getPlaneShader } from './shaders.js';
import Scenographer from './scenographer.js';
import BufferManager from './buffersManager.js';

import { createFlowerAndRevolver } from './flowers/factory';

//setup scene and camera
const scene = new THREE.Scene();
let scenographer;
const OrbitControls = require('three-orbit-controls')(THREE);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ antialias: true, transparent: true });
const animator = new Animator();
renderer.setSize(window.innerWidth, window.innerHeight);

const gl = renderer.getContext();
gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
let controls;

// init variables
let buffers;
const clock = new THREE.Clock();
const stats = new Stats();

function init(assets){
	document.body.appendChild(renderer.domElement);
	camera.position.z = 150;
	camera.position.y = -50;

	// stats
	stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
	window.addEventListener('resize', () => {
		let WIDTH = window.innerWidth,
			HEIGHT = window.innerHeight;
		renderer.setSize(WIDTH, HEIGHT);
		camera.aspect = WIDTH / HEIGHT;
		camera.updateProjectionMatrix();
	});

	if (debug){
		document.body.appendChild(stats.domElement);
		const axisHelper = new THREE.AxesHelper(50);
		scene.add(axisHelper);
	}

	const { flower, revolver } = createFlowerAndRevolver(ParrotType, assets, maxAnisotropy);

	buffers = new BufferManager(targetSize);

	scenographer = new Scenographer(scene, buffers.getBufferScene(), buffers.getPlane(), flower.group, revolver.group, animator);
	scenographer.turnLightOn();
	scenographer.add(flower.group);

	const objectsToAnimate = {
		revolver,
		flower,
		bufferRevolver: scenographer.getBufferRevolver(),
		bufferFlower: scenographer.getBufferFlower(),
		plane: buffers.getPlane()
	};
	animator.init(objectsToAnimate);

	controls = new OrbitControls(camera, renderer.domElement);
	limitControls(controls);

	render();
}

function render(){
	const time = clock.getElapsedTime();
	stats.begin();
	requestAnimationFrame(render);
	animator.update();

	if (buffers.areUsed()){
		//console.log(time);
		buffers.update(time);
		renderer.render(buffers.getBufferScene(), camera, buffers.getTextureB(), true);
	}
	renderer.render(scene, camera);
	stats.end();
}

function removeSpinner(){
	const elem = document.getElementsByClassName('loading')[0];
	if (elem){
		elem.parentNode.removeChild(elem);
	}
}

loadBird(ParrotType)
	.then(
		assets => {
			removeSpinner();
			init(assets);
		},
		err => {
			console.log(`impossible to load the assets: ${err}`);
		}
	)
	['catch'](error => {
		console.error(error.stack);
	});
