let patterns = [];
let beads = [];
const padding = 20;

let fft;
let song;
let button;

class CircularPattern {
  constructor(x, y, colors) {
    this.x = x;
    this.y = y;
    this.radius = 70;
    this.colors = colors;
    this.dotSize = 5;
    this.ringSpacing = 7;
  }

  drawInternalPattern() {
    fill(this.colors.internalBbColor);
    circle(0, 0, this.dotSize * 10);

    switch (this.colors.internalPatternStyle) {
      case "concentric circles":
        for (let r = this.dotSize * 10; r > 0; r -= 10) {
          let color = (r / 10) % 2 === 0 ? this.colors.patternColors : this.colors.internalBbColor;
          fill(color);
          circle(0, 0, r);
        }
        break;

      case "beads":
        fill(255, 255, 255);
        let beadLayers = 2;

        for (let layer = 1; layer <= beadLayers; layer++) {
          let beadCount = 8 * layer;
          let beadRadius = this.dotSize * 2 * layer;

          for (let i = 0; i < beadCount; i++) {
            let angle = (TWO_PI * i) / beadCount;
            let x = cos(angle) * beadRadius;
            let y = sin(angle) * beadRadius;
            circle(x, y, this.dotSize);
          }
        }
        break;

      default:
        fill(255, 255, 255, 150);
        circle(0, 0, this.dotSize * 6);
    }
  }

  display() {
    push();
    translate(this.x, this.y);

    noStroke();
    fill(this.colors.bgColors);
    circle(0, 0, this.radius * 2);

    for (let r = this.radius - 5; r > 0; r -= this.ringSpacing) {
      const circumference = TWO_PI * r;
      const dots = floor(circumference / (this.dotSize * 2));
      const angleStep = TWO_PI / dots;

      fill(this.colors.patternColors);

      for (let angle = 0; angle < TWO_PI; angle += angleStep) {
        const x = r * cos(angle);
        const y = r * sin(angle);
        circle(x, y, this.dotSize);
      }
    }

    this.drawInternalPattern();
    pop();
  }

  overlaps(other) {
    const minDistance = this.radius * 2 + 10;
    const distance = dist(this.x, this.y, other.x, other.y);
    return distance < minDistance;
  }
}

function preload() {
  song = loadSound("assets/383935__multitonbits__bs_electricity-bass-2.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  fft = new p5.FFT(0.8, 128);

  const colorsArray = [
    { bgColors: "#cdf5e1", patternColors: "#2ba441", internalBbColor: "#fb586a", internalPatternStyle: "concentric circles" },
    { bgColors: "#fef3f3", patternColors: "#d03c49", internalBbColor: "#fa6776", internalPatternStyle: "beads" },
  ];

  let gridSize = 150;
  for (let x = gridSize / 2; x < width - gridSize / 2; x += gridSize) {
    for (let y = gridSize / 2; y < height - gridSize / 2; y += gridSize) {
      let posX = x + random(-15, 15);
      let posY = y + random(-15, 15);

      const choosenPalette = random(colorsArray);
      const pattern = new CircularPattern(posX, posY, choosenPalette);

      let overlapping = false;
      for (let other of patterns) {
        if (pattern.overlaps(other)) {
          overlapping = true;
          break;
        }
      }

      if (!overlapping) {
        patterns.push(pattern);
      }
    }
  }

  // Create Play/Pause button
  button = createButton("Play/Pause");
  button.position((width - button.width) / 2, height - 50);
  button.mousePressed(togglePlayPause);
}

function draw() {
  background(0);

  if (song.isPlaying()) {
    let spectrum = fft.analyze();

    patterns.forEach((pattern, index) => {
      let offsetX = map(spectrum[index % spectrum.length], 0, 255, -30, 30);
      let offsetY = map(spectrum[(index + 5) % spectrum.length], 0, 255, -30, 30);

      pattern.x += offsetX * 0.1;
      pattern.y += offsetY * 0.1;

      pattern.x = constrain(pattern.x, pattern.radius, width - pattern.radius);
      pattern.y = constrain(pattern.y, pattern.radius, height - pattern.radius);

      pattern.display();
    });
  } else {
    patterns.forEach((pattern) => pattern.display());
  }
}

function togglePlayPause() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  button.position((width - button.width) / 2, height - 50);
}
