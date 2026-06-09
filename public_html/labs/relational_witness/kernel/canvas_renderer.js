function rwClear(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function rwDrawText(ctx, text, x, y, size, fill) {
  ctx.font = size + "px system-ui, sans-serif";
  ctx.fillStyle = fill;
  ctx.fillText(text, x, y);
}

function rwDrawNode(ctx, node, kind) {
  const radius = 38;
  const fill = kind === "ambient" ? "#202f4a" : "#2e3b2f";
  const stroke = kind === "ambient" ? "#8ab4f8" : "#81d99b";

  ctx.beginPath();
  ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = stroke;
  ctx.stroke();

  ctx.fillStyle = "#eef2f7";
  ctx.font = "22px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(node.label, node.x, node.y - 5);

  ctx.fillStyle = "#aeb8c7";
  ctx.font = "13px system-ui, sans-serif";
  ctx.fillText("trace " + node.trace, node.x, node.y + 22);

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
}

function rwDrawArrow(ctx, from, to, label) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / len;
  const uy = dy / len;

  const startX = from.x + ux * 44;
  const startY = from.y + uy * 44;
  const endX = to.x - ux * 44;
  const endY = to.y - uy * 44;

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#8ab4f8";
  ctx.stroke();

  const head = 12;
  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(endX - ux * head - uy * head * 0.55, endY - uy * head + ux * head * 0.55);
  ctx.lineTo(endX - ux * head + uy * head * 0.55, endY - uy * head - ux * head * 0.55);
  ctx.closePath();
  ctx.fillStyle = "#8ab4f8";
  ctx.fill();

  rwDrawText(ctx, label, (startX + endX) / 2 - 16, (startY + endY) / 2 - 14, 15, "#d7e3ff");
}

function rwDrawTraceGate(ctx, status) {
  const x = 440;
  const y = 230;
  const w = 90;
  const h = 60;

  ctx.fillStyle = status.observed_closed ? "#233827" : "#3b2d21";
  ctx.strokeStyle = status.observed_closed ? "#81d99b" : "#f0c36a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 12);
  ctx.fill();
  ctx.stroke();

  rwDrawText(ctx, "trace", x + 25, y + 24, 15, "#eef2f7");
  rwDrawText(ctx, status.observed_closed ? "match" : "gap", x + 27, y + 44, 15, "#eef2f7");
}

function rwDrawWitnessSeal(ctx, status) {
  const x = 420;
  const y = 372;
  const w = 130;
  const h = 48;

  ctx.fillStyle = status.admitted ? "#233827" : "#382326";
  ctx.strokeStyle = status.admitted ? "#81d99b" : "#f28b82";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fill();
  ctx.stroke();

  rwDrawText(ctx, status.admitted ? "admitted" : "not admitted", x + 22, y + 30, 16, "#eef2f7");
}

function rwRender(canvas, system, options) {
  const ctx = canvas.getContext("2d");
  const status = rwEvaluate(system);

  rwClear(ctx);

  rwDrawText(ctx, "Ambient register", 160, 92, 20, "#aeb8c7");
  rwDrawText(ctx, "Visible surface", 590, 92, 20, "#aeb8c7");

  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = "#3a4558";
  ctx.lineWidth = 2;
  ctx.strokeRect(90, 120, 310, 300);
  ctx.strokeRect(560, 120, 310, 300);
  ctx.setLineDash([]);

  system.ambient.forEach(function(node) {
    rwDrawNode(ctx, node, "ambient");
  });

  system.surface.forEach(function(node) {
    rwDrawNode(ctx, node, "surface");
  });

  if (options.showProjection) {
    system.projection.forEach(function(edge) {
      const from = rwFindNode(system, edge.from);
      const to = rwFindNode(system, edge.to);
      if (from && to) {
        rwDrawArrow(ctx, from, to, "pi");
      }
    });
  }

  if (options.showTrace) {
    rwDrawTraceGate(ctx, status);
  }

  if (options.showWitness) {
    rwDrawWitnessSeal(ctx, status);
  }

  rwDrawText(ctx, "surface coherence: " + String(status.surface_coherent), 90, 485, 16, "#eef2f7");
  rwDrawText(ctx, "projection: " + String(status.projected), 90, 512, 16, "#eef2f7");
  rwDrawText(ctx, "observed closure: " + String(status.observed_closed), 330, 485, 16, "#eef2f7");
  rwDrawText(ctx, "admission: " + String(status.admitted), 330, 512, 16, "#eef2f7");
}
