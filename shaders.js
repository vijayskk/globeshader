

const _VS = `
varying vec3 v_Normal;
void main(){
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position , 1.0);
  v_Normal = normal;
}
`

const _FS = `
uniform vec3 planecolor;
varying vec3 v_Normal;
void main(){
  gl_FragColor = vec4(v_Normal,1.0);
  // gl_FragColor = vec4(planecolor,1.0);
}
`
const shader = {
    _VS,
    _FS
}
export default shader