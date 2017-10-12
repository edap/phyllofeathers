//Parrots
// https://www.featherbase.info/en/family/44

let Promise = require('es6-promise').Promise;
import {RepeatWrapping} from 'three';
import {loadTexture} from "./loaders.js";
const allowedBirds =['blue-fronted-parrot','fischers-lovebird','budgeridgar','eastern-rosella','ring-necked-parakeet'];

export function loadBird(birdName){
    if (!allowedBirds.includes(birdName)){
        console.error(`bird ${birdName} not allowed`);
        return false;
    }
    let promises = [];
    let folder = "./textures/"+birdName+"/";
    let picNames = ['first', 'second', 'third', 'fourth', 'fifth'];
    let bg = "bg";
    picNames.forEach( (name) => {
        promises.push(loadTexture(`${folder}${name}.jpg`));
        promises.push(loadTexture(`${folder}${name}_alpha.jpg`));
        promises.push(loadTexture(`${folder}${name}_NRM.jpg`));
        promises.push(loadTexture(`${folder}${name}_SPEC.jpg`));
    });
    promises.push(loadTexture(`${folder}${bg}.jpg`));
    return Promise.all(promises).then(
        (tex) => {
            for (var i = 0; i< tex.length; i++) {
                tex[i].wrapS = RepeatWrapping;
                tex[i].wrapT = RepeatWrapping;
            };
            let bird = {};
            let texIndex = 0;
            picNames.forEach( (name) => {
                bird[name] = tex[texIndex];
                bird[`${name}_alpha`] = tex[texIndex+1];
                bird[`${name}_NRM`] = tex[texIndex+2];
                bird[`${name}_SPEC`] = tex[texIndex+3];
                texIndex += 4;
            });
            let assets = {
                textures: bird,
                bg: tex[20]
            };
            return assets;
        },
        (err) => {
            console.error(err);
            return err;
        }
    );
}

