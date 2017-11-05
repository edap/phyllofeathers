import { addTexturesToMaterial } from './materialHelper.js';
import Flower from './flower.js';
import CollectionMaterials from './materials.js';
import { getWrongPhylloParamsForBird, getRightPhylloParamsForBird } from './store.js';

export function createFlowerAndRevolver(ParrotType, assets, maxAnisotropy){
	//flower
	const flowerMaterials = new CollectionMaterials();
	const flowerParam = getRightPhylloParamsForBird(ParrotType);
	addTexturesToMaterial(flowerMaterials, flowerParam, assets.textures, maxAnisotropy);
	const flower = new Flower(flowerParam, flowerMaterials, assets, ParrotType, maxAnisotropy);

	//revolver
	const revolverMaterials = new CollectionMaterials();
	const revParam = getWrongPhylloParamsForBird(ParrotType);
	addTexturesToMaterial(revolverMaterials, revParam, assets.textures, maxAnisotropy);
	const revolver = new Flower(revParam, revolverMaterials, assets, ParrotType, maxAnisotropy);

	return { flower, revolver };
}
