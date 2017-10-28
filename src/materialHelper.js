import {Color, RepeatWrapping, LinearFilter, LinearMipMapLinearFilter} from 'three';

export function addTexturesToMaterial(materials, preset, textures, maxAnis){
    for (var mat in materials) {
        let par = getMatParameter(preset, mat);
        materials[mat].color = new Color().setHex( par.color );
        materials[mat].emissive = new Color().setHex( par.emissive );
        materials[mat].shininess = par.shininess;
        materials[mat].alphaTest = par.alphaTest;
        setTexture(par.map, materials[mat], "map", textures, maxAnis);
    }
}


export function setTexture(key, material, materialKey, textures, maxAnis){
    material[materialKey] = textures[key];
    if( key!= "none") {
        material[materialKey].magFilter = LinearFilter;
        material[materialKey].minFilter = LinearMipMapLinearFilter;
        material[materialKey].anisotropy = maxAnis;
        //material.alphaTest = 0.50;
        material.alphaMap = textures[key+'_alpha'];
        material.normalMap = textures[key+'_NRM'];
        material.specularMap = textures[key+'_SPEC'];
        material.alphaMap.wrapT = RepeatWrapping;
        material.alphaMap.wrapS = RepeatWrapping;
        //material.alphaMap.repeat.y = 1;
    } else {
        material.alphaMap = null;
    }
    material.needsUpdate = true;
}

export function getMatParameter(json, mat_string){
    let emissive = json[`${mat_string}_mat_emissive`];
    let color = json[`${mat_string}_mat_color`];
    return {
        emissive: (typeof emissive === "string") ? emissive.replace('#', '0x') : emissive,
        color: (typeof color === "string") ? color.replace('#', '0x') : color,
        shininess:json[`${mat_string}_mat_shininess`],
        alphaTest:json[`${mat_string}_mat_alpha`],
        map:json[`${mat_string}_mat_map`]
    };
}



