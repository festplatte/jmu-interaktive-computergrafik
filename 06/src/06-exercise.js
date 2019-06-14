import Intersection from './intersection.js';
import Ray from './ray.js';
import phong from './phong.js';
import Sphere from './sphere.js';
import Vector from './vector.js';
import Matrix from './matrix.js';

window.addEventListener('load', () => {
    const canvas = document.getElementById("raytracer");
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const objects = [
        new Sphere(new Vector(.5, -.2, -2, 1), 0.4, new Vector(.3, 0, 0, 1)),
        new Sphere(new Vector(-.5, -.2, -1.5, 1), 0.4, new Vector(0, 0, .3, 1))
    ];
    const lightPositions = [
        new Vector(1, 1, -1, 1)
    ];
    const shininess = 10;
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

    let rotation = Matrix.identity();
    let translation = Matrix.identity();
    let scale = Matrix.identity();

    function animate() {
        data.fill(0);
        let manipulatedObjects = [];
        for (let obj of objects) {
            manipulatedObjects.push(
                new Sphere(
                    rotation.mul(scale).mul(translation).mul(obj.center),
                    obj.radius, obj.color
                )
            );
        }
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                const ray = Ray.makeRay(x, y, camera);
                let minIntersection = new Intersection();
                let minObj = null;
                for (let shape of manipulatedObjects) {
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
                        const color = phong(minObj.color, minIntersection, lightPositions, shininess, camera.origin);
                        setPixel(x, y, color);
                    }

                }
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }
    window.requestAnimationFrame(animate);

    document.getElementById("userotation").onchange = function () {
        let range = document.getElementById("rotation");
        if (this.checked) {
            range.oninput = function () {
                rotation = Matrix.rotation(new Vector(0, 0, 1, 0), this.value);
                window.requestAnimationFrame(animate);
            }
            range.disabled = false;
            range.oninput();
        } else {
            range.disabled = true;
            rotation = Matrix.identity();
        }
        window.requestAnimationFrame(animate);
    }

    document.getElementById("usetranslation").onchange = function () {
        let range = document.getElementById("translation");
        if (this.checked) {
            range.oninput = function () {
                translation = Matrix.translation(new Vector(this.value, 0, 0, 0));
                window.requestAnimationFrame(animate);
            }
            range.disabled = false;
            range.oninput();
        } else {
            range.disabled = true;
            translation = Matrix.identity();
        }
        window.requestAnimationFrame(animate);
    }

    document.getElementById("usescale").onchange = function () {
        let range = document.getElementById("scale");
        if (this.checked) {
            range.oninput = function () {
                scale = Matrix.scaling(new Vector(this.value, this.value, this.value, 0));
                window.requestAnimationFrame(animate);
            }
            range.disabled = false;
            range.oninput();
        } else {
            range.disabled = true;
            scale = Matrix.identity();
        }
        window.requestAnimationFrame(animate);
    }

    const sliders = ["rotation", "translation", "scale"];
    for (let t of sliders) {
        const elem = document.getElementById("use" + t);
        if (elem.checked) {
            elem.onchange();
        }
    }
});