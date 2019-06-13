import Vector from "./vector.js";

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
    this.origin = origin;
    this.direction = direction;
  }

  /**
   * Creates a ray from the camera through the image plane.
   * @param  {number} xpos   - The pixel's x-position in the canvas
   * @param  {number} ypos   - The pixel's y-position in the canvas
   * @param  {Object} camera - The Camera
   * @return {Ray}             The resulting Ray
   */
  static makeRay(xpos, ypos, camera) {
    return new Ray(
      camera.origin,
      new Vector(
        xpos - (camera.width - 1) / 2,
        (camera.height - 1) / 2 - ypos,
        -(camera.width / 2 / Math.tan(camera.alpha / 2)),
        0
      ).normalised()
    );
  }
}
