/* eslint-env browser */
//const ParrotType = 'blue-fronted-parrot';
//const ParrotType = 'budgeridgar';
const ParrotType = 'eastern-rosella';
//const ParrotType = 'ring-necked-parakeet';
//const ParrotType = 'fischers-lovebird';
const debug = false;

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
let plane;
let bufferObject;
let finalMaterial;
let quad;
let glsl = require('glslify');
let fragShader = glsl`
		uniform vec2 res;//The width and height of our screen
		uniform sampler2D bufferTexture;//Our input texture
		uniform float time;
		void main() {
			vec2 st = gl_FragCoord.xy / res;
			vec2 uv = st;
			//uv *= 0.998;
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
    // flower = new Flower(gui.params, materials, assets);
    // bufferScene.add(flower.group);

    flower = createFeather();
    bufferScene.add(flower);

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
    flower.rotation.y += .01;
    flower.rotation.x += .01;

    var t = textureA;
    textureA = textureB;
    textureB = t;
    quad.material.map = textureB.texture;
    bufferMaterial.uniforms.bufferTexture.value = textureA.texture;

    renderer.render(bufferScene, camera, textureB, true);
    renderer.render(scene, camera);
    // do not care about the composer
    //composer.render(clock.getDelta());
    stats.end();
}

function buffer_texture_setup(light){
    let small = true;
    //Create buffer scene
    bufferScene = new THREE.Scene();
    //Create 2 buffer textures

    if(small){
        textureA = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter});
        textureB = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter} );
    }else{
        textureA = new THREE.WebGLRenderTarget( 4096,4096, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter});
        textureB = new THREE.WebGLRenderTarget( 4096,4096, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter} );
    }
    //Pass textureA to shader
    bufferMaterial = new THREE.ShaderMaterial( {
        uniforms: {
            bufferTexture: { type: "t", value: textureA.texture },
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


function createFeather() {
  var points = [];
  for ( var i = 0; i < 10; i ++ ) {
      points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 4 ) );
  }
  var geometry = new THREE.LatheGeometry( points,15,1,1.1 );
  
  //Create a Texture Loader object
  var loader = new THREE.TextureLoader();
  loader.setCrossOrigin('Anonymous');
  var texture = loader.load("https://dl.dropboxusercontent.com/s/s7lf6fmxzb5pa06/red.jpg?dl=1");
  var alphaMap = loader.load("https://dl.dropboxusercontent.com/s/bhxnkjvuch4tlur/red_alpha.jpg?dl=1");
  var specMap = loader.load("https://dl.dropboxusercontent.com/s/mzvgaeu7xmtkjb0/red_SPEC.jpg?dl=1");
  var normMap = loader.load("https://dl.dropboxusercontent.com/s/d6qjqd8u8ic5xeg/red_NRM.jpg?dl=1");
  //alphaMap.wrapT = THREE.RepeatWrapping;
  //alphaMap.wrapS = THREE.RepeatWrapping;

  var material = new THREE.MeshPhongMaterial({
    map: texture,
    alphaTest:0.50,
    alphaMap:alphaMap,
    normalMap:normMap,
    specularMap:specMap,
    color: 0xffffff, emissive:0x000000,
    opacity: 1, transparent: true,
    side: THREE.DoubleSide
  });
  material.map.magFilter = THREE.LinearFilter;
  material.map.minFilter = THREE.LinearMipMapLinearFilter;
  material.map.anisotropy = maxAnisotropy;
  var f = new THREE.Mesh(geometry, material);
  f.rotation.z = Math.PI / 4;
  return f;
};
