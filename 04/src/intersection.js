/**
 * Class representing a ray-sphere intersection in 3D space
 */
export default class Intersection {
  /**
   * Create an Intersection
   * @param {number} t      - The distance on the ray
   * @param {Vector} point  - The intersection points
   * @param {Vector} normal - The normal in the intersection
   */
  constructor(t, point, normal) {
    if (t) {
      this.t = t;
    } else {
      this.t = Infinity;
    }
    this.point = point;
    this.normal = normal;
  }

  /**
   * Determines whether this intersection
   * is closer than the other
   * @param  {Intersection} other - The other Intersection
   * @return {Boolean}              The result
   */
  closerThan(other) {
    if (this.t < other.t) return true;
    else return false;
  }
}