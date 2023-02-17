export class Particle {

    /**
     * 
     * @param {Element} circle 
     */
    constructor(particles, speed=0) {
        this.particles = particles;
        this.circle = document.getElementsByClassName("particle")[0].cloneNode();
        this.r = parseFloat(/(\d+)/.exec(this.circle.getAttribute("r"))[0]);
        this.x = Math.random() * (document.documentElement.clientWidth - 2*this.r) + this.r;
        this.y = Math.random() * (document.documentElement.clientHeight - 2*this.r) + this.r;

        while(this.getColliding()){
            this.x = Math.random() * (document.documentElement.clientWidth - 2*this.r) + this.r;
            this.y = Math.random() * (document.documentElement.clientHeight - 2*this.r) + this.r;
        }
        this.circle.setAttribute("cx", this.x + "px");
        this.circle.setAttribute("cy", this.y + "px");
        document.getElementById("board").appendChild(this.circle);

        this.velDir = Math.random() * (2 * Math.PI);
        this.speed = speed;
        this.velX = Math.cos(this.velDir) * this.speed;
        this.velY = Math.sin(this.velDir) * this.speed;
        
        this.mass = 10;
        this.justCollided = false;

        
    }

    // constructor(particles, x, y, speed, dir) {
    //     this.particles = particles;
    //     this.circle = document.getElementsByClassName("particle")[0].cloneNode();
    //     this.r = parseFloat(/(\d+)/.exec(this.circle.getAttribute("r"))[0]);
    //     this.x = x
    //     this.y = y

    //     if(this.getColliding()){
    //         throw "BAD BAD BAD";
    //     }
    //     this.circle.setAttribute("cx", this.x + "px");
    //     this.circle.setAttribute("cy", this.y + "px");
    //     document.getElementById("board").appendChild(this.circle);

    //     this.velDir = dir
    //     this.speed = speed
    //     this.velX = Math.cos(this.velDir) * this.speed;
    //     this.velY = Math.sin(this.velDir) * this.speed;
        
    //     this.mass = 10;
    //     this.justCollided = false;

        
    // }

    update() {
        this.velDir = Math.atan2(this.velY, this.velX);
        this.speed = Math.sqrt(Math.pow(this.velX, 2) + Math.pow(this.velY, 2));

        var totalSpeed = 0;
        this.particles.forEach((p) => totalSpeed += p.speed);
        // console.log(totalSpeed);
        
        this.wallBounce();
        var [newVX, newVY] = this.onCollision();
        

        if (!this.justCollided){
            this.velX = newVX;
            this.velY = newVY;
        }

        // console.log(this.velX);
        // console.log(this);
        
    }

    move() {
        this.x += this.velX;
        this.y += this.velY;

        this.circle.setAttribute("cx", this.x);
        this.circle.setAttribute("cy", this.y);
    }

    wallBounce() {
        if (this.x <= this.r) {
            this.velX = Math.abs(this.velX);
            // this.x = this.r+1;
        }
        else if (this.x >= document.documentElement.clientWidth - this.r){
            this.velX = -Math.abs(this.velX);
            // this.x = document.documentElement.clientWidth - this.r-1;
        }
        if (this.y <= this.r) {
            this.velY = Math.abs(this.velY);
            // this.y = this.r+1;
        } else if (this.y >= document.documentElement.clientHeight - this.r){
            this.velY = -Math.abs(this.velY);
            // this.y = document.documentElement.clientHeight - this.r-1;

        }
    }

    getColliding() {
        return !this.particles.every((p) => p == this || Math.sqrt(Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2)) > 2 * this.r);
    }

    onCollision() {
        var newVX = this.velX;
        var newVY = this.velY;
        if (!this.justCollided){
            this.particles.forEach(element => {
                if (element != this){
                    var dx = element.x - this.x;
                    var dy = element.y - this.y;
                    var distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
                    if (distance <= this.r*2) {
                        var phi = Math.atan2(dy, dx);
                        newVX = element.speed*Math.cos(element.velDir - phi)*Math.cos(phi) + this.speed*Math.sin(this.velDir - phi)*Math.cos(phi + (Math.PI/2)) //element.velX
                        newVY = element.speed*Math.cos(element.velDir - phi)*Math.sin(phi) + this.speed*Math.sin(this.velDir - phi)*Math.sin(phi + (Math.PI/2)) //element.velY
                        
                        element.velX = this.speed*Math.cos(this.velDir - phi)*Math.cos(phi) + element.speed*Math.sin(element.velDir - phi)*Math.cos(phi + (Math.PI/2)) //this.velX;
                        element.velY = this.speed*Math.cos(this.velDir - phi)*Math.sin(phi) + element.speed*Math.sin(element.velDir - phi)*Math.sin(phi + (Math.PI/2)) //this.velY
                        // console.log(this.circle);
                        element.justCollided = true;
                    }
                }
            });
        } else {
            this.justCollided = false;
        }
        

        // if (collided){
        //     this.x = this.velX;
        //     this.y = this.velY;
        // }

        

        // this.circle.setAttribute("cx", this.x);
        // this.circle.setAttribute("cy", this.y);

        if (!this.getColliding())
                return [this.velX, this.velY];
        else
            return [newVX, newVY];
    }


}