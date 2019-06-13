import Vector from './vector.js';
import Sphere from './sphere.js';
import Ray from './ray.js';
import Intersection from './intersection.js';
import phong from './phong.js';

window.addEventListener('load', () => {
    const canvas = document.getElementById("raytracer");
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const objects = [
        new Sphere(new Vector(.5, -.2, -2, 1), 0.4, new Vector(.3, 0, 0, 1)),
        new Sphere(new Vector(-.5, -.2, -1.7, 1), 0.2, new Vector(0, 0, .3, 1))
    ];
    const lightPositions = [
        new Vector(1, 1, -1, 1)
    ];
    let shininess = 10;
    const camera = {
        origin: new Vector(0, 0, 0, 1),
        width: canvas.width,
        height: canvas.height,
        alpha: Math.PI / 3
    }

    function setPixel(x, y, color) {
        data[4 * (canvas.width * y + x) + 0] = Math.min(255, color.r * 255);
        data[4 * (canvas.width * y + x) + 1] = Math.min(255, color.g * 255);
        data[4 * (canvas.width * y + x) + 2] = Math.min(255, color.b * 255);
        data[4 * (canvas.width * y + x) + 3] = Math.min(255, color.a * 255);
    }

    function animate() {
        data.fill(0);
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                const ray = Ray.makeRay(x, y, camera);
                let minIntersection = new Intersection();
                let minObj = null;
                for (let shape of objects) {
                    const intersection = shape.intersect(ray);
                    if (intersection && intersection.closerThan(minIntersection)) {
                        minIntersection = intersection;
                        minObj = shape;
                    }
                }
                if (minObj) {
                    if (!minObj.color) {
                        setPixel(x, y, new Vector(0, 0, 0, 1));
                    } else {
                        let color = phong(
                            Object.assign(Object.create(Vector.prototype), minObj.color),
                            minIntersection, lightPositions, shininess, camera.origin);
                        setPixel(x, y, color);
                    }

                }
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    const shininessElement = document.getElementById("shininess");
    shininessElement.onchange = function () {
        shininess = shininessElement.value;
        window.requestAnimationFrame(animate);
    }
    shininess = shininessElement.value;

    window.requestAnimationFrame(animate);
});