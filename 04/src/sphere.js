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
    const t = this.center.sub(ray.origin).dot(ray.direction);
    const vecT = ray.origin.add(ray.direction.mul(t));
    const y = this.center.sub(vecT).length;
    if (y > this.radius) {
      return false;
    }
    return true;
  }
}
