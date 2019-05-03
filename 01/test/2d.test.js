import {
    checkerboard,
    circle
} from "../src/2d.js";

test("checkerboard shall color the upper left pixel black", () => {
    let data = new Array(8 * 8 * 4);
    checkerboard(data, 0, 0, 8, 8);

    expect(data[0]).toBe(0);
    expect(data[1]).toBe(0);
    expect(data[2]).toBe(0);
    expect(data[3]).toBe(255);
});

test("checkerboard shall color the second pixel white", () => {
    let data = new Array(8 * 8 * 4);
    checkerboard(data, 1, 0, 8, 8);

    expect(data[4]).toBe(255);
    expect(data[5]).toBe(255);
    expect(data[6]).toBe(255);
    expect(data[7]).toBe(255);
});

test("circle shall have a white part around", () => {
    let data = new Array(3 * 3 * 4);
    circle(data, 0, 0, 3, 3, 1);
    expect(data[0]).toBe(255);
    expect(data[1]).toBe(255);
    expect(data[2]).toBe(255);
    expect(data[3]).toBe(0);
});

test("circle shall have a black inner part", () => {
    let data = new Array(3 * 3 * 4);
    circle(data, 1, 1, 3, 3, 1);
    expect(data[16]).toBe(0);
    expect(data[17]).toBe(0);
    expect(data[18]).toBe(0);
    expect(data[19]).toBe(255);
});