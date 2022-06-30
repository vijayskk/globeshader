import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmovertexShader from './shaders/atmovertex.glsl'
import atmofragmentShader from './shaders/atmofragment.glsl'
import gsap from 'gsap'

const hours = new Date().getHours()
const isDayTime = hours > 6 && hours < 20
 


const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75 , window.innerWidth/window.innerHeight , 0.001 , 1000)

const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg'),
  antialias:true
})


renderer.setPixelRatio(window.devicePixelRatio)

renderer.setSize(window.innerWidth,window.innerHeight)

camera.position.set(0,0,18)
camera.lookAt(0,0,0)

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5,50,50),
  new THREE.ShaderMaterial({
    // map:new THREE.TextureLoader().load('/globe.jpg')
    vertexShader,
    fragmentShader ,
    uniforms:{
      globeTexture:{
        value: new THREE.TextureLoader().load(isDayTime?'/globe.jpg':'/globenight.jpg')
      },
      shadecolor:{
        value: isDayTime?new THREE.Vector3(0.3,0.6,1.0): new THREE.Vector3(0.1,0.3,0.7)
      }
    }
  })
)
//sphere.rotateX(-Math.PI / 2)

const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5,50,50),
  new THREE.ShaderMaterial({
    // map:new THREE.TextureLoader().load('/globe.jpg')
    vertexShader: atmovertexShader,
    fragmentShader:atmofragmentShader ,
    blending:THREE.AdditiveBlending,
    side:THREE.BackSide,
    uniforms:{
      atmocolor:{
        value: isDayTime? new THREE.Vector4(0.0, 0.3255, 0.7529, 0.829) : new THREE.Vector4(0.0, 0.0255, 0.4529, 0.529)
      }
    } 
  })
)
//atmosphere.rotateX(-Math.PI / 2)
atmosphere.scale.set(1.2,1.2,1.2)
scene.add(atmosphere)


const group = new THREE.Group()
group.add(sphere)
scene.add(group)

var isPlay = true
const controls = new OrbitControls(camera,renderer.domElement)
controls.enablePan = false
controls.enableDamping = true
controls.enableRotate = false
controls.minDistance = 10;
controls.maxDistance = 25;

const mouse = {
  x:undefined,
  y:undefined
}

function animate(){



  controls.update()
  if(isPlay){
    sphere.rotation.y += 0.001
  }

  gsap.to(group.rotation,{
    x:mouse.y * 0.1,
    y:mouse.x * 0.5,
    duration : 2 
  })
  renderer.render(scene,camera)
  requestAnimationFrame(animate)
}
animate()

document.addEventListener("keydown",(e)=>{
  if(e.key == "P" || e.key == "p"){
    isPlay = !isPlay
  }
})


addEventListener("mousemove",(e)=>{
  mouse.x = (e.clientX / innerWidth) * 2 - 1
  mouse.y = (e.clientY / innerHeight) * 2 + 1

})

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}