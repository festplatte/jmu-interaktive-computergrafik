/**
 * Conducts a gamma adjustment with a given gamma value on the pixel
 * (x, y). The original colour information can be read from the source image.
 * The adjusted colour is to be saved in the dest array.
 * @param {number} gamma The gamma factor to adjust the brightness
 * @param {Array.<number>} source The original pixel data
 * @param {Array.<number>} dest The array to save the adjusted colour data to
 * @param {number} x The x coordinate of the pixel to adjust
 * @param {number} y The y coordinate of the pixel to adjust
 * @param {number} width The width of the image in pixels
 * @param {number} height The height of the image in pixels
 */
export function gammaAdjust(gamma, source, dest, x, y, width, height) {
  const startIndex = calcIndex(x, y, width);
  let manipulatedPixel = [];
  source
    .slice(startIndex, startIndex + 3)
    .forEach(x => manipulatedPixel.push(x / 255));
  manipulatedPixel = manipulatedPixel.map(
    intensity => Math.pow(intensity, 1 / gamma) * 255
  );

  dest[startIndex] = manipulatedPixel[0];
  dest[startIndex + 1] = manipulatedPixel[1];
  dest[startIndex + 2] = manipulatedPixel[2];
  dest[startIndex + 3] = 255;

  //   if (x === 300 && y === 300) {
  //     console.log(`${width} ${height}`);
  //     console.log(manipulatedPixel);
  //   }
}

/**
 * Converts the rgb colour information of the given pixel (x, y) into its cmyk
 * equivalent. Each component of the computed cmyk representation is then
 * separately converted back to rgb and saved into its own destination image.
 * @param {Array.<number>} data The source array containing the images
 *                              colour values
 * @param {number} x The x coordinate of the pixel to adjust
 * @param {number} y The y coordinate of the pixel to adjust
 * @param {number} width The width of the image in pixels
 * @param {number} height The height of the image in pixels
 * @param {Array.<number>} cData Destination array for the c component of the
 *                               cmyk decomposition converted to RGB
 * @param {Array.<number>} mData Destination array for the m component of the
 *                               cmyk decomposition converted to RGB
 * @param {Array.<number>} yData Destination array for the y component of the
 *                               cmyk decomposition converted to RGB
 * @param {Array.<number>} kData Destination array for the k component of the
 *                               cmyk decomposition converted to RGB
 */
export function cmyk(data, x, y, width, height, cData, mData, yData, kData) {
  const startIndex = calcIndex(x, y, width);
  const originPixel = [];
  data
    .slice(startIndex, startIndex + 3)
    .forEach(x => originPixel.push(x / 255));
  const cmyPixel = originPixel.map(x => 1 - x);

  const kValue = Math.min(cmyPixel[0], cmyPixel[1], cmyPixel[2]);
  const cValue = 1 - originPixel[0] - kValue;
  const mValue = 1 - originPixel[1] - kValue;
  const yValue = 1 - originPixel[2] - kValue;

  const kChannel = Math.ceil((1 - kValue) * 255);
  kData[startIndex] = kChannel;
  kData[startIndex + 1] = kChannel;
  kData[startIndex + 2] = kChannel;
  kData[startIndex + 3] = 255;

  cData[startIndex] = Math.ceil((1 - cValue) * 255);
  cData[startIndex + 1] = 255;
  cData[startIndex + 2] = 255;
  cData[startIndex + 3] = 255;

  mData[startIndex] = 255;
  mData[startIndex + 1] = Math.ceil((1 - mValue) * 255);
  mData[startIndex + 2] = 255;
  mData[startIndex + 3] = 255;

  yData[startIndex] = 255;
  yData[startIndex + 1] = 255;
  yData[startIndex + 2] = Math.ceil((1 - yValue) * 255);
  yData[startIndex + 3] = 255;

  //   if (x === 50 && y === 50) {
  //     console.log(kValue);
  //   }
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
