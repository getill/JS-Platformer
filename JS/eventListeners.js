window.addEventListener("keydown", (event) => {
  if (player.preventInput) return;

  // We listen to every letters pressed then we play some stuff
  switch (event.key) {
    // Jump / Enter door
    case "z":
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i];

        if (
          player.hitbox.position.x + player.hitbox.width <=
            door.position.x + door.width &&
          player.hitbox.position.x >= door.position.x &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y &&
          player.hitbox.position.y <= door.position.y + door.height
        ) {
          player.velocity.x = 0;
          player.velocity.y = 0;
          player.preventInput = true;
          player.switchSprite("enterDoor");
          door.play();
          return;
        }
      }
      if (player.velocity.y === 0) {
        player.velocity.y = -25;
      }
      break;

    // Move left
    case "q":
      keys.q.pressed = true;
      break;

    // Move right
    case "d":
      keys.d.pressed = true;
      break;
  }
});

// Stop sprite when the keys are not pressed anymore
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    // Stop Moving left
    case "q":
      keys.q.pressed = false;
      break;

    // Stop Moving right
    case "d":
      keys.d.pressed = false;
      break;
  }
});
