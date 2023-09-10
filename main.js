import * as THREE from 'three';
import './styles.css'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import gsap from 'gsap';

// Scene Initialization
const scene = new THREE.Scene();

// Sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: "#00ff83" , roughness:0.3});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//sizes
const sizes = {
    width: window.innerWidth, //window width
    height: window.innerHeight ,//window height
}

// Point Light
const light = new THREE.PointLight(0xffffff, 70, 100, 1.7);
light.position.set(0, 10, 10);
light.intensity = 190.25;
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 20;
scene.add(camera); // You need to add the camera to the scene.

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(3);
renderer.render(scene, camera);

//controls
const controls=new OrbitControls (camera,canvas)
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 10;

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //update camera
    camera.aspect= sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)

})

const loop = () => {
    controls.update();
    renderer.render(scene,camera)
    window.requestAnimationFrame(loop)
}
loop();

//TIMELINE MAGIC
const t1= gsap.timeline({defaults : { duration :1}})
t1.fromTo(mesh.scale, { z:0 , x:0 ,y:0} , { z:1 , x:1 , y:1})
t1.fromTo("nav",{ y: "-100%"},{ y: "0%"})
t1.fromTo(".title",{ opacity:0},{ opacity:1})


//mouse animation color
let mouseDown = false
let rgb =[]

window.addEventListener("mousedown" , () => (mouseDown = true))
window.addEventListener("mouseup" , () => (mouseDown = false))

window.addEventListener("mousemove", (e) => {
    if (mouseDown) {
        rgb = [
            Math.round((e.pageX / sizes.width) * 255),
            Math.round((e.pageY / sizes.height) * 255),
            150,
        ]

        //animation 

        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
        gsap.to(mesh.material.color, {
            r: newColor.r,
            g: newColor.g,
            b: newColor.b,
        })
    }
})