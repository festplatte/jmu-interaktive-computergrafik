'use strict';
import Vector from "../src/vector.js";

test("Vector constructor should create a 4x1 vector object whose valueOf array is filled with the x,y,z,w values.", () => {
    const vecA = new Vector(1, 2, 3, 0);
    const vecB = new Vector(0.1, 0.2, 0.3, 1.0);
    expect(vecA.valueOf()).toBeDefined();
    expect(vecA).toBeInstanceOf(Vector);
    expect(vecA.x).toBe(1);
    expect(vecA.y).toBe(2);
    expect(vecA.z).toBe(3);
    expect(vecA.w).toBe(0);
    expect(vecB.valueOf()).toBeDefined();
    expect(vecB).toBeInstanceOf(Vector);
    expect(vecB.x).toBeCloseTo(0.1, 5);
    expect(vecB.y).toBeCloseTo(0.2, 5);
    expect(vecB.z).toBeCloseTo(0.3, 5);
    expect(vecB.w).toBeCloseTo(1.0, 5);
});

test("Vector should have a x() getter to get the x value of the position or direction vector.", () => {
    const vecA = new Vector(1, 2, 3, 0);
    expect(vecA.x).toBeDefined();
    expect(vecA.x).toBe(1);
});

test("Vector should have a y() getter to get the y value of the position or direction vector.", () => {
    const vecA = new Vector(1, 2, 3, 0);
    expect(vecA.y).toBeDefined();
    expect(vecA.y).toBe(2);
});

test("Vector should have a z() getter to get the z value of the position or direction vector.", () => {
    const vecA = new Vector(1, 2, 3, 0);
    expect(vecA.z).toBeDefined();
    expect(vecA.z).toBe(3);
});

test("Vector should have a w() getter to get the w value of the position or direction vector.", () => {
    const vecA = new Vector(1, 2, 3, 0);
    expect(vecA.w).toBeDefined();
    expect(vecA.w).toBe(0);
});

test("Vector should have a r() getter to get the r value of the color vector.", () => {
    const color = new Vector(0.25, 0.5, 0.75, 1.0);
    expect(color.r).toBeDefined();
    expect(color.r).toBeCloseTo(0.25, 5);
});

test("Vector should have a g() getter to get the g value of the color vector.", () => {
    const color = new Vector(0.25, 0.5, 0.75, 1.0);
    expect(color.g).toBeDefined();
    expect(color.g).toBeCloseTo(0.5, 5);
});

test("Vector should have a b() getter to get the b value of the color vector.", () => {
    const color = new Vector(0.25, 0.5, 0.75, 1.0);
    expect(color.b).toBeDefined();
    expect(color.b).toBeCloseTo(0.75, 5);
});

test("Vector should have a a() getter to get the a value of the color vector.", () => {
    const color = new Vector(0.25, 0.5, 0.75, 1.0);
    expect(color.a).toBeDefined();
    expect(color.a).toBeCloseTo(1.0, 5);
});

test("Vector should have a x(val) setter to set the x value of the position or direction vector.", () => {
    const vecA = new Vector(1, 2, 3, 0);
    expect(vecA.x).toBe(1);
    vecA.x = 4;
    expect(vecA.x).toBe(4);
});

test("Vector should have a y(val) setter to set the y value of the position or direction vector.", () => {
    const vecA = new Vector(1, 2, 3, 0);
    expect(vecA.y).toBe(2);
    vecA.y = 5;
    expect(vecA.y).toBe(5);
});

test("Vector should have a z(val) setter to set the z value of the position or direction vector.", () => {
    const vecA = new Vector(1, 2, 3, 0);
    expect(vecA.z).toBe(3);
    vecA.z = 6;
    expect(vecA.z).toBe(6);
});

test("Vector should have a w(val) setter to set the w value of the position or direction vector.", () => {
    const vecA = new Vector(1, 2, 3, 0);
    expect(vecA.w).toBe(0);
    vecA.w = 1;
    expect(vecA.w).toBe(1);
});

test("Vector should have a r(val) setter to set the r value of the color vector.", () => {
    const color = new Vector(0.25, 0.5, 0.75, 1.0);
    expect(color.r).toBeCloseTo(0.25, 5);
    color.r = 0.75;
    expect(color.r).toBeCloseTo(0.75, 5);
});

