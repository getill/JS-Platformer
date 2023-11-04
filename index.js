const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// Getting 16/9 ratio
canvas.width = 1024;
canvas.height = 576;

const parsedCollisions = collisionLevel1.parse2D();
const collisionBlocks = parsedCollisions.createObjectsFrom2D();

const backgroundLevel1 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./Assets/img/backgroundLevel1.png",
});

const player = new Player({
  collisionBlocks,
  imageSrc: "./Assets/img/king/idle.png",
  frameRate: 11,
});

const keys = {
  z: {
    pressed: false,
  },
  q: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

// ------ Animation loop ------
function animate() {
  window.requestAnimationFrame(animate);

  backgroundLevel1.draw();
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.draw();
  });

  player.velocity.x = 0;
  if (keys.d.pressed) {
    player.velocity.x = 5;
  } else if (keys.q.pressed) {
    player.velocity.x = -5;
  }

  player.draw();
  player.update();
}

animate();
