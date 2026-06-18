(function () {
  "use strict";

  var RENDERER_ID = "g900-return-cell-channel-renderer";
  var CANVAS_ID = "g900-return-cell-channel-canvas";
  var CHANNEL_ID = "g900_return_cell_channel_1bed7a7cba65a7be";
  var REGISTRY_URL = "data/g900_channels.v0.1.json";

  if (window.G900ChannelRenderer && window.G900ChannelRenderer.enabled) {
    return;
  }

  function findHost() {
    var selectors = [
      "#g900-stage",
      "#g900-stage-root",
      "#stage",
      "#viewer",
      ".g900-stage",
      ".stage-shell",
      ".viewer-shell",
      ".lab-stage",
      "main"
    ];

    for (var i = 0; i < selectors.length; i += 1) {
      var el = document.querySelector(selectors[i]);
      if (el) {
        return el;
      }
    }

    var canvas = document.querySelector("canvas");
    if (canvas && canvas.parentElement) {
      return canvas.parentElement;
    }

    return document.body;
  }

  function ensureCanvas(host) {
    var existing = document.getElementById(CANVAS_ID);
    if (existing) {
      return existing;
    }

    var canvas = document.createElement("canvas");
    canvas.id = CANVAS_ID;
    canvas.setAttribute("aria-hidden", "true");
    canvas.dataset.renderer = RENDERER_ID;
    canvas.dataset.channelId = CHANNEL_ID;

    var hostStyle = window.getComputedStyle(host);
    if (host !== document.body && hostStyle.position === "static") {
      host.style.position = "relative";
    }

    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "35";
    canvas.style.mixBlendMode = "screen";

    if (host === document.body) {
      canvas.style.position = "fixed";
      canvas.style.left = "0";
      canvas.style.top = "0";
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
    } else {
      canvas.style.position = "absolute";
      canvas.style.left = "0";
      canvas.style.top = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    }

    host.appendChild(canvas);
    return canvas;
  }

  function resizeCanvas(canvas) {
    var rect = canvas.getBoundingClientRect();
    var dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    var w = Math.max(1, Math.floor(rect.width * dpr));
    var h = Math.max(1, Math.floor(rect.height * dpr));

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    return { width: w, height: h, dpr: dpr };
  }

  function channelFromRegistry(registry) {
    var channels = registry && Array.isArray(registry.channels) ? registry.channels : [];
    for (var i = 0; i < channels.length; i += 1) {
      if (channels[i] && channels[i].id === CHANNEL_ID && channels[i].status === "admitted") {
        return channels[i];
      }
    }
    return null;
  }

  function drawNode(ctx, x, y, r, alpha, warm) {
    ctx.save();
    ctx.globalAlpha = alpha;
    var glow = ctx.createRadialGradient(x, y, 0, x, y, r * 5);
    if (warm) {
      glow.addColorStop(0, "rgba(255,232,160,0.95)");
      glow.addColorStop(0.25, "rgba(255,204,92,0.45)");
      glow.addColorStop(1, "rgba(255,204,92,0)");
    } else {
      glow.addColorStop(0, "rgba(205,245,255,0.95)");
      glow.addColorStop(0.3, "rgba(76,190,255,0.45)");
      glow.addColorStop(1, "rgba(76,190,255,0)");
    }
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, r * 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = Math.min(1, alpha + 0.15);
    ctx.strokeStyle = warm ? "rgba(255,231,162,0.85)" : "rgba(145,225,255,0.85)";
    ctx.lineWidth = Math.max(1, r * 0.22);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawChannel(ctx, size, channel, time) {
    var w = size.width;
    var h = size.height;
    var cx = w * 0.5;
    var cy = h * 0.5;
    var scale = Math.min(w, h);
    var pulse = 0.55 + 0.45 * Math.sin(time * 0.0018);

    ctx.clearRect(0, 0, w, h);
    ctx.save();

    ctx.globalCompositeOperation = "lighter";

    var topY = h * 0.18;
    var midY = h * 0.48;
    var gateY = h * 0.74;
    var baseY = h * 0.91;
    var rOuter = scale * 0.36;

    ctx.globalAlpha = 0.22;
    ctx.strokeStyle = "rgba(116,206,255,0.45)";
    ctx.lineWidth = Math.max(1, scale * 0.0015);
    ctx.beginPath();
    ctx.arc(cx, midY, rOuter, 0, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = 0.16;
    ctx.beginPath();
    ctx.arc(cx, midY, rOuter * 0.72, 0, Math.PI * 2);
    ctx.stroke();

    var points = [
      { x: cx, y: topY, warm: false },
      { x: cx + rOuter * 0.43, y: midY - rOuter * 0.22, warm: false },
      { x: cx, y: midY, warm: true },
      { x: cx - rOuter * 0.33, y: midY + rOuter * 0.24, warm: false },
      { x: cx, y: gateY, warm: true },
      { x: cx, y: baseY, warm: false }
    ];

    ctx.globalAlpha = 0.55 + pulse * 0.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    var grad = ctx.createLinearGradient(cx, topY, cx, baseY);
    grad.addColorStop(0, "rgba(80,196,255,0.25)");
    grad.addColorStop(0.35, "rgba(120,226,255,0.85)");
    grad.addColorStop(0.52, "rgba(255,226,152,0.95)");
    grad.addColorStop(0.75, "rgba(255,234,172,0.75)");
    grad.addColorStop(1, "rgba(96,218,255,0.45)");

    ctx.strokeStyle = grad;
    ctx.lineWidth = Math.max(1.5, scale * 0.006);
    ctx.beginPath();
    ctx.moveTo(cx, baseY);
    ctx.bezierCurveTo(cx, h * 0.82, cx - rOuter * 0.18, h * 0.68, cx, gateY);
    ctx.bezierCurveTo(cx + rOuter * 0.12, h * 0.60, cx + rOuter * 0.05, h * 0.55, cx, midY);
    ctx.bezierCurveTo(cx - rOuter * 0.08, h * 0.40, cx + rOuter * 0.16, h * 0.31, cx, topY);
    ctx.stroke();

    ctx.globalAlpha = 0.32 + pulse * 0.28;
    ctx.strokeStyle = "rgba(255,241,190,0.55)";
    ctx.lineWidth = Math.max(1, scale * 0.0022);
    ctx.beginPath();
    ctx.moveTo(cx - rOuter * 0.5, midY);
    ctx.bezierCurveTo(cx - rOuter * 0.18, midY - rOuter * 0.22, cx + rOuter * 0.18, midY - rOuter * 0.22, cx + rOuter * 0.5, midY);
    ctx.stroke();

    ctx.globalAlpha = 0.24 + pulse * 0.22;
    ctx.strokeStyle = "rgba(90,211,255,0.55)";
    ctx.lineWidth = Math.max(1, scale * 0.0017);
    ctx.beginPath();
    ctx.moveTo(cx - rOuter * 0.42, gateY);
    ctx.bezierCurveTo(cx - rOuter * 0.22, h * 0.67, cx - rOuter * 0.08, h * 0.59, cx, midY);
    ctx.bezierCurveTo(cx + rOuter * 0.08, h * 0.59, cx + rOuter * 0.22, h * 0.67, cx + rOuter * 0.42, gateY);
    ctx.stroke();

    for (var i = 0; i < points.length; i += 1) {
      drawNode(ctx, points[i].x, points[i].y, Math.max(3, scale * 0.006), 0.58 + pulse * 0.22, points[i].warm);
    }

    var lengths = channel.transition_lengths || [3, 1, 2, 3];
    var y0 = midY - rOuter * 0.28;
    for (var j = 0; j < lengths.length; j += 1) {
      var angle = -Math.PI / 2 + (j + 0.5) * (Math.PI * 2 / lengths.length);
      var rr = rOuter * (0.38 + lengths[j] * 0.055);
      drawNode(ctx, cx + Math.cos(angle) * rr, y0 + Math.sin(angle) * rr, Math.max(2, scale * 0.004), 0.42, j === 1 || j === 2);
    }

    ctx.globalAlpha = 0.18 + pulse * 0.18;
    ctx.strokeStyle = "rgba(185,236,255,0.45)";
    ctx.lineWidth = Math.max(1, scale * 0.0012);
    for (var k = 0; k < 5; k += 1) {
      ctx.beginPath();
      ctx.arc(cx, baseY, scale * (0.035 + k * 0.022), 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }

  var host = findHost();
  var canvas = ensureCanvas(host);
  var channel = null;
  var enabled = true;

  function render(time) {
    if (!enabled) {
      return;
    }
    var size = resizeCanvas(canvas);
    if (channel) {
      var ctx = canvas.getContext("2d");
      drawChannel(ctx, size, channel, time || performance.now());
    }
    window.requestAnimationFrame(render);
  }

  fetch(REGISTRY_URL, { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("channel registry fetch failed");
      }
      return response.json();
    })
    .then(function (registry) {
      channel = channelFromRegistry(registry);
      if (!channel) {
        throw new Error("admitted return-cell channel not found");
      }
      window.G900ChannelRenderer = {
        id: RENDERER_ID,
        channelId: CHANNEL_ID,
        enabled: true,
        canvasId: CANVAS_ID,
        disable: function () {
          enabled = false;
          if (canvas && canvas.parentElement) {
            canvas.parentElement.removeChild(canvas);
          }
          window.G900ChannelRenderer.enabled = false;
        },
        redraw: function () {
          var size = resizeCanvas(canvas);
          drawChannel(canvas.getContext("2d"), size, channel, performance.now());
        }
      };
      window.dispatchEvent(new CustomEvent("g900-channel-renderer-enabled", {
        detail: {
          rendererId: RENDERER_ID,
          channelId: CHANNEL_ID
        }
      }));
      render(performance.now());
    })
    .catch(function (error) {
      console.warn("[G900ChannelRenderer]", error.message);
    });
}());
