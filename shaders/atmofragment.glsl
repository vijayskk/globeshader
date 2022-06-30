varying vec3 vertexNormal;

uniform vec4 atmocolor;

void main(){
    float intensity = pow(0.7 - dot(vertexNormal , vec3(0,0,1)),2.0);

    gl_FragColor = atmocolor * intensity;

}