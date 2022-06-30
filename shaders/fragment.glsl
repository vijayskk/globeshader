uniform sampler2D globeTexture;
varying vec2 vertexUV;
varying vec3 vertexNormal;
uniform vec3 shadecolor;

void main(){
    
    float intensity = 1.05 - dot(
        vertexNormal,
        vec3(0,0,1)
    );

    vec3 atmosphere = shadecolor * pow(intensity , 1.5);


    gl_FragColor = vec4(atmosphere + texture2D(globeTexture , vertexUV).xyz,1.0);

}