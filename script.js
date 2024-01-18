window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.style.width = "400px";
  canvas.style.height = "400px";

  let isDrawing = false;
  let isPen = true;
  let isStamp = false;
  let lastX = 0;
  let lastY = 0;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#02010c";

  const stamp = new Image();
  stamp.src ="./150x150.png";

  canvas.addEventListener("mousedown", (e) => {
    if (isPen) {
      lastX = e.offsetX;
      lastY = e.offsetY;
      ctx.beginPath();
      isDrawing = true;
    } else if (isStamp) {
      if (stamp.complete) {
        ctx.drawImage(stamp, e.offsetX - stamp.width / 2, e.offsetY - stamp.height / 2, stamp.width, stamp.height);
      }
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    if (isPen) {
      if (isDrawing) {
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
      }
    }
  });

  canvas.addEventListener("mouseup", (e) => {
    if (isPen) {
      ctx.closePath();
      lastX = 0;
      lastY = 0;
      isDrawing = false;
    }
  });

  canvas.addEventListener("mouseleave", (e) => {
    if (isPen) {
      ctx.closePath();
      lastX = 0;
      lastY = 0;
      isDrawing = false;
    }
  });

  const clear = document.getElementById("clear");
  clear.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  const black = "#02010c";
  const red = "#d71d3b";
  const blue = "#006ab6";
  const green = "#3baf75";

  const colorButtons = document.querySelectorAll(".color");
  colorButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      switch (btn.id) {
        case "black":
          ctx.strokeStyle = black;
          isPen = true;
          isStamp = false;
          break;
        case "red":
          ctx.strokeStyle = red;
          isPen = true;
          isStamp = false;
          break;
        case "blue":
          ctx.strokeStyle = blue;
          isPen = true;
          isStamp = false;
          break;
        case "green":
          ctx.strokeStyle = green;
          isPen = true;
          isStamp = false;
          break;
        default:
          ctx.strokeStyle = black;
          isPen = true;
          isStamp = false;
      }
    });
  });

  const btnStamp = document.getElementById("stamp");
  btnStamp.addEventListener("click", () => {
    isPen = false;
    isStamp = true;
  });
});