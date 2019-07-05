// Refer to https://developer.mozilla.org/de/docs/Web/API/WebGL_API/Tutorial/Hinzuf%C3%BCgen_von_2D_Inhalten_in_einen_WebGL-Kontext
/**
 * Class to assemble a Shader to use with WebGL
 */
export default class Shader {
  /**
   * Creates a shader
   * @param {WebGLContext} gl   - The 3D context
   * @param {string} vsId - The id of the vertex shader script node
   * @param {string} fsId - The id of the fragment shader script node
   */
  constructor(gl, vsId, fsId) {
    this.vsFilename = vsId;
    this.fsFilename = fsId;

    this.gl = gl;
  }

  async load() {
    let gl = this.gl;
    const vertexShader = this.getShader(gl, this.vsFilename, gl.VERTEX_SHADER);
    const fragmentShader = this.getShader(gl, this.fsFilename, gl.FRAGMENT_SHADER);

    return Promise.all([vertexShader, fragmentShader]).then(shaderParts => {
      // Create the shader program
      this.shaderProgram = gl.createProgram();
      gl.attachShader(this.shaderProgram, shaderParts[0]);
      gl.attachShader(this.shaderProgram, shaderParts[1]);
      gl.linkProgram(this.shaderProgram);

      // If creating the shader program failed, alert
      if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(shader));
      }
    });
  }

  /**
   * Use this shader program for the next
   * WebGL calls
   */
  use() {
    this.gl.useProgram(this.shaderProgram);
  }

  /**
   * Returns the attribute location of a variable in the shader program
   * @param  {string} name - The name of the variable
   * @return {number}        The variable's location
   */
  getAttributeLocation(name) {
    const attr = this.gl.getAttribLocation(this.shaderProgram, name);
    if (attr != -1) {
      this.gl.enableVertexAttribArray(attr);
    }
    return attr;
  }

  /**
   * Loads a shader part from its script DOM node and compiles it
   * @param  {WebGLContext} gl - The 3D context
   * @param  {string} id - The id of the shader script node
   * @return {Object}      The resulting shader part
   */
  async getShader(gl, filename, type) {
    const source = fetch(filename).then(response => response.text());

    return source.then(s => {
      const shader = gl.createShader(type);
      // Send the source to the shader object
      gl.shaderSource(shader, s);
      // Compile the shader program
      gl.compileShader(shader);

      // See if it compiled successfully
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    });
  }

  /**
   * Returns an object that can be used to set a matrix on the GPU
   * @param  {string} name   - The name of the uniform to set
   * @return {UniformMatrix}   The resulting object
   */
  getUniformMatrix(name) {
    return new UniformMatrix(this.gl,
      this.gl.getUniformLocation(this.shaderProgram, name)
    );
  }

  /**
   * Returns an object that can be used to set a vector on the GPU
   * @param  {string} name - The name of the uniform to set
   * @return {UniformVec3}   The resulting object
   */
  getUniformVec3(name) {
    return new UniformVec3(this.gl,
      this.gl.getUniformLocation(this.shaderProgram, name)
    );
  }

  /**
   * Returns an object that can be used to set an int on the GPU
   * @param  {string} name - The name of the uniform to set
   * @return {UniformInt}    The resulting object
   */
  getUniformFloat(name) {
    return new UniformFloat(this.gl,
      this.gl.getUniformLocation(this.shaderProgram, name)
    );
  }

  /**
   * Returns an object that can be used to set an int on the GPU
   * @param  {string} name - The name of the uniform to set
   * @return {UniformInt}    The resulting object
   */
  getUniformInt(name) {
    return new UniformInt(this.gl,
      this.gl.getUniformLocation(this.shaderProgram, name)
    );
  }
}

/**
 * Handler class to set uniform matrices
 * in the shader program
 */
class UniformMatrix {
  constructor(gl, position) {
    this.gl = gl;
    this.position = position;
  }

  /**
   * Sends the given matrix to the GPU
   * @param {Matrix} matrix - The matrix to send
   */
  set(matrix) {
    this.gl.uniformMatrix4fv(
      this.position,
      false,
      matrix.data);
  }
}

/**
 * Handler class to set uniform vectors
 * in the shader program
 */
class UniformVec3 {
  constructor(gl, position) {
    this.gl = gl;
    this.position = position;
  }

  /**
   * Sends the given vector to the GPU as 3dimensional vector
   * @param {Vector} vec - The vector to send
   */
  set(vec) {
    this.gl.uniform3f(
      this.position, vec.x, vec.y, vec.z
    );
  }
}

/**
 * Handler class to set uniform floats
 * in the shader program
 */
class UniformFloat {
  constructor(gl, position) {
    this.gl = gl;
    this.position = position;
  }

  /**
   * Sends the given float value to the GPU
   * @param {number} value - The float value to send
   */
  set(value) {
    this.gl.uniform1f(this.position, value);
  }
}

/**
 * Handler class to set uniform ints
 * in the shader program
 */
class UniformInt {
  constructor(gl, position) {
    this.gl = gl;
    this.position = position;
  }

  /**
   * Sends the given int value to the GPU
   * @param {number} value - The int value to send
   */
  set(value) {
    this.gl.uniform1i(this.position, value);
  }
}