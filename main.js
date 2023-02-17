import { Particle } from "./modules/particle.js";

const interval = 1
const numParticles = 200;

var particles = [];

for(var i = 0; i < numParticles; i++){
    particles[i] = new Particle(particles);
}

// particles[0] = new Particle(particles, 100, 500, 0.5, - Math.PI / 6);
// particles[1] = new Particle(particles, 500, 500, 0.5, 7 *Math.PI / 6);


setInterval(() => {
    particles.forEach(p => p.update());
    particles.forEach(p => p.move());
}, interval);