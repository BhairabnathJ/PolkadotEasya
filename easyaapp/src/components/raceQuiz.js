// canvas dec
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// rect prop
const x = 50;
const y = 50;
const width = 800;
const height = 600;

// color
ctx.fillStyle = 'blue';

// draw rect
ctx.fillRect(x, y, width, height);