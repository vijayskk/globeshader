import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import shader from './shaders'




 


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

const plane = new THREE.Mesh(
  new THREE.SphereGeometry(5,50,50),
  new THREE.MeshBasicMaterial({
    map:new THREE.TextureLoader().load('/globe.jpg')
  })
)
//plane.rotateX(-Math.PI / 2)
scene.add(plane)


var isPlay = true
const controls = new OrbitControls(camera,renderer.domElement)
controls.enablePan = false
function animate(){



  controls.update()
  if(isPlay){
    plane.rotation.y += 0.01
  }


  renderer.render(scene,camera)
  requestAnimationFrame(animate)
}
animate()

document.addEventListener("keydown",(e)=>{
  if(e.key == "P" || e.key == "p"){
    isPlay = !isPlay
  }
})
