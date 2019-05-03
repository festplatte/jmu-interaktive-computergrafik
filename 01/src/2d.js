/**
 * Determines the colour of a pixel (x, y) to create
 * a checkerboard pattern and saves it into the data array.
 * The data array holds the linearised pixel data of the target canvas
 * row major. Each pixel is of RGBA format.
 * @param  {Array.<number>} data - The linearised pixel array
 * @param  {number} x            - The x coordinate of the pixel
 * @param  {number} y            - The y coordinate of the pixel
 * @param  {number} width        - The width of the canvas
 * @param  {number} height       - The height of the canvas
 */
export function checkerboard(data, x, y, width, height) {
  const rangeX = width / 8;
  const rangeY = height / 8;

  let isBlack = x % (2 * rangeX) < rangeX;
  if (y % (2 * rangeY) > rangeY) {
    isBlack = !isBlack;
  }

  const index = calcIndex(x, y, width);
  setPixel(isBlack, data, index);
}

/**
 * Determines the colour of a pixel (x, y) to create
 * a circle and saves it into the data array.
 * The data array holds the linearised pixel data of the target canvas
 * row major. Each pixel is of RGBA format.
 * @param  {Array.<number>} data - The linearised pixel array
 * @param  {number} x            - The x coordinate of the pixel
 * @param  {number} y            - The y coordinate of the pixel
 * @param  {number} width        - The width of the canvas
 * @param  {number} height       - The height of the canvas
 */
export function circle(data, x, y, width, height, radius) {
  const midX = width / 2;
  const midY = height / 2;
  const distToMid = Math.sqrt(Math.pow(x - midX, 2) + Math.pow(y - midY, 2));
  const isBlack = distToMid <= radius;

  const index = calcIndex(x, y, width);
  setPixel(isBlack, data, index);
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

/**
 * Sets a pixel in the given image to black or white.
 * @param {boolean} black if the pixel should be black or white
 * @param {array} data image data
 * @param {number} index first array index
 */
function setPixel(black, data, index) {
  data[index++] = black ? 0 : 255;
  data[index++] = black ? 0 : 255;
  data[index++] = black ? 0 : 255;
  data[index++] = 255;
}
