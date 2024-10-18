const container = document.getElementById('container');
const info = document.getElementById('info');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
container.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

camera.position.z = 5;

const gltfLoader = new THREE.GLTFLoader();
document.getElementById('model-upload').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
        const contents = e.target.result;
        const blob = new Blob([contents], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);

        gltfLoader.load(url, (gltf) => {
            scene.clear();
            scene.add(gltf.scene);
            info.textContent = `Loaded: ${file.name}`;
            animate();
        }, undefined, (error) => {
            console.error(error);
        });
    };

    reader.readAsArrayBuffer(file);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight * 0.8;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
