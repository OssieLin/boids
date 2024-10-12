const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const boids = [];
const numBoids = 100; // Adjust this for more or fewer boids

class Boid {
    constructor(x, y) {
        this.position = { x, y };
        this.velocity = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
        this.maxSpeed = 2;
        this.maxForce = 0.05;
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Wrap around screen edges
        if (this.position.x < 0) this.position.x = canvas.width;
        if (this.position.x > canvas.width) this.position.x = 0;
        if (this.position.y < 0) this.position.y = canvas.height;
        if (this.position.y > canvas.height) this.position.y = 0;
    }

    draw() {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize boids
for (let i = 0; i < numBoids; i++) {
    boids.push(new Boid(Math.random() * canvas.width, Math.random() * canvas.height));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const boid of boids) {
        boid.update();
        boid.draw();
    }
    requestAnimationFrame(animate);
}

animate();
