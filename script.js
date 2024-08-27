// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#solar-system') });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 50;

// Create the Sun
const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Function to create a planet
function createPlanet(size, color, distance, speed, name) {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const planet = new THREE.Mesh(geometry, material);
    planet.position.x = distance;
    planet.speed = speed;
    planet.name = name;
    scene.add(planet);
    return planet;
}

// Planets
const planets = [];
planets.push(createPlanet(2, 0x0077ff, 20, 0.02, 'earth'));
planets.push(createPlanet(1.5, 0xff0000, 30, 0.015, 'mars'));
planets.push(createPlanet(3, 0xffa500, 40, 0.01, 'jupiter'));

// Animation loop for planets orbiting
function animate() {
    requestAnimationFrame(animate);

    planets.forEach(planet => {
        planet.position.x = Math.cos(Date.now() * planet.speed) * planet.position.x;
        planet.position.z = Math.sin(Date.now() * planet.speed) * planet.position.x;
    });

    renderer.render(scene, camera);
}
animate();

// Clickable navigation to planets
document.querySelectorAll('.planet-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const planetName = e.target.getAttribute('data-planet');
        travelToPlanet(planetName);
    });
});

function travelToPlanet(planetName) {
    const targetPlanet = planets.find(planet => planet.name === planetName);
    
    gsap.to(camera.position, {
        duration: 2,
        x: targetPlanet.position.x,
        z: targetPlanet.position.z + 10,
        onComplete: () => showPlanetInfo(planetName)
    });
}

// Display planet info in modal
function showPlanetInfo(planetName) {
    const info = {
        earth: { title: 'Earth', description: 'Earth is the third planet from the Sun and the only known planet to support life.' },
        mars: { title: 'Mars', description: 'Mars is the fourth planet from the Sun, known for its reddish appearance.' },
        jupiter: { title: 'Jupiter', description: 'Jupiter is the largest planet in the Solar System.' }
    };

    document.getElementById('planet-title').innerText = info[planetName].title;
    document.getElementById('planet-description').innerText = info[planetName].description;
    document.getElementById('planet-info').style.display = 'block';
}

// Close the modal
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('planet-info').style.display = 'none';
});
