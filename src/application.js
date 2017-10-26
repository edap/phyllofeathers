/* eslint-env browser */
const ParrotType = 'blue-fronted-parrot';
//const ParrotType = 'budgeridgar';
//const ParrotType = 'eastern-rosella';
//const ParrotType = 'ring-necked-parakeet';
//const ParrotType = 'fischers-lovebird';
const debug = false;
const wrongPhyllo = false; // in debuge mode, this switch tells to the gui which params to use.
// in Non debug mode, the flower should be init with the right params

import flowers from './json/flowers.json';

import Animator from './animator.js';
import * as THREE from 'three';
import Gui from './gui.js';
import Stats from 'stats.js';
import CollectionMaterials from './materials.js';
import {loadBird} from './assets.js';
import Flower from './flower.js';
import {PointLights} from './pointLights.js';
import {removeEntityByName, limitControls} from './utils.js';
const scene = new THREE.Scene();
const OrbitControls = require('three-orbit-controls')(THREE);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({antialias:true, transparent:true});
const targetSize = 4096;
const animator = new Animator();

renderer.setSize(window.innerWidth, window.innerHeight);
const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

//BufferScene
let trailsOn = true;
let bufferScene;
let textureA;
let textureB;
let bufferMaterial;
let plane;
let bufferObject;
let finalMaterial;
let slideDirection = new THREE.Vector2(1.0, 1.0);
let quad;
let glsl = require('glslify');
let fragShader = glsl`
		uniform vec2 res;//The width and height of our screen
		uniform vec2 slideDirection;// in which direction the texture will slide
		uniform sampler2D bufferTexture;//Our input texture
		void main() {
			vec2 st = gl_FragCoord.xy / res;
			vec2 uv = st;
			uv *= slideDirection;
			gl_FragColor = texture2D(bufferTexture, uv);
}
`;
const clock = new THREE.Clock();
const stats = new Stats();
const materials = new CollectionMaterials();
let gui;
let controls;
let flower;

function init(assets){
    document.body.appendChild(renderer.domElement);
    camera.position.z = 500;
    camera.position.y = 105;
    //scene.background = assets.bg;
    // stats
    //stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    gui = new Gui(regenerate, materials, assets.textures, maxAnisotropy, ParrotType, debug, wrongPhyllo);

    window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    });

    buffer_texture_setup();
    // ambient lights. TODO, use them or not?
    //let ambientLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    //let ambientLight2 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    //scene.add( ambientLight2 );
    //bufferScene.add(ambientLight);

    PointLights(600, 1.0).map((light) => {
        scene.add( light );
    });
    PointLights(600, 1.0).map((light) => {
        bufferScene.add( light );
    });
    flower = new Flower(gui.params, materials, assets, ParrotType);

    flower.group.name = 'flower';
    flower.group.rotateY(Math.PI/2);
    bufferScene.add(flower.group);

    //debug
    if (debug) {
        document.body.appendChild(stats.domElement);
        var axisHelper = new THREE.AxisHelper( 50 );
        scene.add( axisHelper );
    }else{
        gui.hide();
    }
    var axisHelper = new THREE.AxisHelper( 50 );
    scene.add( axisHelper );


    controls = new OrbitControls(camera, renderer.domElement);
    limitControls(controls);

    document.body.addEventListener("keypress", maybeSpacebarPressed);
    animator.init(flower, quad, slideDirection);
    render();
}

function render(){
    let time = clock.getElapsedTime();
    stats.begin();
    requestAnimationFrame(render);
    animator.update();

    if (trailsOn) {
        var t = textureA;
        textureA = textureB;
        textureB = t;
        quad.material.map = textureB.texture;
        //quad.rotateY(0.005);
        bufferMaterial.uniforms.bufferTexture.value = textureA.texture;
        bufferMaterial.uniforms.slideDirection.value = slideDirection;
        // draw to texture B
        renderer.render(bufferScene, camera, textureB, true);
    }
    renderer.render(scene, camera);
    stats.end();
}

function maybeSpacebarPressed(e){
    if (e.keyCode === 0 || e.keyCode === 32) {
        e.preventDefault();
        toggleTrails();
    }
}

function toggleTrails(){
    if (trailsOn === true) {
        removeEntityByName('flower', bufferScene);
        //removeEntityByName('quad', scene);
        scene.add(flower.group);
        trailsOn = false;
    } else {
        removeEntityByName('flower', scene);
        bufferScene.add(flower.group);
        //scene.add(quad);
        trailsOn = true;
    }
}

function buffer_texture_setup(){
    //Create buffer scene
    bufferScene = new THREE.Scene();
    //Create 2 buffer textures
    textureA = new THREE.WebGLRenderTarget( targetSize, targetSize, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter});
    textureB = new THREE.WebGLRenderTarget(targetSize, targetSize, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter} );
    //Pass textureA to shader
    slideDirection = new THREE.Vector2(1.0,1.0);
    bufferMaterial = new THREE.ShaderMaterial( {
        uniforms: {
            bufferTexture: { type: "t", value: textureA.texture },
            slideDirection: {type: 'v2', value: slideDirection},
            res : {type: 'v2',value:new THREE.Vector2(targetSize, targetSize)}//Keeps the resolution
        },
        fragmentShader: fragShader
    } );
    var plane = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight );
    bufferObject = new THREE.Mesh( plane, bufferMaterial );
    bufferScene.add(bufferObject);

    //Draw textureB to screen
    //finalMaterial =  new THREE.MeshBasicMaterial({map: textureB.texture, color:0XFF0000});
    finalMaterial =  new THREE.MeshBasicMaterial({map: textureB.texture, transparent:true});
    finalMaterial.side = THREE.DoubleSide; //just in case you are rotating the plane
    quad = new THREE.Mesh( plane, finalMaterial );
    quad.name = 'quad';
    //quad.rotateY(Math.PI/2);
    //scene.add(quad);
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

loadBird(ParrotType).then(
    (assets) => {
        removeSpinner();
        init(assets);
    },
    (err) => { console.log(`impossible to load the assets: ${err}`); }
).catch((error) => {
    console.error(error.stack);
});
