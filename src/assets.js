let Promise = require('es6-promise').Promise;
import {loadTexture} from "./loaders.js";

export function loadAllAssets(){
    let textureFen1 = loadTexture('./textures/fen_rosa_uno.jpg');
    let textureFen2 = loadTexture('./textures/fen_rosa_uno.jpg');

    return Promise.all([textureFen1, textureFen2]).then(
        (res) => {
            let fenicottero = [
                res[0],
                res[1]
            ];
            // a seconda dell'uccello ceh vuoi implementare passi le sue textures
            let assets = {
                textures: fenicottero
            };
            return assets;
        },
        (err) => {
            console.error(err);
            return err;
        }
    );
}
