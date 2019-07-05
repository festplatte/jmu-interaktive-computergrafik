import Vector from './vector.js';
import Matrix from './matrix.js';
import {
    GroupNode,
    SphereNode,
    TextureBoxNode
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
    const sg = new GroupNode(Matrix.translation(new Vector(0, 0, 0, 0)));
    const gn0 = new GroupNode(Matrix.rotation(new Vector(0, 0, 0, 0), 0));
    const gn1 = new GroupNode(Matrix.scaling(new Vector(.3, .3, .3)));
    gn0.add(gn1);
    const sphere = new SphereNode(
        new Vector(.5, -.8, -.3, 1),
        0.4,
        new Vector(.8, .4, .1, 1)
    );
    gn1.add(sphere);
    let gn2 = new GroupNode(Matrix.translation(new Vector(.3, 0, 0)));
    gn0.add(gn2);
    sg.add(gn0);
    const cube = new TextureBoxNode(
        new Vector(-.1, -.1, -.1, 1),
        new Vector(.5, .5, .5, 1),
        'hci-logo.png'
    );
    gn2.add(cube);

    // setup for rendering
    const setupVisitor = new RasterSetupVisitor(gl);
    setupVisitor.setup(sg);

    const visitor = new RasterVisitor(gl);

    let camera = {
        eye: new Vector(0, 0, 0, 1),
        center: new Vector(0, 0, 1, 1),
        up: new Vector(0, 1, 0, 0),
        fovy: 60,
        aspect: canvas.width / canvas.height,
        near: 0.1,
        far: 100
    };

    const phongShader = new Shader(gl,
        "phong-vertex-shader.glsl",
        "phong-fragment-shader.glsl"
    );
    visitor.shader = phongShader;
    const textureShader = new Shader(gl,
        "texture-vertex-shader.glsl",
        "texture-fragment-shader.glsl"
    );
    visitor.textureshader = textureShader;

    function animate(timestamp) {
        gn0.matrix = Matrix.rotation(new Vector(0, 0, 1, 0), timestamp / 1000);
        gn2.matrix = Matrix.rotation(new Vector(0, 1, 0, 0), timestamp / 1000);
        visitor.render(sg, camera);
        window.requestAnimationFrame(animate);
    }
    Promise.all(
        [phongShader.load(), textureShader.load()]
    ).then(x =>
        window.requestAnimationFrame(animate)
    );
});