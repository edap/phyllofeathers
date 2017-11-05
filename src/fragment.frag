
precision mediump float;

import noise from 'glsl-noise/classic/2d';

uniform vec2 res;//The width and height of our screen
uniform sampler2D bufferTexture;//Our input texture
void main() {
	vec2 st = gl_FragCoord.xy / res;
	vec2 uv = st;
	uv*= 1.018;
	//vec2 noised = snoise(st);
	//gl_FragColor = texture2D(bufferTexture, noised);
	gl_FragColor = texture2D(bufferTexture, uv);
}