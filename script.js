// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 2 / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth / 2, window.innerHeight);
document.getElementById('tree-container').appendChild(renderer.domElement);

// Create tree
const treeGroup = new THREE.Group();

// Trunk
const trunkGeometry = new THREE.CylinderGeometry(0.5, 1, 4, 8);
const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x4a2f10 });
const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk.position.y = 2;
treeGroup.add(trunk);

// Leaves (multiple layers)
for (let i = 0; i < 5; i++) {
    const leavesGeometry = new THREE.ConeGeometry(2 - i * 0.3, 3 - i * 0.5, 8);
    const leavesMaterial = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color().setHSL(0.3 + i * 0.05, 0.8, 0.5 + i * 0.1)
    });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.y = 4 + i * 1.5;
    treeGroup.add(leaves);
}

// Add tree to scene
scene.add(treeGroup);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Position camera
camera.position.z = 10;

// Animation
let scrollPosition = 0;
window.addEventListener('scroll', () => {
    scrollPosition = window.scrollY;
});

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate tree based on scroll position
    treeGroup.rotation.y = scrollPosition * 0.001;
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / 2 / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
});

animate(); 