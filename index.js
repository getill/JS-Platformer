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

  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./Assets/img/king/idle.png",
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./Assets/img/king/idleLeft.png",
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./Assets/img/king/runRight.png",
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./Assets/img/king/runLeft.png",
    },
    enterDoor: {
      frameRate: 8,
      frameBuffer: 4,
      loop: false,
      imageSrc: "./Assets/img/king/enterDoor.png",
      onComplete: () => {
        gsap.to(overlay, {
          opacity: 1,
        });
      },
    },
  },
});

const doors = [
  new Sprite({
    position: {
      x: 767,
      y: 270,
    },
    imageSrc: "./Assets/img/doorOpen.png",
    frameRate: 5,
    frameBuffer: 5,
    loop: false,
    autoplay: false,
  }),
];

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

const overlay = {
  opacity: 0,
};

// ------ Animation loop ------
function animate() {
  window.requestAnimationFrame(animate);

  backgroundLevel1.draw();
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.draw();
  });
  doors.forEach((door) => {
    door.draw();
  });

  player.handleInput(keys);
  player.draw();
  player.update();

  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}

animate();
