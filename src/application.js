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
const scene = new THREE.Scene();
const OrbitControls = require('three-orbit-controls')(THREE);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({antialias:true, transparent:true});

renderer.setSize(window.innerWidth, window.innerHeight);
const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

//BufferScene
let bufferScene;
let textureA;
let textureB;
let bufferMaterial;
let bufferObject;
let finalMaterial;
let quad;
let glsl = require('glslify');
let fragShader = glsl`
		uniform vec2 res;//The width and height of our screen
		uniform sampler2D bufferTexture;//Our input texture
    uniform sampler2D oldTexture;
		uniform float time;
		void main() {
			vec2 st = gl_FragCoord.xy / res;
			vec2 uv = st;
			uv *= 0.998;
			vec4 sum = texture2D(bufferTexture, uv);
			gl_FragColor = sum;
}
`;
// //
const clock = new THREE.Clock();

const stats = new Stats();
const materials = new CollectionMaterials();
let gui;
let controls;
let flower;


function init(assets){
    document.body.appendChild(renderer.domElement);
    camera.position.z = 60;
    camera.position.y = 25;
    //scene.background = assets.bg;

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

    buffer_texture_setup(ambientLight);
    flower = new Flower(gui.params, materials, assets);
    bufferScene.add(flower.group);
    //scene.add(flower.group);

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

    // draw to texture B
    //flower.move(time);
    //flower.rotate(time);
    var t = textureA;
    textureA = textureB;
    textureB = t;
    quad.material.map = textureB.texture;
    bufferMaterial.uniforms.bufferTexture.value = textureA.texture;
    bufferMaterial.uniforms.oldTexture.value = textureB.texture;

    renderer.render(bufferScene, camera, textureB, true);
    renderer.render(scene, camera);
    // do not care about the composer
    //composer.render(clock.getDelta());
    stats.end();
}

function buffer_texture_setup(light){
    //Create buffer scene
    bufferScene = new THREE.Scene();
    //Create 2 buffer textures
    textureA = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter});
    textureB = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter} );
    //Pass textureA to shader
    bufferMaterial = new THREE.ShaderMaterial( {
        uniforms: {
            bufferTexture: { type: "t", value: textureA.texture },
            oldTexture: {type: "t", value: textureB.texture },
            res : {type: 'v2',value:new THREE.Vector2(window.innerWidth,window.innerHeight)}//Keeps the resolution
        },
        fragmentShader: fragShader
    } );
    var plane = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight );
    bufferObject = new THREE.Mesh( plane, bufferMaterial );
    bufferScene.add(light);
    bufferScene.add(bufferObject);

    //Draw textureB to screen
    finalMaterial =  new THREE.MeshBasicMaterial({map: textureB.texture});
    quad = new THREE.Mesh( plane, finalMaterial );
    scene.add(quad);
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
