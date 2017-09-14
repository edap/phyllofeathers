import {PointLight} from 'three';

export function PointLights(distanceFromCenter = 10) {
    // it positions 3 Point Lights on tree points, equidistant from the center
    let lights = [];
    lights[ 0 ] = new PointLight( 0xffffff, 1, 0 );
    lights[ 1 ] = new PointLight( 0xffffff, 1, 0 );
    lights[ 2 ] = new PointLight( 0xffffff, 1, 0 );

    lights[ 0 ].position.set( 0, distanceFromCenter*2, 0 );
    lights[ 1 ].position.set( distanceFromCenter, distanceFromCenter*2, 100 );
    lights[ 2 ].position.set( - distanceFromCenter, - distanceFromCenter*2, - distanceFromCenter );
    return lights;
}
