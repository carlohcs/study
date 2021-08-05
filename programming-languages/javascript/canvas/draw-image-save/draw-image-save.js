const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const grid = 25;
canvas.setAttribute("width", tile * 25);
canvas.setAttribute("height", tile * 20);

document.body.prepend(canvas);

// TODO
// - Draw with mouse
// Buttons to
// - Clear
// - Save image
// - Specify color
// - Specify stroke width