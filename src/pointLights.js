import { PointLight } from 'three';

export function PointLights(distanceFromCenter = 10, intensity = 1){
	// it positions 3 Point Lights on tree points, equidistant from the center
	const lights = [];
	lights[0] = new PointLight(0xffffff, intensity, 0);
	lights[1] = new PointLight(0xffffff, intensity, 0);
	lights[2] = new PointLight(0xffffff, intensity, 0);

	lights[0].position.set(0, 0, distanceFromCenter * 6);
	lights[1].position.set(distanceFromCenter, distanceFromCenter, -distanceFromCenter);
	lights[2].position.set(distanceFromCenter, distanceFromCenter, distanceFromCenter);
	return lights;
}
