import Intersection from "./intersection.js";

/**
 * A class representing a sphere
 */
export default class Sphere {
  /**
   * Creates a new Sphere with center and radius
   * @param  {Vector} center - The center of the Sphere
   * @param  {number} radius - The radius of the Sphere
   * @param  {Vector} color  - The colour of the Sphere
   */
  constructor(center, radius, color) {
    this.center = center;
    this.radius = radius;
    this.color = color;
  }

  /**
   * Calculates the intersection of the sphere with the given ray
   * @param  {Ray} ray      - The ray to intersect with
   * @return {Intersection}   The intersection if there is one, null if there is none
   */
  intersect(ray) {
    const newOrigin = ray.origin.sub(this.center);
    const c =
      Math.pow(newOrigin.dot(ray.direction), 2) -
      newOrigin.dot(newOrigin) +
      Math.pow(this.radius, 2);
    return c >= 0;
  }
}
