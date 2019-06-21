import Vector from './vector.js';

/**
 * Calculate the colour of an object at the intersection point according to the Phong Lighting model.
 * @param {Vector} color               - The colour of the intersected object
 * @param {Intersection} intersection     - The intersection information
 * @param {Array.<Vector>} lightPositions - The light positions
 * @param {number} shininess              - The shininess parameter of the Phong model
 * @param {Vector} cameraPosition         - The position of the camera
 * @return {Vector}                         The resulting colour
 */
export default function phong(color, intersection, lightPositions, shininess, cameraPosition) {
  const lightColor = new Vector(0.8, 0.8, 0.8, 0);
  const kA = 0.6;
  const kD = 0.8;
  const kS = 0.8;
  // TODO [exercise 5]
  return color;
}