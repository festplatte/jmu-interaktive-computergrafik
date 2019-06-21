import Vector from './vector.js';
import Matrix from './matrix.js';
import {
    GroupNode,
    SphereNode
} from './nodes.js';
import RayVisitor from './rayvisitor.js';

window.addEventListener('load', () => {
    const canvas = document.getElementById("raytracer");
    const ctx = canvas.getContext("2d");

    const sg = new GroupNode(Matrix.identity());
    const gn = new GroupNode(Matrix.identity());
    sg.add(gn);
    gn.add(new SphereNode(new Vector(.5, -.2, -2, 1), 0.4, new Vector(.3, 0, 0, 1)));
    gn.add(new SphereNode(new Vector(-.5, .2, -2.5, 1), 0.4, new Vector(0, 0, .3, 1)));
    const lightPositions = [
        new Vector(1, 1, -1, 1)
    ];
    const camera = {
        origin: new Vector(0, 0, 0, 1),
        width: canvas.width,
        height: canvas.height,
        alpha: Math.PI / 3
    }

    const visitor = new RayVisitor(ctx, canvas.width, canvas.height);

    let animationHandle;

    function animate(timestamp) {
        sg.matrix.setVal(1, 3, Math.sin(Math.PI * timestamp / 2000) * 0.3);
        sg.matrix.setVal(2, 3, Math.cos(Math.PI * timestamp / 2000) * 0.3);

        visitor.render(sg, camera, lightPositions);
        animationHandle = window.requestAnimationFrame(animate);
    }

    function startAnimation() {
        if (animationHandle) {
            window.cancelAnimationFrame(animationHandle);
        }
        animationHandle = window.requestAnimationFrame(animate);
    }
    startAnimation();

    document.getElementById("startAnimationBtn").addEventListener(
        "click", startAnimation);
    document.getElementById("stopAnimationBtn").addEventListener(
        "click", () => cancelAnimationFrame(animationHandle));
});