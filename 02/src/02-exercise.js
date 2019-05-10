import {
    gammaAdjust,
    cmyk
} from './colour.js';

let gammaImageData;
let gammaCtx;
let gamma = 1;

let cmykCtx;

window.addEventListener('load', () => {
    const gammaSlider = document.getElementById("gammaslider");

    const gammaCanvas = document.getElementById("gamma");
    gammaCtx = gammaCanvas.getContext("2d");

    const gammaImg = new Image();
    gammaImg.onload = () => {
        gammaCtx.drawImage(gammaImg, 0, 0);
        gammaImageData = gammaCtx.getImageData(
            0, 0, gammaImg.width, gammaImg.height);
        gammaAdjustImage();
    };
    gammaImg.src = "02-gamma.png";

    gammaSlider.addEventListener('change', e => {

        gamma = gammaSlider.value;
        gammaAdjustImage();
    });
    gamma = gammaSlider.value;

    const cmykCanvas = document.getElementById("cmyk");
    cmykCtx = cmykCanvas.getContext("2d");

    const squirrel = new Image();
    squirrel.onload = () => {
        cmykCtx.drawImage(squirrel, 0, 0, 256, 192);
        cmykSplitImage();
    };
    squirrel.src = "02-squirrel.jpg";
});

function gammaAdjustImage() {
    const imageData = gammaCtx.getImageData(
        0, 0,
        gammaImageData.width, gammaImageData.height
    );
    for (let width = 0; width < gammaImageData.width; width++) {
        for (let height = 0; height < gammaImageData.height; height++) {
            gammaAdjust(gamma,
                gammaImageData.data, imageData.data,
                width, height,
                gammaImageData.width, gammaImageData.height
            );
        }
    }
    gammaCtx.putImageData(imageData, 0, 0);
}

function cmykSplitImage() {
    const orig = cmykCtx.getImageData(0, 0, 256, 192);
    const c = cmykCtx.getImageData(0, 0, orig.width, orig.height);
    const m = cmykCtx.getImageData(0, 0, orig.width, orig.height);
    const y = cmykCtx.getImageData(0, 0, orig.width, orig.height);
    const k = cmykCtx.getImageData(0, 0, orig.width, orig.height);
    for (let width = 0; width < orig.width; width++) {
        for (let height = 0; height < orig.height; height++) {
            cmyk(orig.data, width, height, orig.width, orig.height, c.data, m.data, y.data, k.data);
        }
    }
    cmykCtx.putImageData(c, 0, orig.height);
    cmykCtx.putImageData(m, orig.width, orig.height);
    cmykCtx.putImageData(y, 2 * orig.width, orig.height);
    cmykCtx.putImageData(k, 3 * orig.width, orig.height);
}