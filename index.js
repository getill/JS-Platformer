const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// Getting 16/9 ratio
canvas.width = 1024;
canvas.height = 576;

let parsedCollisions;
let collisionBlocks;
let background;
let doors;
const player = new Player({
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
          onComplete: () => {
            level++;

            // Return to level one after the last level
            if (level === 4) level = 1;
            levels[level].init();
            player.switchSprite("idleRight"); // Put the right sprite after entering doors
            player.preventInput = false; // preventInput is set to false to let you control the character
            gsap.to(overlay, {
              opacity: 0,
            });
          },
        });
      },
    },
  },
});

// ------------------------------------- LEVELS -------------------------------------
let level = 1;
let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionLevel1.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./Assets/img/backgroundLevel1.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 767.0,
            y: 270,
          },
          imageSrc: "./Assets/img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionLevel2.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 96;
      player.position.y = 140;

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./Assets/img/backgroundLevel2.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 772,
            y: 336,
          },
          imageSrc: "./Assets/img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  3: {
    init: () => {
      parsedCollisions = collisionLevel3.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 750;
      player.position.y = 230;
      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./Assets/img/backgroundLevel3.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 176.0,
            y: 335,
          },
          imageSrc: "./Assets/img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
};

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

  background.draw();
  // collisionBlocks.forEach((collisionBlock) => {
  //   collisionBlock.draw();
  // });
  doors.forEach((door) => {
    door.draw();
  });

  player.handleInput(keys);
  player.draw();
  player.update();

  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = "rgb(63, 56, 81)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}

levels[level].init();
animate();
