/**
 * Class representing a vector in 4D space
 */
export default class Vector {
  /**
   * Create a vector
   * @param  {number} x - The x component
   * @param  {number} y - The y component
   * @param  {number} z - The z component
   * @param  {number} w - The w component
   */
  constructor(x, y, z, w) {
    // TODO [exercise 4]
  }

  /**
   * Returns the x component of the vector
   * @return {number} The x component of the vector
   */
  get x() {
    // TODO [exercise 4]
  }

  /**
   * Sets the x component of the vector to val
   * @param  {number} val - The new value
   */
  set x(val) {
    // TODO [exercise 4]
  }

  /**
   * Returns the first component of the vector
   * @return {number} The first component of the vector
   */
  get r() {
    // TODO [exercise 5]
  }

  /**
   * Sets the first component of the vector to val
   * @param  {number} val - The new value
   */
  set r(val) {
    // TODO [exercise 5]
  }

  /**
   * Returns the y component of the vector
   * @return {number} The y component of the vector
   */
  get y() {
    // TODO [exercise 4]
  }

  /**
   * Sets the y component of the vector to val
   * @param  {number} val - The new value
   */
  set y(val) {
    // TODO [exercise 4]
  }

  /**
   * Returns the second component of the vector
   * @return {number} The second component of the vector
   */
  get g() {
    // TODO [exercise 5]
  }

  /**
   * Sets the second component of the vector to val
   * @param  {number} val - The new value
   */
  set g(val) {
    // TODO [exercise 5]
  }

  /**
   * Returns the z component of the vector
   * @return {number} The z component of the vector
   */
  get z() {
    // TODO [exercise 4]
  }

  /**
   * Sets the z component of the vector to val
   * @param  {number} val - The new value
   */
  set z(val) {
    // TODO [exercise 4]
  }

  /**
   * Returns the third component of the vector
   * @return {number} The third component of the vector
   */
  get b() {
    // TODO [exercise 5]
  }

  /**
   * Sets the third component of the vector to val
   * @param  {number} val - The new value
   */
  set b(val) {
    // TODO [exercise 5]
  }

  /**
   * Returns the w component of the vector
   * @return {number} The w component of the vector
   */
  get w() {
    // TODO [exercise 4]
  }

  /**
   * Sets the w component of the vector to val
   * @param  {number} val - The new value
   */
  set w(val) {
    // TODO [exercise 4]
  }

  /**
   * Returns the fourth component of the vector
   * @return {number} The fourth component of the vector
   */
  get a() {
    // TODO [exercise 5]
  }

  /**
   * Sets the fourth component of the vector to val
   * @param  {number} val - The new value
   */
  set a(val) {
    // TODO [exercise 5]
  }

  /**
   * Creates a new vector with the vector added
   * @param {Vector} other - The vector to add
   * @return {Vector}        The new vector;
   */
  add(other) {
    // TODO [exercise 4]
  }

  /**
   * Creates a new vector with the vector subtracted
   * @param {Vector} other - The vector to subtract
   * @return {Vector}        The new vector
   */
  sub(other) {
    // TODO [exercise 4]
  }

  /**
   * Creates a new vector with the scalar multiplied
   * @param {number} other - The scalar to multiply
   * @return {Vector}        The new vector
   */
  mul(other) {
    // TODO [exercise 4]
  }

  /**
   * Creates a new vector with the scalar divided
   * @param {number} other - The scalar to divide
   * @return {Vector}        The new vector
   */
  div(other) {
    // TODO [exercise 4]
  }

  /**
   * Dot product
   * @param {Vector} other - The vector to calculate the dot product with
   * @return {number}        The result of the dot product
   */
  dot(other) {
    // TODO [exercise 4]
  }

  /**
   * Cross product
   * Calculates the cross product using the first three components
   * @param {Vector} other - The vector to calculate the cross product with
   * @return {Vector}        The result of the cross product as new Vector
   */
  cross(other) {
    // TODO [exercise 4]
  }

  /**
   * Returns an array representation of the vector
   * @return {Array.<number>} An array representation.
   */
  valueOf() {
    // TODO [exercise 4]
  }

  /**
   * Creates a new vector by normalising the vector
   * @return {Vector} A vector with length 1
   */
  normalised() {
    // TODO [exercise 4]
  }

  /**
   * Compares the vector to another
   * @param  {Vector} other - The vector to compare to.
   * @return {Boolean}        True if the vectors carry equal numbers. The fourth element may be both equivalent to undefined to still return true.
   */
  equals(other) {
    // TODO [exercise 4]
  }

  /**
   * Calculates the length of the vector
   * @return {number} The length of the vector
   */
  get length() {
    // TODO [exercise 4]
  }
}