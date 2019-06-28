/**
 * Class representing a Node in a Scenegraph
 */
class Node {
  /**
   * Accepts a visitor according to the visitor pattern
   * @param  {Visitor} visitor - The visitor
   */
  accept(visitor) {}
}

/**
 * Class representing a GroupNode in the Scenegraph.
 * A GroupNode holds a transformation and is able
 * to have child nodes attached to it.
 * @extends Node
 */
export class GroupNode extends Node {
  /**
   * Constructor
   * @param  {Matrix} mat - A matrix describing the node's transformation
   */
  constructor(mat) {
    super();
    this.matrix = mat;
    this.children = [];
  }

  /**
   * Accepts a visitor according to the visitor pattern
   * @param  {Visitor} visitor - The visitor
   */
  accept(visitor) {
    visitor.visitGroupNode(this);
  }

  /**
   * Adds a child node
   * @param {Node} childNode - The child node to add
   */
  add(childNode) {
    this.children.push(childNode);
  }
}

/**
 * Class representing a Sphere in the Scenegraph
 * @extends Node
 */
export class SphereNode extends Node {
  /**
   * Creates a new Sphere with center and radius
   * @param  {Vector} center - The center of the Sphere
   * @param  {number} radius - The radius of the Sphere
   * @param  {Vector} color  - The colour of the Sphere
   */
  constructor(center, radius, color) {
    super();
    this.center = center;
    this.radius = radius;
    this.color = color;
  }

  /**
   * Accepts a visitor according to the visitor pattern
   * @param  {Visitor} visitor - The visitor
   */
  accept(visitor) {
    visitor.visitSphereNode(this);
  }
}

/**
 * Class representing an Axis Aligned Box in the Scenegraph
 * @extends Node
 */
export class AABoxNode extends Node {
  /**
   * Creates an axis aligned box
   * @param  {Vector} minPoint - The minimum Point
   * @param  {Vector} maxPoint - The maximum Point
   * @param  {Vector} color    - The colour of the cube
   */
  constructor(minPoint, maxPoint, color) {
    super();
    this.minPoint = minPoint;
    this.maxPoint = maxPoint;
    this.color = color;
  }

  /**
   * Accepts a visitor according to the visitor pattern
   * @param  {Visitor} visitor - The visitor
   */
  accept(visitor) {
    visitor.visitAABoxNode(this);
  }
}

/**
 * Class representing a Textured Axis Aligned Box in the Scenegraph
 * @extends Node
 */
export class TextureBoxNode extends Node {
  /**
   * Creates an axis aligned box textured box
   * @param  {Vector} minPoint - The minimum Point
   * @param  {Vector} maxPoint - The maximum Point
   * @param  {string} texture  - The image filename for the texture
   */
  constructor(minPoint, maxPoint, texture) {
    super();
    this.minPoint = minPoint;
    this.maxPoint = maxPoint;
    this.texture = texture;
  }

  /**
   * Accepts a visitor according to the visitor pattern
   * @param  {Visitor} visitor - The visitor
   */
  accept(visitor) {
    visitor.visitTextureBoxNode(this);
  }
}
