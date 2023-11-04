// ------ Player creator ------
class Player {
  constructor({ collisionBlocks = [] }) {
    this.position = {
      x: 200,
      y: 200,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.width = 25;
    this.height = 25;
    this.sides = {
      bottom: this.position.y + this.height,
    };
    this.gravity = 1;

    this.collisionBlocks = collisionBlocks;
  }

  // Drawing the player on canvas
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  // Player stops when we reach the bottom
  update() {
    this.position.x += this.velocity.x;
    this.checkForHorizontalCollisions();
    this.applyGravity();
    this.checkForVerticalCollisions();
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      // Lets see if the collision exists
      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        // This is used to know if we are going to the left
        if (this.velocity.x < -0) {
          this.position.x =
            collisionBlock.position.x + collisionBlock.width + 0.01;
          break;
        }
        // This is used to know if we are going to the right
        if (this.velocity.x > 0) {
          this.position.x = collisionBlock.position.x - this.width - 0.01;
          break;
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }

  checkForVerticalCollisions() {
    // Check vertical collisions
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      // Lets see if the collision exists
      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        // This is used to know if we are going to the left
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height + 0.01;
          break;
        }
        // This is used to know if we are going to the right
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          this.position.y = collisionBlock.position.y - this.height - 0.01;
          break;
        }
      }
    }
  }
}
