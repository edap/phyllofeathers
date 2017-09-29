/* eslint-env browser */
const ParrotType = 'blue-fronted-parrot';
const debug = false;

import * as THREE from 'three';
import Gui from './gui.js';
import Stats from 'stats.js';
import CollectionMaterials from './materials.js';
import {loadAllAssets} from './assets.js';
import Flower from './flower.js';
import {PointLights} from './pointLights.js';
import { EffectComposer, GodRaysPass, KernelSize, RenderPass } from "postprocessing";

const scene = new THREE.Scene();
const OrbitControls = require('three-orbit-controls')(THREE);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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
    //sun
    const sunMaterial = new THREE.PointsMaterial({
        map: assets.sun,
		    size: 100,
		    sizeAttenuation: true,
		    color: 0xffddaa,
		    alphaTest: 0,
		    transparent: true,
		    fog: false
    });

    const sunGeometry = new THREE.BufferGeometry();
    sunGeometry.addAttribute("position", new THREE.BufferAttribute(new Float32Array(3), 3));
    const sun = new THREE.Points(sunGeometry, sunMaterial);
    sun.frustumCulled = false;
    sun.position.set(0, -1, 0);
    scene.add(sun);


    //const pass = new GlitchPass();
    const pass = new GodRaysPass(scene, camera, sun, {
		    resolutionScale: 0.4,
		    kernelSize: KernelSize.VERY_SMALL,
		    intensity: 1.0,
		    density: 0.96,
		    decay: 0.85,
		    weight: 0.4,
		    exposure: 0.6,
		    samples: 60,
		    clampMax: 1.0
    });
    pass.renderToScreen = true;
    composer.addPass(pass);
    //end sun


    document.body.appendChild(renderer.domElement);
    camera.position.z = 60;
    camera.position.y = 95;
    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 40;
    controls.maxDistance = 85;
    scene.background = assets.bg;

    // stats
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom

    //lights
    let ambientLight = new THREE.AmbientLight( 0xFFFFFF );
    scene.add( ambientLight );

    gui = new Gui(regenerate, materials, assets.textures, maxAnisotropy, ParrotType, debug);
    PointLights(200, 0.2).map((light) => {
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
    } else {
        gui.hide();
    };

    render();
}

function render(){
    let time = clock.getElapsedTime();
    stats.begin();
    requestAnimationFrame(render);
    flower.move(time);
    //renderer.render(scene, camera);
    composer.render(clock.getDelta());
    stats.end();
}


let regenerate = () => {
    flower.regenerate(gui.params);
}

loadAllAssets(ParrotType).then(
    (assets) => {
        init(assets);
    },
    (err) => { console.log(`impossible to load the assets: ${err}`); }
);
