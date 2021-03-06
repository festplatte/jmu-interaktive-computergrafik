attribute vec3 a_position;
attribute vec3 a_normal;

// Pass color as attribute and forward it
// to the fragment shader
// TODO [exercise 8]

uniform mat4 M;
uniform mat4 V;
uniform mat4 N;// normal matrix

varying vec3 v_normal;

// Pass the vertex position in view space
// to the fragment shader
// TODO [exercise 9]

void main(){
  gl_Position=V*M*vec4(a_position,1.);
  
  // Pass the color and transformed vertex position through
  // TODO [exercise 8/9]
  
  v_normal=(N*vec4(a_normal,0)).xyz;
}
