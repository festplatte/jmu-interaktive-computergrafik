import Vector from "./vector.js";

/**
 * Class representing a 4x4 Matrix
 */
export default class Matrix {
  /**
   * Constructor of the matrix. Expects an array in row-major layout. Saves the data as column major internally.
   * @param  {Array.<number>} mat - Matrix values row major
   */
  constructor(mat) {
    this.data = new Float32Array(16);
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        this.data[row * 4 + col] = mat[col * 4 + row];
      }
    }
  }

  /**
   * Returns the value of the matrix at position row, col
   * @param  {number} row - The value's row
   * @param  {number} col - The value's column
   * @return {number}       The requested value
   */
  getVal(row, col) {
    return this.data[col * 4 + row];
  }

  /**
   * Sets the value of the matrix at position row, col
   * @param {number} row - The value's row
   * @param {number} val - The value to set to
   * @param {number} col - The value's column
   */
  setVal(row, col, val) {
    this.data[col * 4 + row] = val;
  }

  /**
   * Returns a matrix that represents a translation
   * @param  {Vector} translation - The translation vector that shall be expressed by the matrix
   * @return {Matrix}               The resulting translation matrix
   */
  static translation(translation) {
    const result = Matrix.identity();
    for (let i = 0; i < 4; i++) {
      result.setVal(i, 3, translation.valueOf()[i]);
    }
    return result;
  }

  /**
   * Returns a matrix that represents a rotation. The rotation axis is either the x, y or z axis (either x, y, z is 1).
   * @param  {Vector} axis  - The axis to rotate around
   * @param  {number} angle - The angle to rotate
   * @return {Matrix}         The resulting rotation matrix
   */
  static rotation(axis, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    if (axis.x) {
      return new Matrix([
        1,
        0,
        0,
        0,
        0,
        cos,
        -sin,
        0,
        0,
        sin,
        cos,
        0,
        0,
        0,
        0,
        1
      ]);
    }
    if (axis.y) {
      return new Matrix([
        cos,
        0,
        sin,
        0,
        0,
        1,
        0,
        0,
        -sin,
        0,
        cos,
        0,
        0,
        0,
        0,
        1
      ]);
    }
    if (axis.z) {
      return new Matrix([
        cos,
        -sin,
        0,
        0,
        sin,
        cos,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      ]);
    }
    return null;
  }

  /**
   * Returns a matrix that represents a scaling
   * @param  {Vector} scale - The amount to scale in each direction
   * @return {Matrix}         The resulting scaling matrix
   */
  static scaling(scale) {
    return new Matrix([
      scale.x,
      0,
      0,
      0,
      0,
      scale.y,
      0,
      0,
      0,
      0,
      scale.z,
      0,
      0,
      0,
      0,
      1
    ]);
  }

  /**
   * Constructs a lookat matrix
   * @param  {Vector} eye    - The position of the viewer
   * @param  {Vector} center - The position to look at
   * @param  {Vector} up     - The up direction
   * @return {Matrix}          The resulting lookat matrix
   */
  static lookat(eye, center, up) {
    // TODO [exercise 9]
  }

  /**
   * Constructs a new matrix that represents a projection normalisation transformation
   * @param  {number} left   - Camera-space left value of lower near point
   * @param  {number} right  - Camera-space right value of upper right far point
   * @param  {number} bottom - Camera-space bottom value of lower lower near point
   * @param  {number} top    - Camera-space top value of upper right far point
   * @param  {number} near   - Camera-space near value of lower lower near point
   * @param  {number} far    - Camera-space far value of upper right far point
   * @return {Matrix}          The rotation matrix
   */
  static frustum(left, right, bottom, top, near, far) {
    // TODO [exercise 10]
  }

  /**
   * Constructs a new matrix that represents a projection normalisation transformation.
   * @param  {number} fovy   - Field of view in y-direction
   * @param  {number} aspect - Aspect ratio between width and height
   * @param  {number} near   - Camera-space distance to near plane
   * @param  {number} far    - Camera-space distance to far plane
   * @return {Matrix}          The resulting matrix
   */
  static perspective(fovy, aspect, near, far) {
    // TODO [exercise 10]
  }

  /**
   * Returns the identity matrix
   * @return {Matrix} A new identity matrix
   */
  static identity() {
    return new Matrix([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }

  /**
   * Matrix multiplication
   * @param  {Matrix|Vector} other - The matrix or vector to multiplicate with
   * @return {Matrix|Vector}         The result of the multiplication this*other
   */
  mul(other) {
    if (other instanceof Matrix) {
      const outMatrix = Matrix.identity();
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          let cell = 0;
          for (let i = 0; i < 4; i++) {
            cell += this.getVal(row, i) * other.getVal(i, col);
          }
          outMatrix.setVal(row, col, cell);
        }
      }
      return outMatrix;
    } else {
      // other is vector
      const values = [];
      for (let row = 0; row < 4; row++) {
        let cell = 0;
        for (let i = 0; i < 4; i++) {
          cell += this.getVal(row, i) * other.valueOf()[i];
        }
        values.push(cell);
      }
      return new Vector(values[0], values[1], values[2], values[3]);
    }
  }

  /**
   * Returns the transpose of this matrix
   * @return {Matrix} A new matrix that is the transposed of this
   */
  transpose() {
    const result = Matrix.identity();
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        result.setVal(row, col, this.getVal(col, row));
      }
    }
    return result;
  }

  /**
   * Debug print to console
   */
  print() {
    for (let row = 0; row < 4; row++) {
      console.log(
        "> " +
          this.getVal(row, 0) +
          "\t" +
          this.getVal(row, 1) +
          "\t" +
          this.getVal(row, 2) +
          "\t" +
          this.getVal(row, 3)
      );
    }
  }

  /**
   * Returns a new matrix that is the inverse of this matrix
   * @return {Matrix} The inverse matrix
   */
  invert() {
    let mat = this.data;
    let dst = new Float32Array(16); //ret.getValues();
    let tmp = new Float32Array(12);

    /* temparray for pairs */
    let src = new Float32Array(16); //new float[16];

    /* array of transpose source matrix */
    let det;

    /* determinant */
    /*
     * transpose matrix
     */
    for (let i = 0; i < 4; i++) {
      src[i] = mat[i * 4];
      src[i + 4] = mat[i * 4 + 1];
      src[i + 8] = mat[i * 4 + 2];
      src[i + 12] = mat[i * 4 + 3];
    }

    /* calculate pairs for first 8 elements (cofactors) */
    tmp[0] = src[10] * src[15];
    tmp[1] = src[11] * src[14];
    tmp[2] = src[9] * src[15];
    tmp[3] = src[11] * src[13];
    tmp[4] = src[9] * src[14];
    tmp[5] = src[10] * src[13];
    tmp[6] = src[8] * src[15];
    tmp[7] = src[11] * src[12];
    tmp[8] = src[8] * src[14];
    tmp[9] = src[10] * src[12];
    tmp[10] = src[8] * src[13];
    tmp[11] = src[9] * src[12];

    /* calculate first 8 elements (cofactors) */
    dst[0] = tmp[0] * src[5] + tmp[3] * src[6] + tmp[4] * src[7];
    dst[0] -= tmp[1] * src[5] + tmp[2] * src[6] + tmp[5] * src[7];
    dst[1] = tmp[1] * src[4] + tmp[6] * src[6] + tmp[9] * src[7];
    dst[1] -= tmp[0] * src[4] + tmp[7] * src[6] + tmp[8] * src[7];
    dst[2] = tmp[2] * src[4] + tmp[7] * src[5] + tmp[10] * src[7];
    dst[2] -= tmp[3] * src[4] + tmp[6] * src[5] + tmp[11] * src[7];
    dst[3] = tmp[5] * src[4] + tmp[8] * src[5] + tmp[11] * src[6];
    dst[3] -= tmp[4] * src[4] + tmp[9] * src[5] + tmp[10] * src[6];
    dst[4] = tmp[1] * src[1] + tmp[2] * src[2] + tmp[5] * src[3];
    dst[4] -= tmp[0] * src[1] + tmp[3] * src[2] + tmp[4] * src[3];
    dst[5] = tmp[0] * src[0] + tmp[7] * src[2] + tmp[8] * src[3];
    dst[5] -= tmp[1] * src[0] + tmp[6] * src[2] + tmp[9] * src[3];
    dst[6] = tmp[3] * src[0] + tmp[6] * src[1] + tmp[11] * src[3];
    dst[6] -= tmp[2] * src[0] + tmp[7] * src[1] + tmp[10] * src[3];
    dst[7] = tmp[4] * src[0] + tmp[9] * src[1] + tmp[10] * src[2];
    dst[7] -= tmp[5] * src[0] + tmp[8] * src[1] + tmp[11] * src[2];

    /* calculate pairs for second 8 elements (cofactors) */
    tmp[0] = src[2] * src[7];
    tmp[1] = src[3] * src[6];
    tmp[2] = src[1] * src[7];
    tmp[3] = src[3] * src[5];
    tmp[4] = src[1] * src[6];
    tmp[5] = src[2] * src[5];
    tmp[6] = src[0] * src[7];
    tmp[7] = src[3] * src[4];
    tmp[8] = src[0] * src[6];
    tmp[9] = src[2] * src[4];
    tmp[10] = src[0] * src[5];
    tmp[11] = src[1] * src[4];

    /* calculate second 8 elements (cofactors) */
    dst[8] = tmp[0] * src[13] + tmp[3] * src[14] + tmp[4] * src[15];
    dst[8] -= tmp[1] * src[13] + tmp[2] * src[14] + tmp[5] * src[15];
    dst[9] = tmp[1] * src[12] + tmp[6] * src[14] + tmp[9] * src[15];
    dst[9] -= tmp[0] * src[12] + tmp[7] * src[14] + tmp[8] * src[15];
    dst[10] = tmp[2] * src[12] + tmp[7] * src[13] + tmp[10] * src[15];
    dst[10] -= tmp[3] * src[12] + tmp[6] * src[13] + tmp[11] * src[15];
    dst[11] = tmp[5] * src[12] + tmp[8] * src[13] + tmp[11] * src[14];
    dst[11] -= tmp[4] * src[12] + tmp[9] * src[13] + tmp[10] * src[14];
    dst[12] = tmp[2] * src[10] + tmp[5] * src[11] + tmp[1] * src[9];
    dst[12] -= tmp[4] * src[11] + tmp[0] * src[9] + tmp[3] * src[10];
    dst[13] = tmp[8] * src[11] + tmp[0] * src[8] + tmp[7] * src[10];
    dst[13] -= tmp[6] * src[10] + tmp[9] * src[11] + tmp[1] * src[8];
    dst[14] = tmp[6] * src[9] + tmp[11] * src[11] + tmp[3] * src[8];
    dst[14] -= tmp[10] * src[11] + tmp[2] * src[8] + tmp[7] * src[9];
    dst[15] = tmp[10] * src[10] + tmp[4] * src[8] + tmp[9] * src[9];
    dst[15] -= tmp[8] * src[9] + tmp[11] * src[10] + tmp[5] * src[8];

    /* calculate determinant */
    det = src[0] * dst[0] + src[1] * dst[1] + src[2] * dst[2] + src[3] * dst[3];

    if (det == 0.0) {
      throw new Error("singular matrix is not invertible");
    }

    /* calculate matrix inverse */
    det = 1 / det;

    for (let j = 0; j < 16; j++) {
      dst[j] *= det;
    }

    let ret = Matrix.identity();
    ret.data = dst;
    return ret;
  }
}
