'use strict';
import Vector from "../src/vector.js";
import Ray from "../src/ray.js";
import Sphere from "../src/sphere.js";
import Intersection from '../src/intersection.js';

test("Sphere constructor should create a sphere object whose properties are the given arguments.", () => {
    const center = new Vector(.3, .2, .1, 1);
    const radius = 0.7;
    const color = new Vector(0, .3, 0, 1);
    const sphereA = new Sphere(center, radius, color);
    expect(sphereA.center).toBe(center);
    expect(sphereA.radius).toBe(radius);
    expect(sphereA.color).toBe(color);
});

test("Sphere intersect should return null or be otherwise falsy if the given ray does not intersect with the sphere.", () => {
    const sphereA = new Sphere(new Vector(0, 0, -1, 1), 0.4, new Vector(0, .3, 0, 1));
    const camera = {
        origin: new Vector(0, 0, 0, 1),
        width: 10,
        height: 10,
        alpha: Math.PI * 1 / 2
    }
    const ray = Ray.makeRay(0, 0, camera);
    const intersectionA = sphereA.intersect(ray);
    expect(intersectionA).toBeFalsy();
});

test("Sphere intersect should return something if the given ray intersects with the sphere.", () => {
    const sphereA = new Sphere(new Vector(0, 0, -1, 1), 0.4, new Vector(0, .3, 0, 1));
    const camera = {
        origin: new Vector(0, 0, 0, 1),
        width: 10,
        height: 10,
        alpha: Math.PI * 1 / 2
    }
    const ray = Ray.makeRay(4, 4, camera);
    const intersectionA = sphereA.intersect(ray);
    expect(intersectionA).toBeDefined();
    expect(intersectionA).not.toBeNull();
});

test("The intersection normal should be normalised.", () => {
    const sphereA = new Sphere(new Vector(0, 0, -1, 1), 0.4, new Vector(0, .3, 0, 1));
    const camera = {
        origin: new Vector(0, 0, 0, 1),
        width: 10,
        height: 10,
        alpha: Math.PI * 1 / 2
    }
    const ray = Ray.makeRay(4, 4, camera);
    const intersectionA = sphereA.intersect(ray);
    expect(intersectionA).toBeDefined();
    expect(intersectionA).toBeInstanceOf(Intersection);
    expect(intersectionA.normal.length).toBeCloseTo(1);
});

test("Sphere intersect should return the correctly calculated Intersection if the given ray intersects with the sphere.", () => {
    const sphereA = new Sphere(new Vector(0, 0, -1, 1), 0.4, new Vector(0, .3, 0, 1));
    const camera = {
        origin: new Vector(0, 0, 0, 1),
        width: 10,
        height: 10,
        alpha: Math.PI * 1 / 2
    }
    const ray = Ray.makeRay(4, 4, camera);
    const intersectionA = sphereA.intersect(ray);
    expect(intersectionA).toBeDefined();
    expect(intersectionA).toBeInstanceOf(Intersection);
    expect(intersectionA.t).toBeCloseTo(0.6154581291113435);
    expect(intersectionA.point.x).toBeCloseTo(-0.060939435434461744);
    expect(intersectionA.point.y).toBeCloseTo(0.060939435434461744);
    expect(intersectionA.point.z).toBeCloseTo(-0.6093943543446175);
    expect(intersectionA.point.w).toBeCloseTo(1);
    expect(intersectionA.normal.x).toBeCloseTo(-0.1523485885861543);
    expect(intersectionA.normal.y).toBeCloseTo(0.1523485885861543);
    expect(intersectionA.normal.z).toBeCloseTo(0.9765141141384559);
    expect(intersectionA.normal.w).toBeCloseTo(0);
});