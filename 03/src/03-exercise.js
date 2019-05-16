import {
    dda,
    bresenham
} from './lines.js';

let canvasDDA;
let ctxDDA;
let imageDataDDA;

function initDDA() {
    canvasDDA = document.getElementById("dda");
    ctxDDA = canvasDDA.getContext("2d");
    imageDataDDA = ctxDDA.getImageData(0, 0, canvasDDA.width, canvasDDA.height);
}

function updateDDA(pointA, pointB) {
    const data = imageDataDDA.data;
    data.fill(0);
    dda(data, pointA, pointB, canvasDDA.width, canvasDDA.height);
    ctxDDA.putImageData(imageDataDDA, 0, 0);
}

let canvasExample;
let ctxExample;

function initExample() {
    canvasExample = document.getElementById("example");
    canvasExample.height = canvasExample.width;
    ctxExample = canvasExample.getContext("2d");
}

function updateExample(pointA, pointB) {
    ctxExample.clearRect(0, 0, canvasExample.width, canvasExample.height);
    ctxExample.beginPath();
    ctxExample.moveTo(pointA[0], pointA[1]);
    ctxExample.lineTo(pointB[0], pointB[1]);
    ctxExample.stroke();
}


let canvasBresenham;
let ctxBresenham;
let imageDataBresenham;

function initBresenham() {
    canvasBresenham = document.getElementById("bresenham");
    canvasBresenham.height = canvasBresenham.width;
    ctxBresenham = canvasBresenham.getContext("2d");
    imageDataBresenham = ctxBresenham.getImageData(
        0, 0, canvasBresenham.width, canvasBresenham.height);
}

function updateBresenham(pointA, pointB) {
    const data = imageDataBresenham.data;
    data.fill(0);
    bresenham(data, pointA, pointB, canvasBresenham.width, canvasBresenham.height);
    ctxBresenham.putImageData(imageDataBresenham, 0, 0);
}

let t = 0;

function calculatePoints(t) {
    const pointA = [Math.round((Math.cos(t) + 1) / 2 * canvasDDA.width), Math.round((Math.sin(t) + 1) / 2 * canvasDDA.height)];
    const pointB = [Math.round((Math.cos(t + Math.PI) + 1) / 2 * canvasDDA.width), Math.round((Math.sin(t + Math.PI) + 1) / 2 * canvasDDA.height)];
    return [pointA, pointB];
}

let animationFrameId;

function updateCanvas(timestamp) {
    t += 0.01;
    const points = calculatePoints(t);
    updateExample(points[0], points[1]);
    updateDDA(points[0], points[1]);
    updateBresenham(points[0], points[1]);
    animationFrameId = window.requestAnimationFrame(updateCanvas);
}

function benchmark() {
    window.cancelAnimationFrame(animationFrameId);
    let t0 = performance.now();
    let t = 0;
    for (let i = 0; i < 10000; i++) {
        t += 0.01;
        const points = calculatePoints(t);
        updateDDA(points[0], points[1]);
    }
    let t1 = performance.now();
    const ddaTime = t1 - t0;

    t0 = performance.now();
    t = 0;
    for (let i = 0; i < 10000; i++) {
        t += 0.01;
        const points = calculatePoints(t);
        updateBresenham(points[0], points[1]);
    }
    t1 = performance.now();
    const bresenhamTime = t1 - t0;
    document.getElementById("benchmarkResult").innerHTML =
        "DDA: " + ddaTime + " milliseconds<br>" +
        "Bresenham: " + bresenhamTime + " milliseconds";
    animationFrameId = window.requestAnimationFrame(updateCanvas);
}

window.addEventListener('load', evt => {
    initDDA();
    initExample();
    initBresenham();
    document.getElementById("benchmark").addEventListener('click', benchmark);
    animationFrameId = window.requestAnimationFrame(updateCanvas);
});