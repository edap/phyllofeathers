let glsl = require('glslify');

export function getPlaneShader(){
    return glsl`
		uniform vec2 res;//The width and height of our screen
		uniform vec2 slideDirection;// in which direction the texture will slide
		uniform sampler2D bufferTexture;//Our input texture
		void main() {
			vec2 st = gl_FragCoord.xy / res;
			vec2 uv = st;
			uv *= slideDirection;
			gl_FragColor = texture2D(bufferTexture, uv);
    }`;
}
