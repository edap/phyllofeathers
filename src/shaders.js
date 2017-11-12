const glsl = require('glslify');

export function getPlaneShader(){
	return glsl`
	precision mediump float;
	uniform vec2 res;//The width and height of our screen
	uniform sampler2D bufferTexture;//Our input texture
	uniform float time;

	float hash(float n) { return fract(sin(n) * 1e4); }
	float fnoise(float x) {
		float i = floor(x);
		float f = fract(x);
		float u = f * f * (3.0 - 2.0 * f);
		return mix(hash(i), hash(i + 1.0), u);
	}

	void main() {
		vec2 st = gl_FragCoord.xy / res;
		vec2 nuv = st;
		float mag_time = time * 0.8;
		float rx =  nuv.x*= (0.99 + (fnoise(mag_time) * 0.02));
		float ry =  nuv.y*= (0.99 + (fnoise(mag_time+0.5) * 0.02));
		vec4 col = texture2D(bufferTexture, vec2(rx,ry));
		col.a*= 0.97;
		gl_FragColor = col;
	}`;
}