test("Vector should have a g(val) setter to set the g value of the color vector.", () => {
    const color = new Vector(0.25, 0.5, 0.75, 1.0);
    expect(color.g).toBeCloseTo(0.5, 5);
    color.g = 1.0;
    expect(color.g).toBeCloseTo(1.0, 5);
});

test("Vector should have a b(val) setter to set the b value of the color vector.", () => {
    const color = new Vector(0.25, 0.5, 0.75, 1.0);
    expect(color.b).toBeCloseTo(0.75, 5);
    color.b = 0.25;
    expect(color.b).toBeCloseTo(0.25, 5);
});

test("Vector should have an a(val) setter to set the a value of the color vector.", () => {
    const color = new Vector(0.25, 0.5, 0.75, 1.0);
    expect(color.a).toBeCloseTo(1.0, 5);
    color.a = 0.0;
    expect(color.a).toBeCloseTo(0.0, 5);
});

test("Vector should have a valueOf() method which returns an array representation of the vector.", () => {
    const vecA = new Vector(1.0, 2.0, 3.0, 0.0);
    const arrayA = vecA.valueOf();
    expect(arrayA).toBeDefined();
    expect(arrayA).toBeInstanceOf(Array);
    expect(arrayA[0]).toBe(1.0);
    expect(arrayA[1]).toBe(2.0);
    expect(arrayA[2]).toBe(3.0);
    expect(arrayA[3]).toBe(0.0);
});

test("Vector should have an equals(other) method which compares two vectors.", () => {
    let vecA = new Vector(1.0, 2.0, 3.0, 0.0);
    let vecB = new Vector(4.0, 5.0, 6.0, 1.0);
    expect(vecA.equals(vecB)).toBeFalsy();
    vecB = new Vector(1.0, 2.0, 3.0, 0.0);
    expect(vecA.equals(vecB)).toBeTruthy();
    vecB = new Vector(1.0, 2.0, 3.0);
    expect(vecA.equals(vecB)).toBeTruthy();
    vecA = new Vector(1.0, 2.0, 3.0);
    expect(vecA.equals(vecB)).toBeTruthy();
});

test("Vector should have an add(other) method which adds the given vector by an other vector.", () => {
    const vecA = new Vector(1, 2, 3, 0);
    const vecB = new Vector(4, 5, 6, 1);
    const vecC = new Vector(0.1, 0.2, 0.3, 0.0);
    const vecD = new Vector(0.4, 0.5, 0.6, 1.0);
    let vecR = vecA.add(vecB);
    expect(vecR).toBeInstanceOf(Vector);
    expect(vecR.x).toBe(5);
    expect(vecR.y).toBe(7);
    expect(vecR.z).toBe(9);
    expect(vecR.w).toBe(1);
    vecR = vecB.add(vecA);
    expect(vecR).toBeInstanceOf(Vector);
    expect(vecR.x).toBe(5);
    expect(vecR.y).toBe(7);
    expect(vecR.z).toBe(9);
    expect(vecR.w).toBe(1);
    vecR = vecA.add(vecC);
    expect(vecR).toBeInstanceOf(Vector);
    expect(vecR.x).toBeCloseTo(1.1, 5);
    expect(vecR.y).toBeCloseTo(2.2, 5);
    expect(vecR.z).toBeCloseTo(3.3, 5);
    expect(vecR.w).toBeCloseTo(0.0, 5);
    vecR = vecC.add(vecD);
    expect(vecR).toBeInstanceOf(Vector);
    expect(vecR.x).toBeCloseTo(0.5, 5);
    expect(vecR.y).toBeCloseTo(0.7, 5);
    expect(vecR.z).toBeCloseTo(0.9, 5);
    expect(vecR.w).toBeCloseTo(1.0, 5);
});

