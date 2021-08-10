let canvas = null;
let ctx = null;

const config = {
  brushWidth: 10,
  color: "#000",
  isDrawing: false,
  x1: 0,
  y1: 0,
};

/**
 * Create canvas and append into body
 *
 * @returns {void}
 */
function createCanvas() {
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");

  const grid = 25;
  canvas.setAttribute("width", grid * 25);
  canvas.setAttribute("height", grid * 20);

  document.body.prepend(canvas);
}

/**
 * Create button`s toolbox
 *
 * @returns {void}
 */
function createToolBox() {
  const div = document.createElement("div");

  div.classList.add('canvas-toolbox');
  div.style.width = `${canvas.getClientRects()[0].width}px`;

  canvas.insertAdjacentElement("afterend", div);
}

/**
 * Create a button with defined informations
 *
 * @param   {String} text
 * @param   {Function} fn
 * @param   {String} type
 * @returns {void}
 */
function createButton(text, fn, type = "button") {
  let element;

  switch (type) {
    case "button":
      element = document.createElement("button");
      element.addEventListener("click", (evt) => {
        fn(evt);
      });
      break;
    case "color":
      element = document.createElement("input");
      element.setAttribute("type", "color");
      element.addEventListener("input", (evt) => {
        fn(evt);
      });
      break;
    case "range":
      element = document.createElement("input");
      element.setAttribute("type", "range");
      element.setAttribute("min", 1);
      element.setAttribute("max", 10);
      element.addEventListener("input", (evt) => {
        fn(evt);
      });
      break;
    default:
      element = document.createElement("button");
      element.addEventListener("click", (evt) => {
        fn(evt);
      });
  }

  element.textContent = text;

  document.querySelector("div").appendChild(element);
}

/**
 * Save image to disk
 *
 * @returns {void}
 */
const save = () => {
  const imageURL = canvas.toDataURL();
  const image = new Image(canvas.width, canvas.height);
  image.src = imageURL;

  const link = document.createElement("a");
  link.setAttribute("download", "my-image.png");
  link.setAttribute("href", imageURL);
  link.click();
};

/**
 * Erase current image
 *
 * @returns {void}
 */
const clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

/**
 * Set brush`s color
 *
 * @param   {HTMLEvent} evt
 * @returns {void}
 */
const color = (evt) => {
  config.color = evt.target.value;
};

/**
 * Set brush`s width
 *
 * @param   {HTMLEvent} evt
 * @returns {void}
 */
const range = (evt) => {
  config.brushWidth = evt.target.value;
};

/**
 * Append buttons to page
 *
 * @returns {void}
 */
function appendButtons() {
  const buttons = [
    {
      text: "Save",
      fn: save,
    },
    {
      text: "Clear",
      fn: clear,
    },
    {
      text: "Color",
      fn: color,
      type: "color",
    },
    {
      text: "Paint width",
      fn: range,
      type: "range",
    },
  ];

  buttons.forEach((button) => {
    createButton(button.text, button.fn, button.type);
  });
}

/**
 * Draw in the canvas
 *
 * @param   {Number} x1 moveTo X position
 * @param   {Number} y1 moveTo Y position
 * @param   {Number} x2 lineTo X position
 * @param   {Number} y2 lineTo Y position
 * @returns {void}
 */
function draw(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.strokeStyle = config.color;
  ctx.lineWidth = config.brushWidth;
  ctx.lineCap = "round";
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

/**
 * Handle mouse events
 *
 * @param   {HTMLEvent} evt
 * @param   {String} eventType
 * @returns {void}
 */
function handleMouse(evt, eventType) {
  let offsetX = evt.offsetX;
  let offsetY = evt.offsetY;

  switch (eventType) {
    case "mousedown": // press
      config.isDrawing = true;
      config.x1 = offsetX;
      config.y1 = offsetY;
      break;
    case "mousemove": // moving
      if (config.isDrawing) {
        draw(config.x1, config.y1, offsetX, offsetY);

        config.x1 = offsetX;
        config.y1 = offsetY;
      }
      break;
    case "mouseup": // release
      if (config.isDrawing) {
        draw(config.x1, config.y1, offsetX, offsetY);

        config.isDrawing = false;
      }
      break;
  }
}

/**
 * Add events
 */
function addEvents() {
  canvas.addEventListener("mousedown", (evt) => {
    handleMouse(evt, "mousedown");
  });

  canvas.addEventListener("mouseup", (evt) => {
    handleMouse(evt, "mouseup");
  });

  canvas.addEventListener("mouseout", (evt) => {
    handleMouse(evt, "mouseup");
  });

  canvas.addEventListener("mousemove", (evt) => {
    handleMouse(evt, "mousemove");
  });
}

createCanvas();
createToolBox();
appendButtons();
addEvents();
