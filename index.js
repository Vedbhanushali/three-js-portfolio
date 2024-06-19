import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
//setting up renderer
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

//setting up camera
const fov = 75;//field of view
const aspect = w / h;//aspect ratio
const near = 0.1;//near clipping plane
const far = 10;//far clipping plane
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

//this allows us to move the camera around the scene using mouse
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
//setting up scene
const scene = new THREE.Scene();

//adding predefined geometry from THree js in scene
const geo = new THREE.IcosahedronGeometry(1, 2);
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

//adding wireframe to above model
const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
})
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001)
mesh.add(wireMesh)

//setting up light
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500, 1);
scene.add(hemiLight);

//Rendering
function animate(t = 0) {
    requestAnimationFrame(animate);
    // mesh.scale.setScalar(Math.cos(t * 0.0001) + 1)
    mesh.rotation.y = t * 0.0001
    renderer.render(scene, camera);
    controls.update();
}
animate()