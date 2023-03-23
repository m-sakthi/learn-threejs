import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
// controls.addEventListener('change', render) //this line is unnecessary if you are re-rendering within the animation loop

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')

const rotation = cube.rotation as Record<string, any>
cubeFolder.add(rotation, 'x', 0, Math.PI * 2)
cubeFolder.add(rotation, 'y', 0, Math.PI * 2)
cubeFolder.add(rotation, 'z', 0, Math.PI * 2)
cubeFolder.open()


const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position as Record<string, any>, 'z', 0, 20)

function animate() {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  render()

  stats.update()
}

function render() {
  renderer.render(scene, camera)
}

animate()
// render()