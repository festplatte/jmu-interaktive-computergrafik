import {
    checkerboard,
    circle
} from './2d.js';

function drawCheckerboard() {
    const canvas = document.getElementById("checkerboard");
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            checkerboard(data, x, y, canvas.width, canvas.height);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function drawCircle() {
    const canvas = document.getElementById("circle");
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const radius = canvas.width / 3;
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            circle(data, x, y, canvas.width, canvas.height, radius);
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

window.addEventListener('load', evt => {
    drawCheckerboard();
    drawCircle();
});