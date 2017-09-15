/* eslint-env browser */
import * as THREE from 'three';
import Gui from './gui.js';
import Stats from 'stats.js';
import CollectionMaterials from './materials.js';
import {loadAllAssets} from './assets.js';
import Flower from './flower.js';
import {PointLights} from './pointLights.js';

const debug = true;
const scene = new THREE.Scene();
const OrbitControls = require('three-orbit-controls')(THREE);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
const stats = new Stats();
const materials = new CollectionMaterials();
let gui;
let controls;
let flower;

function init(assets){
    console.log(assets);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //const gl = renderer.getContext();
    //gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
    document.body.appendChild(renderer.domElement);
    camera.position.z = 80;
    controls = new OrbitControls(camera, renderer.domElement);

    // stats
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom

    //lights
    let ambientLight = new THREE.AmbientLight( 0x000000 );
    scene.add( ambientLight );

    gui = new Gui(regenerate, materials, assets.textures);
    gui.addScene(scene, ambientLight, renderer, materials);
    PointLights().map((light) => {
        scene.add( light );
    });


    var axisHelper = new THREE.AxisHelper( 50 );
    //scene.add( axisHelper );

    window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    });

    flower = new Flower(gui.params, materials, assets);
    scene.add(flower.group);

    addStats(debug);
    render();
}


function addStats(debug) {
    if (debug) {
        document.body.appendChild(stats.domElement);
    }
}

function render(){
    stats.begin();
    renderer.render(scene, camera);
    stats.end();
    requestAnimationFrame(render);
}

let regenerate = () => {
    flower.regenerate(gui.params);
}

loadAllAssets().then(
    (assets) => {
        init(assets);
    },
    (err) => { console.log(`impossible to load the assets: ${err}`); }
);
