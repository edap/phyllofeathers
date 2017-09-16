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
    let folder = "./textures/blue-frontend-parrot/";
    let greenstraight = loadTexture(folder+"greenstraight.jpg");
    let greenstraightA = loadTexture(folder+"greenstraight_alpha.jpg");
    let red = loadTexture(folder+"red.jpg");
    let redA = loadTexture(folder+"red_alpha.jpg");
    let azul = loadTexture(folder+"azul.jpg");
    let azulA = loadTexture(folder+"azul_alpha.jpg");

    return Promise.all([greenstraight, greenstraightA, red, redA, azul, azulA]).then(
        (tex) => {
            for (var i = 0; i< tex.length; i++) {
                tex[i].wrapS = RepeatWrapping;
                tex[i].wrapT = RepeatWrapping;
            };
            let bird ={
                none: null,
                green: tex[0],
                green_alpha: tex[1],
                red: tex[2],
                red_alpha: tex[3],
                azul: tex[4],
                azul_alpha: tex[5]
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

