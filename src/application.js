/* eslint-env browser */
const ParrotType = 'blue-fronted-parrot';
//const ParrotType = 'budgeridgar';
//const ParrotType = 'eastern-rosella';
//const ParrotType = 'ring-necked-parakeet';
//const ParrotType = 'fischers-lovebird';
const debug = false;
const wrongPhyllo = false; // in debuge mode, this switch tells to the gui which params to use.
const targetSize = 4096;

import {getWrongPhylloParamsForBird, getRightPhylloParamsForBird} from './store.js';
import { addTexturesToMaterial } from './materialHelper.js';
import Animator from './animator.js';
import * as THREE from 'three';
import Gui from './gui.js';
import Stats from 'stats.js';
import CollectionMaterials from './materials.js';
import { loadBird } from './assets.js';
import Flower from './flower.js';
import { limitControls } from './utils.js';
import { getPlaneShader } from './shaders.js';
import Scenographer from './scenographer.js';
import BufferManager from './buffersManager.js';

//setup scene and camera
const scene = new THREE.Scene();
let scenographer;
const OrbitControls = require('three-orbit-controls')(THREE);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({antialias:true, transparent:true});
const animator = new Animator();
renderer.setSize(window.innerWidth, window.innerHeight);
const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
let controls;

// init variables
let buffers;
const clock = new THREE.Clock();
const stats = new Stats();
const materials = new CollectionMaterials();
let gui;
let flower;

function init(assets){
    document.body.appendChild(renderer.domElement);
    camera.position.z = 100;
    camera.position.y = -50;

    // stats
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    });
    if (debug) {
        gui = new Gui(regenerate, materials, assets.textures, maxAnisotropy, ParrotType, debug, wrongPhyllo);
        flower = new Flower(gui.params, materials, assets, ParrotType, maxAnisotropy);
        flower.makePetalsVisible(1.0);
        document.body.appendChild(stats.domElement);
        var axisHelper = new THREE.AxisHelper( 50 );
        scene.add(axisHelper);
    } else {
        document.body.appendChild(stats.domElement);
        var axisHelper = new THREE.AxisHelper( 50 );
        scene.add(axisHelper);

        let param;
        if (wrongPhyllo) {
            param = getWrongPhylloParamsForBird(ParrotType);
        } else {
            param = getRightPhylloParamsForBird(ParrotType);
        }
        addTexturesToMaterial(materials, param, assets.textures, maxAnisotropy);
        flower = new Flower(param, materials, assets, ParrotType, maxAnisotropy);
    }
    flower.group.name = 'flower';
    flower.group.rotateY(Math.PI/2);

    buffers = new BufferManager(targetSize);
    animator.init(flower, buffers.getPlane(), buffers.getSlideDirection());

    scenographer = new Scenographer(scene, buffers.getBufferScene(), buffers.getPlane(), flower.group, animator);
    // ambient lights. TODO, use them or not?
    //let ambientLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    //let ambientLight2 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    //scene.add( ambientLight2 );
    //bufferScene.add(ambientLight);
    scenographer.turnLightOn();
    scenographer.addToBufferScene(flower.group);
    scenographer.add(flower.group);

    controls = new OrbitControls(camera, renderer.domElement);
    limitControls(controls);

    render();
}

function render(){
    let time = clock.getElapsedTime();
    stats.begin();
    requestAnimationFrame(render);
    if (!debug) animator.update();

    buffers.update();
    renderer.render(buffers.getBufferScene(), camera, buffers.getTextureB(), true);

    renderer.render(scene, camera);
    stats.end();
}

let regenerate = () => {
    if(debug){
        flower.regenerate(gui.params, debug);
    }
};

function removeSpinner(){
    let elem = document.getElementsByClassName("loading")[0];
    if (elem) {
        elem.parentNode.removeChild(elem);
    };
}

loadBird(ParrotType).then(
    (assets) => {
        removeSpinner();
        init(assets);
    },
    (err) => { console.log(`impossible to load the assets: ${err}`); }
).catch((error) => {
    console.error(error.stack);
});
