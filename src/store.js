import wrongPhyllo from './json/revolving.json';
import rightPhyllo from './json/flowers.json';

export function getWrongPhylloParamsForBird(birdType){
    return wrongPhyllo.remembered[birdType][0];
}

export function getRightPhylloParamsForBird(birdType){
    return rightPhyllo.remembered[birdType][0];
}
