/**
 * Draws a line from pointA to pointB on the canvas
 * with the DDA algorithm.
 * @param  {Array.<number>} data   - The linearised pixel array
 * @param  {Array.<number>} pointA - The start point of the line
 * @param  {Array.<number>} pointB - The end point of the line
 * @param  {number} width          - The width of the canvas
 * @param  {number} height         - The height of the canvas
 */
export function dda(data, pointA, pointB, width, height) {
  const m = (pointB[1] - pointA[1]) / (pointB[0] - pointA[0]);
  fillPixel(data, calcIndex(pointA[0], pointA[1], width));
  fillPixel(data, calcIndex(pointB[0], pointB[1], width));

  for (let x = pointA[0] + 1; x < pointB[0]; x++) {
    fillPixel(data, calcIndex(x, m * x, width));
  }
}

/**
 * Draws a line from pointA to pointB on the canvas
 * with the Bresenham algorithm.
 * @param  {Array.<number>} data   - The linearised pixel array
 * @param  {Array.<number>} pointA - The start point of the line
 * @param  {Array.<number>} pointB - The end point of the line
 * @param  {number} width          - The width of the canvas
 * @param  {number} height         - The height of the canvas
 */
export function bresenham(data, pointA, pointB, width, height) {
  const dPoints = [pointB[0] - pointA[0], pointB[1] - pointA[1]];
  const dDir = dPoints.map(val => (val < 0 ? -1 : 1));
  const direction = dPoints[0] > dPoints[1] ? 0 : 1;

  let f = dPoints[direction] / 2;
  const pointToDraw = [...pointA];

  while (pointToDraw[direction] <= pointB[direction]) {
    fillPixel(data, calcIndex(pointToDraw[0], pointToDraw[1], width));
    pointToDraw[direction] += dDir[direction];
    f -= dPoints[!direction];
    if (f < 0) {
      pointToDraw[!direction] += dDir[!direction];
      f += dPoints[direction];
    }
  }
}

/**
 * Calculates the first array index for the given coordinates.
 * @param {number} x
 * @param {number} y
 * @param {number} width
 */
function calcIndex(x, y, width) {
  return 4 * x + y * 4 * width;
}

function fillPixel(data, startIndex) {
  data[startIndex] = 0;
  data[startIndex + 1] = 0;
  data[startIndex + 2] = 0;
  data[startIndex + 3] = 255;
}
