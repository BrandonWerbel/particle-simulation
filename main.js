import { Particle } from "./modules/particle.js";

const r = 8.3144598
const avogadgro = 6.02214076 * Math.pow(10, 23);

const intervalSpeed = 1;
const simSpeed = 0.03;
const numParticles = 200;
const temperature = 250;
const mass = 6.6464731 * Math.pow(10,-27)
const timeConst = (intervalSpeed / 1000.0) * simSpeed;

const timeDiv = document.getElementById("time");

var averageEnergy = (3.0 / 2) * (r / avogadgro) * temperature;
var averageVelocity = Math.sqrt(2 * averageEnergy / mass);

var totalVelocity = averageVelocity * numParticles;

console.log(averageVelocity * timeConst);
document.getElementById("initialSpeed").textContent = Math.pow(averageVelocity * timeConst, 2) * numParticles;
var particles = [];

particles[0] = new Particle(particles, averageVelocity * timeConst);
for(var i = 1; i < numParticles; i++){
    particles[i] = new Particle(particles, averageVelocity * timeConst);

}

// particles[0] = new Particle(particles, 100, 500, 0.5, - Math.PI / 6);
// particles[1] = new Particle(particles, 500, 500, 0.5, 7 *Math.PI / 6);

var speeds = [];

var download = function() {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(speeds));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download",  "speeds.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
}
document.addEventListener("keydown", (key) => {
    if (key.key == "Enter"){
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(speeds));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download",  "speeds.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
});

timeDiv.textContent = 0;
var interval = setInterval(() => {
    particles.forEach(p => p.update());
    particles.forEach(p => p.move());
    particles.forEach((p, i) => speeds[i] = p.speed / timeConst)
    timeDiv.textContent =  parseFloat(timeDiv.textContent) + timeConst;
    if (parseFloat(timeDiv.textContent) >= 1){
        download();
        clearInterval(interval);
    }
}, intervalSpeed);