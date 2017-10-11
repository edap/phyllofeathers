/* eslint-env browser */
const ParrotType = 'blue-fronted-parrot';
//const ParrotType = 'budgeridgar';
//const ParrotType = 'eastern-rosella';
//const ParrotType = 'ring-necked-parakeet';

//const ParrotType = 'fischers-lovebird';
const debug = true;

import * as THREE from 'three';
import Gui from './gui.js';
import Stats from 'stats.js';
import CollectionMaterials from './materials.js';
import {loadAllAssets} from './assets.js';
import Flower from './flower.js';
import {PointLights} from './pointLights.js';
import { EffectComposer, KernelSize, RenderPass, BloomPass} from "postprocessing";

const scene = new THREE.Scene();
const OrbitControls = require('three-orbit-controls')(THREE);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({antialias:true, transparent:true});

renderer.setSize(window.innerWidth, window.innerHeight);
const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
const clock = new THREE.Clock();

const stats = new Stats();
const materials = new CollectionMaterials();
let gui;
let controls;
let flower;

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene,camera));

function init(assets){
    const pass = new BloomPass({
			  resolutionScale: 0.3,
			  intensity: 2.0,
              kernelSize: KernelSize.LARGE,
			  distinction: 3.0
    });
    pass.renderToScreen = true;
    composer.addPass(pass);
    //end bloom

    document.body.appendChild(renderer.domElement);
    camera.position.z = 60;
    camera.position.y = 25;
    scene.background = assets.bg;

    // stats
    //stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom

    //lights
    let ambientLight = new THREE.AmbientLight( 0xFFFFFF );
    scene.add( ambientLight );

    gui = new Gui(regenerate, materials, assets.textures, maxAnisotropy, ParrotType, debug);
    PointLights(200, 0.4).map((light) => {
        scene.add( light );
    });


    window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    });

    flower = new Flower(gui.params, materials, assets);
    scene.add(flower.group);

    //debug
    if (debug) {
        document.body.appendChild(stats.domElement);
        flower.debug(scene);
        var axisHelper = new THREE.AxisHelper( 50 );
        scene.add( axisHelper );
    }

    if(!debug) { gui.hide(); };

    controls = new OrbitControls(camera, renderer.domElement);
    if(!debug){
        //controls.minPolarAngle = Math.PI/6.5; // radians
        //controls.maxPolarAngle = Math.PI/1.1; // radians
        //controls.minDistance = 50;
        //controls.maxDistance = 90;
    }
    render();
}

function render(){
    let time = clock.getElapsedTime();
    stats.begin();
    requestAnimationFrame(render);
    //flower.move(time);
    //flower.rotate(time);
    //renderer.render(scene, camera);
    composer.render(clock.getDelta());
    stats.end();
}

let regenerate = () => {
    flower.regenerate(gui.params);
}

function removeSpinner(){
    let elem = document.getElementsByClassName("loading")[0];
    if (elem) {
        elem.parentNode.removeChild(elem);
    };
}

loadAllAssets(ParrotType).then(
    (assets) => {
        removeSpinner();
        init(assets);
    },
    (err) => { console.log(`impossible to load the assets: ${err}`); }
);