test("Vector should have a sub(other) method which subtracts the given vector by an other vector.", () => {
    const vecA = new Vector(1, 2, 3, 0);
    const vecB = new Vector(4, 5, 6, 1);
    const vecC = new Vector(0.1, 0.2, 0.3, 0.0);
    let vecR = vecB.sub(vecA);
    expect(vecR).toBeInstanceOf(Vector);
    expect(vecR.x).toBe(3);
    expect(vecR.y).toBe(3);
    expect(vecR.z).toBe(3);
    expect(vecR.w).toBe(1);
    vecR = vecA.sub(vecC);
    expect(vecR).toBeInstanceOf(Vector);
    expect(vecR.x).toBeCloseTo(0.9, 5);
    expect(vecR.y).toBeCloseTo(1.8, 5);
    expect(vecR.z).toBeCloseTo(2.7, 5);
    expect(vecR.w).toBeCloseTo(0.0, 5);
});

test("Vector should have a mul(other) method which multiplicates the given vector by a scalar.", () => {
    const vecA = new Vector(1, 2, 3, 0);
    const vecC = new Vector(0.1, 0.2, 0.3, 0.0);
    const scalarA = 3;
    let vecR = vecA.mul(scalarA)
    expect(vecR).toBeInstanceOf(Vector);
    expect(vecR.x).toBe(3);
    expect(vecR.y).toBe(6);
    expect(vecR.z).toBe(9);
    expect(vecR.w).toBe(0);
    vecR = vecC.mul(scalarA);
    expect(vecR).toBeInstanceOf(Vector);
    expect(vecR.x).toBeCloseTo(0.3, 5);
    expect(vecR.y).toBeCloseTo(0.6, 5);
    expect(vecR.z).toBeCloseTo(0.9, 5);
    expect(vecR.w).toBeCloseTo(0.0, 5);
});

test("Vector should have a div(other) method which divides the given vector by a scalar.", () => {
    const vecA = new Vector(1, 2, 3, 0);
    const vecC = new Vector(0.1, 0.2, 0.3, 0.0);
    const scalarA = 3;
    let vecR = vecA.div(scalarA)
    expect(vecR).toBeInstanceOf(Vector);
    expect(vecR.x).toBeCloseTo(0.333333, 5);
    expect(vecR.y).toBeCloseTo(0.666666, 5);
    expect(vecR.z).toBeCloseTo(1.0, 5);
    expect(vecR.w).toBeCloseTo(0, 5);
    vecR = vecC.div(scalarA);
    expect(vecR).toBeInstanceOf(Vector);
    expect(vecR.x).toBeCloseTo(0.033333, 5);
    expect(vecR.y).toBeCloseTo(0.066666, 5);
    expect(vecR.z).toBeCloseTo(0.099999, 5);
    expect(vecR.w).toBeCloseTo(0.0, 5);
});

test("Vector should have a dot(other) method which calculates the dot product of the given vector and an other vector.", () => {
    const vecA = new Vector(1, 2, 3, 0);
    const vecC = new Vector(0.1, 0.2, 0.3, 0);
    const scalarR = vecA.dot(vecC);
    expect(scalarR).toBe(1.4);
});

test("Vector should have a cross(other) method which calculates the cross product of the given vector and an other vector.", () => {
    const vecA = new Vector(1, 2, 3, 0);
    const vecC = new Vector(0.1, 0.2, 0.3, 0);
    const vecR = vecA.cross(vecC);
    expect(vecR).toBeInstanceOf(Vector);
    expect(vecR.x).toBeCloseTo(0.0, 5);
    expect(vecR.y).toBeCloseTo(0.0, 5);
    expect(vecR.z).toBeCloseTo(0.0, 5);
    expect(vecR.w).toBeCloseTo(0.0, 5);
});

test("Vector should have a normalised() method which normalises a vector.", () => {
    const vecA = new Vector(1, 2, 3, 0);
    let vecR = vecA.normalised();
    expect(vecR).toBeInstanceOf(Vector);
    expect(vecR.x).toBeCloseTo(0.267261, 5);
    expect(vecR.y).toBeCloseTo(0.534522, 5);
    expect(vecR.z).toBeCloseTo(0.801783, 5);
    expect(vecR.w).toBeCloseTo(0.0, 5);
});

test("Vector should have a length() method which returns the length of an vector as scalar.", () => {
    const vecA = new Vector(1, 2, 3, 0);
    const vecC = new Vector(0.1, 0.2, 0.3, 0.0);
    expect(vecA.length).toBeCloseTo(3.741657, 5);
    expect(vecC.length).toBeCloseTo(0.374165, 5);
});