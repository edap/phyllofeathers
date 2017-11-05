import {DoubleSide, Mesh,LatheBufferGeometry, Vector2} from 'three';
import {phyllotaxisWrong, phyllotaxisConical} from './phyllotaxis.js';

export function positionPetal(object, iter, angleInRadians, params, suffix, wrongPhyllo = true){
    object.material.side = DoubleSide;
    //calculate needed variable
    let PItoDeg = Math.PI/180.0;
    // the scale ratio is a value that increase as the flower grows. Petals are smaller near the crown
    // and while they grows the petals rotate from the crown to the outside
    let ratio = Math.abs(iter/params.petals_from);
    // this is to avaoid a scaleRatio of 0, that would cause a warning while scaling for 0
    let scaleRatio = ratio === 0 ? 0.001 : ratio;

    // Rotations:
    object.rotateZ( iter* angleInRadians);
    let yrot = (iter/params.angle_open) * params.petals_from;
    let y_angle = params.angle_open * scaleRatio;
    if (!wrongPhyllo) {
        object.rotateX( (params.starting_angle_open + y_angle + iter * 90/params.num ) * PItoDeg );
    } else {
        object.rotateX(Math.PI/2);
    }

    // Scale:
    // do not scale petals in the crown depending on the iteration number
    let scaleMag;
    if (suffix != "crown") {
        scaleMag = params[`${suffix}_scale`] * scaleRatio;
    } else {
        scaleMag = params[`${suffix}_scale`] * 1.0;
    }

    if (!wrongPhyllo) {
        object.scale.set(scaleMag, scaleMag, scaleMag);
        object.rotateY((Math.PI/2));
    } else {
        object.rotateX((Math.PI/2));
    }
}

export function positionPetalsPhyllotaxis(i, params, object, angleInRadians) {
    let coord;
    if (i <= params.petals_from) {
        coord = phyllotaxisConical(i, angleInRadians, params.crown_spread, params.crown_growth);
        object.position.set(coord.x, coord.y, coord.z + params.crown_z);
        positionPetal(object, i, angleInRadians, params, "crown", false);
    } else if(i > params.petals_from && i <= (params.sec_petals_from + params.petals_from)) {
        coord = phyllotaxisConical(i, angleInRadians, params.spread, params.growth);
        object.position.set(coord.x, coord.y, coord.z);
        positionPetal(object, i, angleInRadians, params, "petals", false);
    } else {
        coord = phyllotaxisConical(i, angleInRadians, params.spread, params.growth);
        object.position.set(coord.x, coord.y, coord.z);
        positionPetal(object, i, angleInRadians, params, "sec_petals", false);
    }
}

export function positionPetalsWrongPhyllotaxis(i, params, object, angleInRadians) {
    let coord = phyllotaxisWrong(i, angleInRadians, params.spread, params.growth);
    object.position.set(coord.x, coord.y, coord.z);
    if (i <= params.petals_from) {
        positionPetal(object, i, angleInRadians, params, "crown", true);
    }
    else if(i > params.petals_from && i <= (params.sec_petals_from + params.petals_from)) {
        positionPetal(object, i, angleInRadians, params, "petals", true);
    }
    else {
        positionPetal(object, i, angleInRadians, params, "sec_petals", true);
    }
}

// petals can belong to the crown, be the petals shortly after or be the last petals
export function createPetalMesh(opt) {
    const {params, crownGeom, geometry, material } = opt;
    let object = new Mesh(geometry, material);
    geometry.dispose();
    material.dispose();
    object["strategy"] = params.strategy;
    return object;
}

export function makePetalGeom(params, suffix){
    let points = [];
    let phistart = params[`${suffix}_phistart`];
    let philength = params[`${suffix}_philength`];
    let amp = params[`${suffix}_amplitude`];
    let freq = params[`${suffix}_freq`];
    let xOffset = params[`${suffix}_xoffset`];
    let yOffset = params[`${suffix}_yoffset`];
    let segment = params[`${suffix}_segment`];
    let segment_length = params[`${suffix}_segment_length`];
    let length = params[`${suffix}_length`];
    for ( var i = 0; i < length; i ++ ) {
	      points.push( new Vector2( Math.cos( i * freq ) * amp + xOffset, ( i - yOffset ) * segment_length ) );
    }
    let geometry = new LatheBufferGeometry( points, segment ,phistart, philength);
    return geometry;
}
export function disposeTextures(material){
    if(material.map !== null){
        material.map.dispose();
    }

    if(material.alphaMap !== null){
        material.alphaMap.dispose();
    }

    if(material.normalMap !== null){
        material.normalMap.dispose();
    }

    if(material.specularMap !== null){
        material.specularMap.dispose();
    }
}


