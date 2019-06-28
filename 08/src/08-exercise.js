import Vector from './vector.js';
import Matrix from './matrix.js';
import {
    GroupNode,
    SphereNode,
    AABoxNode
} from './nodes.js';
import {
    RasterVisitor,
    RasterSetupVisitor
} from './rastervisitor.js';
import Shader from './shader.js';

window.addEventListener('load', () => {
    const canvas = document.getElementById("rasteriser");
    const gl = canvas.getContext("webgl");

    // construct scene graph
    const sg = new GroupNode(Matrix.scaling(new Vector(0.2, 0.2, 0.2)));
    const gn1 = new GroupNode(Matrix.translation(new Vector(2, 2, 0)));
    sg.add(gn1);
    const sphere1 = new SphereNode(new Vector(0, -0.2, 0, 1), 0.8, new Vector(.8, .4, .1, 1))
    gn1.add(sphere1);
    const gn2 = new GroupNode(Matrix.translation(new Vector(-.7, -0.4, 0)));
    sg.add(gn2);
    const cube = new AABoxNode(
        new Vector(-1, -1, -1, 1),
        new Vector(1, 1, 1, 1),
        new Vector(1, 0, 0, 1)
    );
    gn2.add(cube);

    // setup for rendering
    const setupVisitor = new RasterSetupVisitor(gl);
    setupVisitor.setup(sg);

    const shader = new Shader(gl,
        "basic-vertex-shader.glsl",
        "basic-fragment-shader.glsl"
    );
    // render
    const visitor = new RasterVisitor(gl);
    visitor.shader = shader;
    shader.load().then(x => visitor.render(sg));
});