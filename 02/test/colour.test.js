import {
    gammaAdjust,
    cmyk
} from "../src/colour.js";

test("gamma adjust shall keep a pixel's value for gamma = 1", () => {
    let data = new Array(4);
    data[0] = 20;
    data[1] = 30;
    data[2] = 40;
    data[3] = 255;
    gammaAdjust(1, data, data, 0, 0, 1, 1);

    expect(data[0]).toBeCloseTo(20);
    expect(data[1]).toBeCloseTo(30);
    expect(data[2]).toBeCloseTo(40);
    expect(data[3]).toBe(255);
});

test("gamma adjust shall square a pixel's value for gamma = 2", () => {
    let data = new Array(4);
    data[0] = 20;
    data[1] = 30;
    data[2] = 40;
    data[3] = 255;
    gammaAdjust(2, data, data, 0, 0, 1, 1);

    expect(data[0]).toBeCloseTo(71.414);
    expect(data[1]).toBeCloseTo(87.464);
    expect(data[2]).toBeCloseTo(100.995);
    expect(data[3]).toBe(255);
});

test("cmyk shall extract the cmyk decomposition into four target arrays", () => {
    let data = new Array(4);
    let cData = new Array(4);
    let mData = new Array(4);
    let yData = new Array(4);
    let kData = new Array(4);
    data[0] = 40;
    data[1] = 20;
    data[2] = 200;
    data[3] = 255;
    cmyk(data, 0, 0, 1, 1, cData, mData, yData, kData);
    // c
    expect(cData[0]).toBe(95);
    expect(cData[1]).toBe(255);
    expect(cData[2]).toBe(255);
    expect(cData[3]).toBe(255);
    // m
    expect(mData[0]).toBe(255);
    expect(mData[1]).toBe(75);
    expect(mData[2]).toBe(255);
    expect(mData[3]).toBe(255);
    // y
    expect(yData[0]).toBe(255);
    expect(yData[1]).toBe(255);
    expect(yData[2]).toBe(255);
    expect(yData[3]).toBe(255);
    // k
    expect(kData[0]).toBe(200);
    expect(kData[1]).toBe(200);
    expect(kData[2]).toBe(200);
    expect(kData[3]).toBe(255);
});