//Parrots
// https://www.featherbase.info/en/family/44

let Promise = require('es6-promise').Promise;
import {RepeatWrapping} from 'three';
import {loadTexture} from "./loaders.js";

export function loadAllAssets(bird){
    switch(bird){
    case 'blue-fronted-parrot':
        return loadBlueFrontendParrot();
        break;
    case 'fischers-lovebird':
        return loadFischersLovebird();
        break;
    case 'budgeridgar':
        return loadBird('budgeridgar');
        break;
    case 'eastern-rosella':
        return loadBird('eastern-rosella');
        break;
    case 'ring-necked-parakeet':
        return loadBird('ring-necked-parakeet');
        break;
    default:
        return loadBlueFrontendParrot();
        break;
    }
}

function loadBird(birdName){
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

function loadFischersLovebird(){
    let folder = "./textures/fischers-lovebird/";
    let greenstraight = loadTexture(folder+"green.jpg");
    let greenstraightA = loadTexture(folder+"green_alpha.jpg");
    let greenstraightN = loadTexture(folder+"green_NRM.jpg");
    let greenstraightS = loadTexture(folder+"green_SPEC.jpg");
    let red = loadTexture(folder+"red2.jpg");
    let redA = loadTexture(folder+"red2_alpha.jpg");
    let redN = loadTexture(folder+"red2_NRM.jpg");
    let redS = loadTexture(folder+"red2_SPEC.jpg");
    let yellow = loadTexture(folder+"yellow.jpg");
    let yellowA = loadTexture(folder+"yellow_alpha.jpg");
    let yellowN = loadTexture(folder+"yellow_NRM.jpg");
    let yellowS = loadTexture(folder+"yellow_SPEC.jpg");
    let azul = loadTexture(folder+"blue.jpg");
    let azulA = loadTexture(folder+"blue_alpha.jpg");
    let azulN = loadTexture(folder+"blue_NRM.jpg");
    let azulS = loadTexture(folder+"blue_SPEC.jpg");
    let redlight = loadTexture(folder+"red.jpg");
    let redlightA = loadTexture(folder+"red_alpha.jpg");
    let redlightN = loadTexture(folder+"red_NRM.jpg");
    let redlightS = loadTexture(folder+"red_SPEC.jpg");
    let bg = loadTexture(folder+"habitat_forest.jpg");

    return Promise.all([greenstraight, greenstraightA, greenstraightN, greenstraightS,
                        red, redA, redN, redS,
                        azul, azulA, azulN, azulS,
                        redlight, redlightA, redlightN, redlightS,
                        yellow, yellowA, yellowN, yellowS,
                        bg
                       ]).then(
        (tex) => {
            for (var i = 0; i< tex.length; i++) {
                tex[i].wrapS = RepeatWrapping;
                tex[i].wrapT = RepeatWrapping;
            };
            let bird ={
                none: null,
                greenblack: tex[0],
                greenblack_alpha: tex[1],
                greenblack_nrm: tex[2],
                greenblack_spec: tex[3],
                red: tex[4],
                red_alpha: tex[5],
                red_nrm: tex[6],
                red_spec: tex[7],
                grayblue: tex[8],
                grayblue_alpha: tex[9],
                grayblue_nrm: tex[10],
                grayblue_spec: tex[11],
                redlight: tex[12],
                redlight_alpha: tex[13],
                redlight_nrm: tex[14],
                redlight_spec: tex[15],
                yellow: tex[16],
                yellow_alpha: tex[17],
                yellow_nrm: tex[18],
                yellow_spec: tex[19]
            };
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

function loadBlueFrontendParrot(){
    let folder = "./textures/blue-fronted-parrot/";
    let greenstraight = loadTexture(folder+"green_black.jpg");
    let greenstraightA = loadTexture(folder+"green_black_alpha.jpg");
    let greenstraightN = loadTexture(folder+"green_black_NRM.jpg");
    let greenstraightS = loadTexture(folder+"green_black_SPEC.jpg");
    let red = loadTexture(folder+"red.jpg");
    let redA = loadTexture(folder+"red_alpha.jpg");
    let redN = loadTexture(folder+"red_NRM.jpg");
    let redS = loadTexture(folder+"red_SPEC.jpg");
    let yellow = loadTexture(folder+"yellow.jpg");
    let yellowA = loadTexture(folder+"yellow_alpha.jpg");
    let yellowN = loadTexture(folder+"yellow_NRM.jpg");
    let yellowS = loadTexture(folder+"yellow_SPEC.jpg");
    let azul = loadTexture(folder+"blue_soft.jpg");
    let azulA = loadTexture(folder+"blue_soft_alpha.jpg");
    let azulN = loadTexture(folder+"blue_soft_NRM.jpg");
    let azulS = loadTexture(folder+"blue_soft_SPEC.jpg");
    // let azul = loadTexture(folder+"gray_blue.jpg");
    // let azulA = loadTexture(folder+"gray_blue_alpha.jpg");
    // let azulN = loadTexture(folder+"gray_blue_NRM.jpg");
    // let azulS = loadTexture(folder+"gray_blue_SPEC.jpg");
    let greenlight = loadTexture(folder+"green_light.jpg");
    let greenlightA = loadTexture(folder+"green_light_alpha.jpg");
    let greenlightN = loadTexture(folder+"green_light_NRM.jpg");
    let greenlightS = loadTexture(folder+"green_light_SPEC.jpg");
    let bg = loadTexture(folder+"habitat_forest.jpg");

    return Promise.all([greenstraight, greenstraightA, greenstraightN, greenstraightS,
                        red, redA, redN, redS,
                        azul, azulA, azulN, azulS,
                        greenlight, greenlightA, greenlightN, greenlightS,
                        yellow, yellowA, yellowN, yellowS,
                        bg
                       ]).then(
        (tex) => {
            for (var i = 0; i< tex.length; i++) {
                tex[i].wrapS = RepeatWrapping;
                tex[i].wrapT = RepeatWrapping;
            };
            let bird ={
                none: null,
                greenblack: tex[0],
                greenblack_alpha: tex[1],
                greenblack_nrm: tex[2],
                greenblack_spec: tex[3],
                red: tex[4],
                red_alpha: tex[5],
                red_nrm: tex[6],
                red_spec: tex[7],
                grayblue: tex[8],
                grayblue_alpha: tex[9],
                grayblue_nrm: tex[10],
                grayblue_spec: tex[11],
                greenlight: tex[12],
                greenlight_alpha: tex[13],
                greenlight_nrm: tex[14],
                greenlight_spec: tex[15],
                yellow: tex[16],
                yellow_alpha: tex[17],
                yellow_nrm: tex[18],
                yellow_spec: tex[19]
            };
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

