export default class Strategy{
    constructor(materials){
        this.materials = materials;
    }

    get(i, angle, params, crownGeom, petalGeom, secPetalGeom){
        let mat;
        let geometry;
        switch(params.strategy){
        case "normal":
            mat = this.normalMat(i, angle, params);
            geometry = this.alternateGeometry(i, angle, params, crownGeom, petalGeom, secPetalGeom);
            break;
        case "radius":
            mat = this.radiusMat(i, angle, params);
            geometry = this.normalGeometry(i, angle, params, crownGeom, petalGeom, secPetalGeom);
            break;
        case "angle":
            mat = this.angleMat(i, angle, params);
            geometry = this.normalGeometry(i, angle, params, crownGeom, petalGeom, secPetalGeom);
            break;
        case "contour":
            // last ring ha his own mat and geom. in between 3 mat and radius
            mat = this.contourMat(i, angle, params);
            geometry = this.normalGeometry(i, angle, params, crownGeom, petalGeom, secPetalGeom);
            break;
        default: // normal
            mat = this.normalMat(i, angle, params);
            geometry = this.alternateGeometry(i, angle, params, crownGeom, petalGeom, secPetalGeom);
            break;
        }

        return {mat, geometry};
    }

    normalGeometry(i, angleInRadians, params, crownGeom, petalGeom, secPetalGeom){
        let geometry;
        if (i <= params.petals_from) {
            geometry = crownGeom;
        } else if(i > params.petals_from && i <= (params.sec_petals_from + params.petals_from)) {
            geometry = petalGeom;
        } else {
            geometry = secPetalGeom;
        }
        return geometry;
    }

    alternateGeometry(i, angleInRadians, params, crownGeom, petalGeom, secPetalGeom){
        let geometry;
        if (i <= params.petals_from) {
            geometry = crownGeom;
        } else {
            geometry = (i % 2 == 0) ? petalGeom : secPetalGeom;
        }
        return geometry;
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
        if (i <= params.petals_from) { return this.materials["crown"]; };
        // the petals that are not part of the crown has a material depending on the radius
        let minRadius = params.spread * Math.sqrt(params.petals_from);
        let maxRadius = params.spread * Math.sqrt(params.num);
        let availableSpace = (maxRadius - minRadius);
        let radius = params.spread * Math.sqrt(i);
        let quartOfSpace = availableSpace / 4.0;
        let radiusNotInCrown = radius - minRadius;

        //console.log(radiusNotInCrown);
        //console.log(quartOfSpace * 4);

        switch(radiusNotInCrown){
        case (radius <= quartOfSpace):
            return this.materials["petal_one"];
            break;
        case (radius > quartOfSpace && radius <= quartOfSpace * 2):
            return this.materials["petal_two"];
            break;
        case (radius > quartOfSpace *2 && radius <= quartOfSpace * 3):
            return this.materials["petal_three"];
            break;
        case (radius > quartOfSpace *3 && radius <= quartOfSpace * 4):
            return this.materials["petal_four"];
            break;
        default:
            return this.materials["petal_one"];
            break;
        }
    }

    contourMat(i,angle,params){
        // in case crown or second round of petal, do not use tha angle
        if(i <= params.petals_from) { return this.materials["crown"]; };
        if(i >= (params.petals_from + params.sec_petals_from)) { return this.materials["petal_four"]; };

        let index = (Math.floor(angle*i)%3);
        let key;
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
        default:
            key = 0;
            break;
        }
        return this.materials[key];
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

