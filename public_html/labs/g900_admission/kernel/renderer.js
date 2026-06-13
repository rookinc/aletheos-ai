(function () {
  function drawG900(canvas, viewName) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const min = Math.min(w, h);

    ctx.clearRect(0, 0, w, h);

    const bg = ctx.createRadialGradient(cx, cy, min * 0.05, cx, cy, min * 0.52);
    bg.addColorStop(0, "rgba(30, 60, 90, 0.22)");
    bg.addColorStop(1, "rgba(0, 0, 0, 0.92)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    const phaseMap = {
      kernel: 0,
      object: 0.25,
      receipts: 0.5,
      compare: 0.75,
      boundary: 1
    };
    const phase = phaseMap[viewName] || 0;

    drawRing(ctx, cx, cy, min, phase);
    drawFibers(ctx, cx, cy, min, phase);
    drawLedgerPulse(ctx, cx, cy, min, viewName);
  }

  function drawRing(ctx, cx, cy, min, phase) {
    const slots = 15;
    const radius = min * 0.34;

    for (let i = 0; i < slots; i += 1) {
      const a = -Math.PI / 2 + (Math.PI * 2 * i) / slots;
      const x = cx + Math.cos(a) * radius;
      const y = cy + Math.sin(a) * radius;
      const next = -Math.PI / 2 + (Math.PI * 2 * ((i + 1) % slots)) / slots;
      const nx = cx + Math.cos(next) * radius;
      const ny = cy + Math.sin(next) * radius;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.strokeStyle = "rgba(215, 190, 123, 0.18)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, min * 0.015, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(215, 190, 123, 0.82)";
      ctx.fill();

      const pulse = 0.5 + 0.5 * Math.sin(phase * Math.PI * 2 + i * 0.7);
      ctx.beginPath();
      ctx.arc(x, y, min * (0.035 + pulse * 0.012), 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(157, 201, 255, 0.18)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function drawFibers(ctx, cx, cy, min, phase) {
    const slots = 15;
    const local = 60;
    const ringR = min * 0.34;
    const fiberR = min * 0.07;

    for (let i = 0; i < slots; i += 1) {
      const a = -Math.PI / 2 + (Math.PI * 2 * i) / slots;
      const fx = cx + Math.cos(a) * ringR;
      const fy = cy + Math.sin(a) * ringR;

      for (let j = 0; j < local; j += 1) {
        const b = (Math.PI * 2 * j) / local + phase * 0.8 + i * 0.05;
        const r = fiberR * (0.72 + 0.18 * Math.sin(j * 0.4 + i));
        const x = fx + Math.cos(b) * r;
        const y = fy + Math.sin(b) * r;

        const alpha = 0.22 + 0.5 * ((j % 6) / 6);
        ctx.beginPath();
        ctx.arc(x, y, min * 0.0038, 0, Math.PI * 2);
        ctx.fillStyle = j < 30
          ? "rgba(157, 201, 255, " + alpha + ")"
          : "rgba(158, 230, 189, " + alpha + ")";
        ctx.fill();
      }

      if (i % 3 === 0) {
        const tx = cx + Math.cos(a + 0.2) * ringR;
        const ty = cy + Math.sin(a + 0.2) * ringR;
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.quadraticCurveTo(cx, cy, tx, ty);
        ctx.strokeStyle = "rgba(147, 91, 255, 0.12)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }
  }

  function drawLedgerPulse(ctx, cx, cy, min, viewName) {
    const labels = {
      kernel: "KERNEL",
      object: "900 / 3600 / 8",
      receipts: "QED LEDGER CLOSED",
      compare: "BASELINE AND SIBLING SEPARATED",
      boundary: "BOUNDED CLAIM SET"
    };

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(238, 246, 255, 0.76)";
    ctx.font = "700 " + Math.floor(min * 0.032) + "px system-ui, sans-serif";
    ctx.fillText(labels[viewName] || "G900", cx, cy);

    ctx.strokeStyle = "rgba(215, 190, 123, 0.24)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, min * 0.145, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  window.G900_RENDERER = {
    drawG900: drawG900
  };
})();
