//Parrots
// https://www.featherbase.info/en/family/44

let Promise = require('es6-promise').Promise;
import {RepeatWrapping} from 'three';
import {loadTexture} from "./loaders.js";

export function loadAllAssets(bird){
    switch(bird){
        case 'blue-frontend-parrot':
            return loadBlueFrontendParrot();
            break;
        default:
            return loadBlueFrontendParrot();
            break;
    }
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
    let azul = loadTexture(folder+"gray_blue.jpg");
    let azulA = loadTexture(folder+"gray_blue_alpha.jpg");
    let azulN = loadTexture(folder+"gray_blue_NRM.jpg");
    let azulS = loadTexture(folder+"gray_blue_SPEC.jpg");
    let greenlight = loadTexture(folder+"green_light.jpg");
    let greenlightA = loadTexture(folder+"green_light_alpha.jpg");
    let greenlightN = loadTexture(folder+"green_light_NRM.jpg");
    let greenlightS = loadTexture(folder+"green_light_SPEC.jpg");

    return Promise.all([greenstraight, greenstraightA, greenstraightN, greenstraightS,
                        red, redA, redN, redS,
                        azul, azulA, azulN, azulS,
                        greenlight, greenlightA, greenlightN, greenlightS,
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
                greenlight_spec: tex[15]
            };
            let assets = {
                textures: bird
            };
            return assets;
        },
        (err) => {
            console.error(err);
            return err;
        }
    );
}

