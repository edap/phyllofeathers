let Promise = require('es6-promise').Promise;
import {loadTexture} from "./loaders.js";

export function loadAllAssets(){
    let textureFen1 = loadTexture('./textures/fen_rosa_uno.jpg');

    return Promise.all([textureFen1,textureFen1]).then(
        (res) => {
            let fenicottero = {
                prima: res[1],
                seconda: res[2]
            };
            let assets = {
                fenicotter: fenicottero
            };
            return assets;
        },
        (err) => {
            console.error(err);
            return err;
        }
    );
}
