import { MeshPhongMaterial } from 'three';

export default class CollectionMaterials {
	constructor(){
		const materials = {
			crown: new MeshPhongMaterial({
				color: 0x00ff4a,
				emissive: 0xca3131,
				opacity: 1,
				transparent: true
			}),
			petal_one: new MeshPhongMaterial({
				color: 0x55bbaa,
				emissive: 0x77ff22,
				opacity: 1,
				transparent: true
			}),
			petal_two: new MeshPhongMaterial({
				color: 0xff9922,
				emissive: 0x88bb00,
				opacity: 1,
				transparent: true
			}),
			petal_three: new MeshPhongMaterial({
				color: 0x22ff55,
				emissive: 0x000000,
				opacity: 1,
				transparent: true
			}),
			petal_four: new MeshPhongMaterial({
				color: 0x0a0aff,
				emissive: 0xff0000,
				opacity: 1,
				transparent: true
			})
		};
		return materials;
	}
}
