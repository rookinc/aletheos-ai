(function () {
  "use strict";

  var RENDERER_ID = "g900-return-cell-channel-renderer";
  var CANVAS_ID = "g900-return-cell-channel-canvas";
  var CHANNEL_ID = "g900_return_cell_channel_1bed7a7cba65a7be";
  var REGISTRY_URL = "data/g900_channels.v0.1.json";

  if (window.G900ChannelRenderer && window.G900ChannelRenderer.enabled) {
    return;
  }

  function rectArea(rect) {
    return Math.max(0, rect.width) * Math.max(0, rect.height);
  }

  function isVisibleCanvas(canvas) {
    if (!canvas || canvas.id === CANVAS_ID) {
      return false;
    }
    var rect = canvas.getBoundingClientRect();
    return rect.width >= 180 && rect.height >= 180 && rect.bottom > 0 && rect.right > 0 && rect.top < window.innerHeight && rect.left < window.innerWidth;
  }

  function findStageCanvas() {
    var canvases = Array.prototype.slice.call(document.querySelectorAll("canvas"));
    var best = null;
    var bestArea = 0;

    canvases.forEach(function (canvas) {
      if (!isVisibleCanvas(canvas)) {
        return;
      }
      var rect = canvas.getBoundingClientRect();
      var area = rectArea(rect);
      if (area > bestArea) {
        best = canvas;
        bestArea = area;
      }
    });

    return best;
  }

  function ensureCanvas() {
    var existing = document.getElementById(CANVAS_ID);
    if (existing) {
      return existing;
    }

    var canvas = document.createElement("canvas");
    canvas.id = CANVAS_ID;
    canvas.setAttribute("aria-hidden", "true");
    canvas.dataset.renderer = RENDERER_ID;
    canvas.dataset.channelId = CHANNEL_ID;

    canvas.style.position = "fixed";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "35";
    canvas.style.mixBlendMode = "screen";
    canvas.style.left = "-9999px";
    canvas.style.top = "-9999px";
    canvas.style.width = "1px";
    canvas.style.height = "1px";

    document.body.appendChild(canvas);
    return canvas;
  }

  function syncCanvasToStage(canvas, stageCanvas) {
    if (!stageCanvas) {
      canvas.style.display = "none";
      return null;
    }

    var rect = stageCanvas.getBoundingClientRect();
    if (rect.width < 10 || rect.height < 10) {
      canvas.style.display = "none";
      return null;
    }

    var dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    var w = Math.max(1, Math.floor(rect.width * dpr));
    var h = Math.max(1, Math.floor(rect.height * dpr));

    canvas.style.display = "block";
    canvas.style.left = rect.left + "px";
    canvas.style.top = rect.top + "px";
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    return { width: w, height: h, dpr: dpr, rect: rect };
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
      glow.addColorStop(0, "rgba(255,232,160,0.9)");
      glow.addColorStop(0.28, "rgba(255,204,92,0.38)");
      glow.addColorStop(1, "rgba(255,204,92,0)");
    } else {
      glow.addColorStop(0, "rgba(205,245,255,0.92)");
      glow.addColorStop(0.28, "rgba(76,190,255,0.36)");
      glow.addColorStop(1, "rgba(76,190,255,0)");
    }
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, r * 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = Math.min(1, alpha + 0.1);
    ctx.strokeStyle = warm ? "rgba(255,231,162,0.82)" : "rgba(145,225,255,0.82)";
    ctx.lineWidth = Math.max(1, r * 0.18);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawContainedChannel(ctx, size, channel, time) {
    var w = size.width;
    var h = size.height;
    var cx = w * 0.5;
    var cy = h * 0.5;
    var scale = Math.min(w, h);
    var pulse = 0.55 + 0.45 * Math.sin(time * 0.0018);

    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";

    var topY = h * 0.23;
    var midY = h * 0.52;
    var baseY = h * 0.82;
    var rOuter = scale * 0.26;

    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = "rgba(116,206,255,0.45)";
    ctx.lineWidth = Math.max(1, scale * 0.0018);
    ctx.beginPath();
    ctx.arc(cx, midY, rOuter, 0, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = 0.12;
    ctx.beginPath();
    ctx.arc(cx, midY, rOuter * 0.62, 0, Math.PI * 2);
    ctx.stroke();

    var grad = ctx.createLinearGradient(cx, topY, cx, baseY);
    grad.addColorStop(0, "rgba(80,196,255,0.24)");
    grad.addColorStop(0.38, "rgba(120,226,255,0.72)");
    grad.addColorStop(0.55, "rgba(255,226,152,0.85)");
    grad.addColorStop(1, "rgba(96,218,255,0.35)");

    ctx.globalAlpha = 0.55 + pulse * 0.22;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = grad;
    ctx.lineWidth = Math.max(1.25, scale * 0.0045);

    ctx.beginPath();
    ctx.moveTo(cx, baseY);
    ctx.bezierCurveTo(cx, h * 0.72, cx - rOuter * 0.13, h * 0.64, cx, midY);
    ctx.bezierCurveTo(cx + rOuter * 0.10, h * 0.43, cx - rOuter * 0.06, h * 0.34, cx, topY);
    ctx.stroke();

    ctx.globalAlpha = 0.25 + pulse * 0.18;
    ctx.strokeStyle = "rgba(255,241,190,0.45)";
    ctx.lineWidth = Math.max(1, scale * 0.0018);
    ctx.beginPath();
    ctx.moveTo(cx - rOuter * 0.5, midY);
    ctx.bezierCurveTo(cx - rOuter * 0.18, midY - rOuter * 0.20, cx + rOuter * 0.18, midY - rOuter * 0.20, cx + rOuter * 0.5, midY);
    ctx.stroke();

    drawNode(ctx, cx, topY, Math.max(2, scale * 0.0045), 0.52 + pulse * 0.18, false);
    drawNode(ctx, cx, midY, Math.max(2.5, scale * 0.006), 0.60 + pulse * 0.24, true);
    drawNode(ctx, cx, baseY, Math.max(2, scale * 0.0045), 0.48 + pulse * 0.16, false);

    var lengths = channel.transition_lengths || [3, 1, 2, 3];
    for (var j = 0; j < lengths.length; j += 1) {
      var angle = -Math.PI / 2 + (j + 0.5) * (Math.PI * 2 / lengths.length);
      var rr = rOuter * (0.34 + lengths[j] * 0.045);
      drawNode(ctx, cx + Math.cos(angle) * rr, midY + Math.sin(angle) * rr, Math.max(1.75, scale * 0.0035), 0.35, j === 1 || j === 2);
    }

    ctx.globalAlpha = 0.18 + pulse * 0.12;
    ctx.strokeStyle = "rgba(185,236,255,0.4)";
    ctx.lineWidth = Math.max(1, scale * 0.001);
    for (var k = 0; k < 4; k += 1) {
      ctx.beginPath();
      ctx.arc(cx, baseY, scale * (0.035 + k * 0.018), 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }

  function updatePanelCopy(registry) {
    var admitted = registry && registry.admitted_channel_count;
    if (!admitted) {
      return;
    }

    var textNodes = [];
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var node;
    while ((node = walker.nextNode())) {
      textNodes.push(node);
    }

    textNodes.forEach(function (n) {
      if (n.nodeValue.indexOf("Layer 3 channel scaffold. Zero admitted channel readings. No rendering authority.") !== -1) {
        n.nodeValue = n.nodeValue.replace(
          "Layer 3 channel scaffold. Zero admitted channel readings. No rendering authority.",
          "Layer 3 return-cell channel admitted. Rendering is display only. Body unchanged."
        );
      }
      if (n.nodeValue.indexOf("0 admitted") !== -1) {
        n.nodeValue = n.nodeValue.replace("0 admitted", String(admitted) + " admitted");
      }
      if (n.nodeValue.indexOf("no marker renderer, no channel, and no physics or force claim") !== -1) {
        n.nodeValue = n.nodeValue.replace(
          "no marker renderer, no channel, and no physics or force claim",
          "no marker renderer; channel rendering is separate display only; no physics or force claim"
        );
      }
    });
  }

  var overlayCanvas = ensureCanvas();
  var channel = null;
  var enabled = true;

  function render(time) {
    if (!enabled) {
      return;
    }

    var target = findStageCanvas();
    var size = syncCanvasToStage(overlayCanvas, target);
    if (size && channel) {
      drawContainedChannel(overlayCanvas.getContext("2d"), size, channel, time || performance.now());
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

      updatePanelCopy(registry);

      window.G900ChannelRenderer = {
        id: RENDERER_ID,
        channelId: CHANNEL_ID,
        enabled: true,
        canvasId: CANVAS_ID,
        containment: "stage-canvas-fixed-overlay",
        disable: function () {
          enabled = false;
          if (overlayCanvas && overlayCanvas.parentElement) {
            overlayCanvas.parentElement.removeChild(overlayCanvas);
          }
          window.G900ChannelRenderer.enabled = false;
        },
        redraw: function () {
          var target = findStageCanvas();
          var size = syncCanvasToStage(overlayCanvas, target);
          if (size && channel) {
            drawContainedChannel(overlayCanvas.getContext("2d"), size, channel, performance.now());
          }
        }
      };

      window.dispatchEvent(new CustomEvent("g900-channel-renderer-enabled", {
        detail: {
          rendererId: RENDERER_ID,
          channelId: CHANNEL_ID,
          containment: "stage-canvas-fixed-overlay"
        }
      }));

      render(performance.now());
    })
    .catch(function (error) {
      console.warn("[G900ChannelRenderer]", error.message);
    });
}());
