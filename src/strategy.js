export default class Strategy{
    constructor(materials){
        this.materials = materials;
    }

    normalMat(i,angle,params){
        let mat;
        if (i <= params.petals_from) {
            mat = this.materials["crown"];
        } else if(i > params.petals_from && i <= (params.sec_petals_from + params.petals_from)) {
            let key = (i % 2 == 0) ? "petal_one" : "petal_two";
            mat = this.materials[key];
        } else {
            let key = (i % 2 == 0) ? "petal_three" : "petal_four";
            mat = this.materials[key];
        }
        return mat;
    }

    radiusMat(i,angle,params){
        let radius = params.spread * Math.sqrt(i);
        let maxRadius = params.spread * Math.sqrt(params.num);
        console.log(radius);
        let mat;
        if (i <= params.petals_from) {
            mat = this.materials["crown"];
        } else if(i > params.petals_from && i <= (params.sec_petals_from + params.petals_from)) {
            let key = (i % 2 == 0) ? "petal_one" : "petal_two";
            mat = this.materials[key];
        } else {
            let key = (i % 2 == 0) ? "petal_three" : "petal_four";
            mat = this.materials[key];
        }
        return mat;
    }

    angleMat(i,angle,params){
        let index = (Math.floor(angle*i)%4);
        console.log(index);
        let key;
        if(i <= params.petals_from) { return this.materials["crown"]; };
        switch(index){
        case 0:
            key = "petal_one";
            break;
        case 1:
            key = "petal_two";
            break;
        case 2:
            key = "petal_three";
            break;
        case 3:
            key = "petal_four";
            break;
        default:
            key = 0;
            break;
        }
        return this.materials[key];
    }
}

