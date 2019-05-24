import Vector from './vector.js';

/**
 * Class representing a ray
 */
export default class Ray {
  /**
   * Creates a new ray with origin and direction
   * @param  {Vector} origin    - The origin of the Ray
   * @param  {Vector} direction - The direction of the Ray
   */
  constructor(origin, direction) {
    // TODO [exercise 4]
  }

  /**
   * Creates a ray from the camera through the image plane.
   * @param  {number} xpos   - The pixel's x-position in the canvas
   * @param  {number} ypos   - The pixel's y-position in the canvas
   * @param  {Object} camera - The Camera
   * @return {Ray}             The resulting Ray
   */
  static makeRay(xpos, ypos, camera) {
    // TODO [exercise 4]
  }
}