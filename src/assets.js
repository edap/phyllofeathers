//Parrots
// https://www.featherbase.info/en/family/44

const Promise = require('es6-promise').Promise;
import { RepeatWrapping } from 'three';
import { loadTexture } from './loaders.js';
const allowedBirds = ['blue-fronted-parrot', 'fischers-lovebird', 'budgeridgar', 'eastern-rosella', 'ring-necked-parakeet'];

export function loadBird(birdName){
	if (!allowedBirds.includes(birdName)){
		console.error(`bird ${birdName} not allowed`);
		return false;
	}
	const promises = [];
	const folder = `./textures/${birdName}/`;
	const picNames = ['first', 'second', 'third', 'fourth', 'fifth'];
	picNames.forEach(name => {
		promises.push(loadTexture(`${folder}${name}.jpg`));
		promises.push(loadTexture(`${folder}${name}_alpha.jpg`));
		promises.push(loadTexture(`${folder}${name}_NRM.jpg`));
		promises.push(loadTexture(`${folder}${name}_SPEC.jpg`));
	});
	promises.push(loadTexture(`./textures/black.jpg`));
	return Promise.all(promises).then(
		tex => {
			for (let i = 0; i < tex.length; i++){
				tex[i].wrapS = RepeatWrapping;
				tex[i].wrapT = RepeatWrapping;
			}
			const bird = {};
			let texIndex = 0;
			picNames.forEach(name => {
				bird[name] = tex[texIndex];
				bird[`${name}_alpha`] = tex[texIndex + 1];
				bird[`${name}_NRM`] = tex[texIndex + 2];
				bird[`${name}_SPEC`] = tex[texIndex + 3];
				texIndex += 4;
			});
			const assets = {
				textures: bird,
				black: tex[20]
			};
			console.log(assets);
			return assets;
		},
		err => {
			console.error(err);
			return err;
		}
	);
}
