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
    const pT = ray.origin.add(ray.direction.mul(t));
    const y = this.center.sub(pT).length;
    if (y > this.radius) {
      return null;
    }
    const x = Math.sqrt(Math.pow(this.radius, 2) - Math.pow(y, 2));
    const tIntersect = t - x;
    const pIntersect = ray.origin.add(ray.direction.mul(tIntersect));
    return new Intersection(
      tIntersect,
      pIntersect,
      pIntersect.sub(this.center).normalised()
    );
  }
}
