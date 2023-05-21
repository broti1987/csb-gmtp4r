const canvas = document.getElementById("starfield");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//canvas.fillStyle = "rgba(100, 0, 0, 100)";
/*window.addEventListener("wheel", (event) => {
  if (event.deltaY < 0) speed = 0.025;
  //else speed *= 0.5;
});*/
//canvas.fillStyle = pink;

window.addEventListener("wheel", (event) => {
  if (event.deltaY > 0) speed = speed + 0.0025;
  else speed = speed - 0.0025;

  if (speed < 0) speed = 0.0005;
});

class Star {
  constructor() {
    this.x = Math.random() * canvas.width - canvas.width / 2;
    this.y = Math.random() * canvas.height - canvas.height / 2;
    this.px, this.py;
    this.z = Math.random() * 2;
  }
  update() {
    this.px = this.x;
    this.py = this.y;
    this.z += speed;
    this.x += this.x * (speed * 0.2) * this.z;
    this.y += this.y * (speed * 0.2) * this.z;
    if (
      this.x > canvas.width / 2 + 50 ||
      this.x < -canvas.width / 2 - 50 ||
      this.y > canvas.height / 2 + 50 ||
      this.y < -canvas.height / 2 - 50
    ) {
      this.x = Math.random() * canvas.width - canvas.width / 2;
      this.y = Math.random() * canvas.height - canvas.height / 2;
      this.px = this.x;
      this.py = this.y;
      this.z = 0;
    }
  }
  show() {
    c.lineWidth = this.z;
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineTo(this.px, this.py);
    c.stroke();
  }
}
let speed = 0.002;
let stars = [];
for (let i = 0; i < 100; i++) stars.push(new Star());

c.fillStyle = "rgba(0, 0, 0, 0.1)";
c.strokeStyle = "rgba(255, 175, 250,70)";
c.translate(canvas.width / 2, canvas.height / 2);
function draw() {
  requestAnimationFrame(draw);
  c.fillRect(
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  for (let s of stars) {
    s.update();
    s.show();
  }
}

//c.globalCompositeOperation = "screen";
draw();
