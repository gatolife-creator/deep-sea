class Main {
    constructor() {
        this.x = [];
        this.y = [];
        this.size = [];
        this.speed = [];
        this.al = [];
        this.control = false;
        this.keyControl = 0;
        this.keyControl_s = 0;
    }

    setup() {
        for (var i = 0; i < 60; i++) {
            (this.x[i] = random(width)), (this.y[i] = random(height));
            if (i % 5 == 0) {
                this.size[i] = random(100, 160);
            } else {
                this.size[i] = random(5, 60);
            }
            (this.speed[i] = (this.size[i] / 40) * (this.size[i] / 80) + 4),
            (this.al[i] = this.size[i]);
        }
    }

    draw() {
        for (var i = 0; i < 60; i++) {
            this.x[i] +=
                random(-(this.size[i] / 40), this.size[i] / 40) + this.keyControl;
            this.y[i] -= this.speed[i] + (height - this.y[i]) / 250;
            if (this.y[i] < 0 - this.size[i]) {
                if ((movedX !== 0 && movedY !== 0) || this.control) {
                    //mouse is moving
                    if (i % int(random(2, 8)) == 0) {
                        this.size[i] = random(100, 160);
                    } else {
                        this.size[i] = random(5, 60);
                    }
                    this.speed[i] = (this.size[i] / 40) * (this.size[i] / 80) + 4;
                    this.al[i] = this.size[i];
                    this.x[i] = mouseX + random(-50, 50);
                    this.y[i] = mouseY + random(-50, 50);
                } else if (movedX == 0 && movedY == 0 && this.control == false) {
                    //mouse is stopping
                    if (i % int(random(2, 8)) == 0) {
                        this.size[i] = random(100, 160);
                    } else {
                        this.size[i] = random(5, 60);
                    }
                    (this.speed[i] = (this.size[i] / 40) * (this.size[i] / 80) + 4),
                    (this.al[i] = this.size[i]);
                    this.x[i] = random(width);
                    this.y[i] = height;
                }
            }
            if (i % 2 == 0) {
                stroke(0, 128, 255, this.al[i] * 3);
                strokeWeight(3);
                noFill();
                circle(this.x[i], this.y[i], this.size[i]);
            } else {
                strokeWeight(1);
                stroke(125);
                fill(0, 128, 255, this.al[i]);
                circle(this.x[i], this.y[i], this.size[i]);
            }
        }
    }
}
class Sub {
    constructor() {
        this.x = [];
        this.y = [];
        this.size = [];
        this.speed = [];
        this.al = [];
        this.count = 0;
        this.keyControl = 0;
        this.keyControl_s = 0;
    }
    setup() {
        for (var i = 0; i < 20; i++) {
            this.x[i] = random(width);
            this.y[i] = height;
            this.size[i] = random(5, 120);
            this.speed[i] = random(10, 20);
            this.al[i] = 150;
        }
    }

    draw() {
        this.count += 1;
        let randomness = 100 * int(random(8, 16));
        for (var i = 0; i < 20; i++) {
            this.x[i] +=
                random(-(this.size[i] / 40), this.size[i] / 40) + this.keyControl;
            this.y[i] -= this.speed[i];
            if (this.count % randomness == 0) {
                this.x[i] = random(width);
                this.y[i] = height;
            }
            stroke(94, 255, 128, this.al[i]);
            strokeWeight(3);
            noFill();
            circle(this.x[i], this.y[i], this.size[i]);
        }
    }
}

// bgm
let song;

let backcolor = [];
let backcolorspeed = [];

function preload() {
    song = loadSound(
        "N3WPORT & Meggie York - Runaway [NCS Release].mp3"
    );
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    noCursor();
    let fs = fullscreen();
    fullscreen(!fs);
    song.loop();
    main = new Main();
    sub = new Sub();
    main.setup();
    sub.setup();
    for (var i = 0; i < 50; i++) {
        backcolor[i] = 30 + i;
        backcolorspeed[i] = 0.25;
    }
}

function draw() {
    for (var i = 0; i < 50; i++) {
        backcolor[i] += backcolorspeed[i];
        noStroke();
        fill(0, 0, backcolor[i], 255);
        rect(0, i * (height / 50), width, height / 50);
        if (backcolor[i] > 125 || backcolor[i] < 30) {
            backcolorspeed[i] *= -1;
        }
    }

    main.draw();
    sub.draw();

    fill(255);
    circle(mouseX, mouseY, 5);
    if (keyIsDown(LEFT_ARROW) && main.keyControl > -5) {
        main.keyControl -= 0.1;
        sub.keyControl -= 0.1;
    } else if (!(keyIsDown(LEFT_ARROW)) && main.keyControl < 0) {
        main.keyControl += 0.1;
        sub.keyControl += 0.1;
    }
    if (keyIsDown(RIGHT_ARROW) && main.keyControl < 5) {
        main.keyControl += 0.1;
        sub.keyControl += 0.1;
    } else if (!(keyIsDown(RIGHT_ARROW)) & main.keyControl > 0) {
        main.keyControl -= 0.1;
        sub.keyControl -= 0.1;
    }
}

function mousePressed() {
    if (main.control == false) {
        //     マウスから泡
        main.control = true;
    } else if (main.control == true) {
        //     マウスから泡、の解除
        main.control = false;
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
