const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// Getting 16/9 ratio
canvas.width = 1024;
canvas.height = 576;

c.fillStyle = "white";
c.fillRect(0, 0, 200, 200);
