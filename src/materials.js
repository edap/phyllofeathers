import {MeshStandardMaterial,MeshBasicMaterial,MeshPhongMaterial,MeshLambertMaterial } from 'three';

export default class CollectionMaterials {
    constructor(){
        let materials = {
            "crown": new MeshStandardMaterial( {color: 0x00ff4a, emissive:0xca3131} ),
            "petal_one": new MeshPhongMaterial( {color: 0x55bbaa, emissive:0x77ff22} ),
            "petal_two": new MeshStandardMaterial( {color: 0xFF9922, emissive:0x88bb00} ),
            "standard": new MeshStandardMaterial( {color: 0xFF9922, emissive:0x88bb00} ),
            "petal_three": new MeshStandardMaterial( {color: 0x22FF55, emissive:0x000000} ),
            "petal_four": new MeshStandardMaterial( {color: 0x0a0aFF, emissive:0xFF0000} )
        };
        return materials;
    }
}
