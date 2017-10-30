import * as THREE from 'three';
import { phyllotaxisWrong, phyllotaxisConical } from './phyllotaxis.js';
import Strategy from './strategy.js';
import { addTexturesToMaterial } from './materialHelper.js';
import { getWrongPhylloParamsForBird, getRightPhylloParamsForBird } from './store.js';
import {
	positionPetalsWrongPhyllotaxis,
	positionPetalsPhyllotaxis,
	createPetalMesh,
	makePetalGeom,
	disposeTextures
} from './flowerModeller.js';

const isPhyllotaxisWrong = params => !params.hasOwnProperty('crown_z');

export default class Flower {
	constructor(params, materials, assets, birdType, maxAnisotropy){
		this.originalRotation = new THREE.Object3D();
		this.assets = assets;
		this.materials = materials;
		this.birdType = birdType;
		this.maxAnisotropy = maxAnisotropy;
		this.objects = [];
		this.group = new THREE.Group();
		this.strategy = new Strategy(materials);
		this._params = params;
		this._phyllotaxisWrong = isPhyllotaxisWrong(params);

		this.generate(params);
	}

	setParams(params){
		this._params = params;
		this._phyllotaxisWrong = isPhyllotaxisWrong(params);
	}

	switchTo(type){
		let params;
		if (type === 'wrong'){
			params = getWrongPhylloParamsForBird(this.birdType);
		} else {
			params = getRightPhylloParamsForBird(this.birdType);
		}
		this.setParams(params);
		this.reset();
		// in the two diffents configuration, each material can have a different texture
		// that's why you have to recreate them
		addTexturesToMaterial(this.materials, params, this.assets.textures, this.maxAnisotropy);
		this.generate(params);
	}

	regenerate(params, debug = false){
		this.generate(params, debug);
	}

	makePetalsVisible(opacity){
		for (let i = this.group.children.length - 1; i >= 0; i--){
			this.group.children[i].material.opacity = opacity;
		}
	}

	generate(params, debug = false){
		const wrongPhyllo = this._phyllotaxisWrong;
		const tot_petals = params.num;
		const PItoDeg = Math.PI / 180.0;
		const angleInRadians = params.angle * PItoDeg;

		const widthSegments = 32;
		const crownGeom = makePetalGeom(params, 'crown');
		const petalGeom = makePetalGeom(params, 'petals');
		const secPetalGeom = makePetalGeom(params, 'sec_petals');
		for (let i = 0; i < tot_petals; i++){
			const angle = params.angle;
			const strategy = this.strategy.get(i, angle, params, crownGeom, petalGeom, secPetalGeom);
			const opt = {
				params,
				geometry: strategy.geometry,
				material: strategy.mat
			};
			const object = createPetalMesh(opt);
			if (wrongPhyllo){
				positionPetalsWrongPhyllotaxis(i, params, object, angleInRadians);
			} else {
				positionPetalsPhyllotaxis(i, params, object, angleInRadians);
			}
			object.castShadow = true;
			object.receiveShadow = true;
			if (!debug){
				object.material.opacity = 0.0; // all the petals are invisible at the beginning
			}
			this.objects.push(object);
			this.group.add(this.objects[i]);
		}
		// this rotation make sense only in the animation,
		// where the 2 phyllotaxis types alternate themselves
		if (!wrongPhyllo){
			this.group.rotateY(Math.PI / 2);
		} else {
			this.group.rotateY(-Math.PI / 2);
		}
	}

	reset(){
		for (let i = this.group.children.length - 1; i >= 0; i--){
			disposeTextures(this.group.children[i].material);
			this.group.children[i].geometry.dispose();
			this.group.children[i].material.dispose();
			this.group.remove(this.group.children[i]);
		}
		this._resetRotations(this.group);

		this.objects = [];
	}

	_resetRotations(objectToReset){
		const startRotation = new THREE.Euler().copy(this.originalRotation.rotation);
		objectToReset.rotation.copy(startRotation);
	}
}
