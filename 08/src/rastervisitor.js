import RasterSphere from './raster-sphere.js';
import RasterBox from './raster-box.js';
import RasterTextureBox from './raster-texture-box.js';
import Vector from './vector.js';
import Matrix from './matrix.js';

/**
 * Class representing a Visitor that uses Rasterisation to render a Scenegraph
 */
export class RasterVisitor {
  /**
   * Creates a new RasterVisitor
   * @param {WebGLContext} context - The 3D context to render to
   */
  constructor(context) {
    this.gl = context;
    // TODO  [exercise 8] setup
  }

  /**
   * Renders the Scenegraph
   * @param  {Node} rootNode                 - The root node of the Scenegraph
   * @param  {Object} camera                 - The camera used
   * @param  {Array.<Vector>} lightPositions - The light light positions
   */
  render(rootNode, camera, lightPositions) {
    // clear
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.setupCamera(camera);

    // traverse and render
    rootNode.accept(this);
  }

  /**
   * Helper function to setup camera matrices
   * @param  {Object} camera - The camera used
   */
  setupCamera(camera) {
    if (camera) {
      this.lookat = Matrix.lookat(
        camera.eye,
        camera.center,
        camera.up);

      this.perspective = Matrix.perspective(
        camera.fovy,
        camera.aspect,
        camera.near,
        camera.far
      );

    }
  }

  /**
   * Visits a group node
   * @param  {GroupNode} node - The node to visit
   */
  visitGroupNode(node) {
    // TODO [exercise 8]
  }

  /**
   * Visits a sphere node
   * @param  {SphereNode} node - The node to visit
   */
  visitSphereNode(node) {
    let shader = this.shader;
    shader.use();
    let mat = Matrix.identity();
    // TODO [exercise 8] Calculate the model matrix for the sphere
    shader.getUniformMatrix("M").set(mat);

    let V = shader.getUniformMatrix("V");
    if (V && this.lookat) {
      V.set(this.lookat);
    }
    let P = shader.getUniformMatrix("P");
    if (P && this.perspective) {
      P.set(this.perspective);
    }
    // TODO [exercise 9] set the normal matrix

    node.rastersphere.render(shader);
  }

  /**
   * Visits an axis aligned box node
   * @param  {AABoxNode} node - The node to visit
   */
  visitAABoxNode(node) {
    this.shader.use();
    let shader = this.shader;
    let mat = Matrix.identity();
    // TODO  [exercise 8] Calculate the model matrix for the sphere
    shader.getUniformMatrix("M").set(mat);
    let V = shader.getUniformMatrix("V");
    if (V && this.lookat) {
      V.set(this.lookat);
    }
    let P = shader.getUniformMatrix("P");
    if (P && this.perspective) {
      P.set(this.perspective);
    }

    node.rasterbox.render(this.shader);
  }

  /**
   * Visits a textured box node
   * @param  {TextureBoxNode} node - The node to visit
   */
  visitTextureBoxNode(node) {
    this.textureshader.use();
    let shader = this.textureshader;

    let mat = Matrix.identity();
    // TODO [exercise 8] calculate the model matrix for the box
    shader.getUniformMatrix("M").set(mat);
    let P = shader.getUniformMatrix("P");
    if (P && this.perspective) {
      P.set(this.perspective);
    }
    shader.getUniformMatrix("V").set(this.lookat);

    node.rastertexturebox.render(shader);
  }
}

/** 
 * Class representing a Visitor that sets up buffers 
 * for use by the RasterVisitor 
 * */
export class RasterSetupVisitor {
  /**
   * Creates a new RasterSetupVisitor
   * @param {WebGLContext} context - The 3D context in which to create buffers
   */
  constructor(context) {
    this.gl = context;
  }

  /**
   * Sets up all needed buffers
   * @param  {Node} rootNode - The root node of the Scenegraph
   */
  setup(rootNode) {
    // Clear to white, fully opaque
    this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
    // Clear everything
    this.gl.clearDepth(1.0);
    // Enable depth testing
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);

    rootNode.accept(this);
  }

  /**
   * Visits a group node
   * @param  {GroupNode} node - The node to visit
   */
  visitGroupNode(node) {
    for (let child of node.children) {
      child.accept(this);
    }
  }

  /**
   * Visits a sphere node
   * @param  {SphereNode} node - The node to visit
   */
  visitSphereNode(node) {
    node.rastersphere = new RasterSphere(this.gl, node.center, node.radius, node.color);
  }

  /**
   * Visits an axis aligned box node
   * @param  {AABoxNode} node - The node to visit
   */
  visitAABoxNode(node) {
    node.rasterbox = new RasterBox(this.gl, node.minPoint, node.maxPoint);
  }

  /**
   * Visits a textured box node. Loads the texture
   * and creates a uv coordinate buffer
   * @param  {TextureBoxNode} node - The node to visit
   */
  visitTextureBoxNode(node) {
    node.rastertexturebox = new RasterTextureBox(this.gl, node.minPoint, node.maxPoint, node.texture);
  }
}