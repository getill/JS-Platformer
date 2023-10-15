window.addEventListener("keydown", (event) => {
  switch (event.key) {
    // Jump
    case "z":
      if (player.velocity.y === 0) {
        player.velocity.y = -20;
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
