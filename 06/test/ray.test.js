'use strict';
import Vector from "../src/vector.js";
import Ray from "../src/ray.js";

test("Ray constructor should create a ray object whose properties are the given arguments.", () => {
    const origin = new Vector(0, 0, 0, 0);
    const direction = new Vector(0, 0, -1, 0);
    const rayA = new Ray(origin, direction);
    expect(rayA.origin).toBe(origin);
    expect(rayA.direction).toBe(direction);
});

test("The ray direction should be normalised.", () => {
    const camera = {
        origin: new Vector(1, 2, 3, 1),
        width: 10,
        height: 10,
        alpha: Math.PI * 1 / 2
    }
    const rayA = Ray.makeRay(0, 0, camera);
    expect(rayA).toBeDefined();
    expect(rayA).toBeInstanceOf(Ray);
    expect(rayA.direction.length).toBeCloseTo(1);
});

test("Ray makeRay should create a ray object with the origin from the camera and a correctly calculated direction for the top left pixel.", () => {
    const camera = {
        origin: new Vector(1, 2, 3, 1),
        width: 10,
        height: 10,
        alpha: Math.PI * 1 / 2
    }
    const rayA = Ray.makeRay(0, 0, camera);
    expect(rayA).toBeDefined();
    expect(rayA).toBeInstanceOf(Ray);
    expect(rayA.origin).toEqual(camera.origin);
    expect(rayA.direction.x).toBeCloseTo(-0.5560218568936939);
    expect(rayA.direction.y).toBeCloseTo(0.5560218568936939);
    expect(rayA.direction.z).toBeCloseTo(-0.6178020632152156);
});

test("Ray makeRay should create a ray object with the origin from the camera and a correctly calculated direction for the pixel at 5/6.", () => {
    const camera = {
        origin: new Vector(1, 2, 3, 1),
        width: 10,
        height: 10,
        alpha: Math.PI * 1 / 2
    }
    const rayA = Ray.makeRay(5, 6, camera);
    expect(rayA).toBeDefined();
    expect(rayA).toBeInstanceOf(Ray);
    expect(rayA.origin).toEqual(camera.origin);
    expect(rayA.direction.x).toBeCloseTo(0.09901475429766741);
    expect(rayA.direction.y).toBeCloseTo(-0.28603877677367767);
    expect(rayA.direction.z).toBeCloseTo(-0.9534625892455924);
});