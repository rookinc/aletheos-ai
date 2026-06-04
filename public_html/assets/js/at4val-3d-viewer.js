(() => {
  function parseColor(value, fallback) {
    return value && value !== "canvastext" ? value : fallback;
  }

  function initViewer(host) {
    const canvas = host.querySelector("canvas");
    const status = host.querySelector("[data-at4val-status]");
    const src = host.getAttribute("data-src");
    const ctx = canvas.getContext("2d");

    let graph = null;
    let width = 0;
    let height = 0;
    let rotX = -0.38;
    let rotY = 0.58;

    function resize() {
      const rect = host.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      width = Math.max(280, Math.floor(rect.width));
      height = Math.max(320, Math.floor(rect.height));
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    }

    function rotatePoint(p) {
      const cx = Math.cos(rotX);
      const sx = Math.sin(rotX);
      const cy = Math.cos(rotY);
      const sy = Math.sin(rotY);

      let x = p.x;
      let y = p.y * cx - p.z * sx;
      let z = p.y * sx + p.z * cx;

      const x2 = x * cy + z * sy;
      const z2 = -x * sy + z * cy;

      return { x: x2, y, z: z2 };
    }

    function project(p) {
      const r = rotatePoint(p);
      const depth = 3.2;
      const scale = Math.min(width, height) * 0.37;
      const perspective = depth / (depth - r.z);
      return {
        x: width * 0.5 + r.x * scale * perspective,
        y: height * 0.52 + r.y * scale * perspective,
        z: r.z,
        s: perspective
      };
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      const styles = getComputedStyle(host);
      const ink = parseColor(styles.color, "#1f2428");

      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = ink;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width * 0.5, 24);
      ctx.lineTo(width * 0.5, height - 24);
      ctx.moveTo(24, height * 0.52);
      ctx.lineTo(width - 24, height * 0.52);
      ctx.stroke();
      ctx.restore();

      if (!graph) {
        return;
      }

      const byId = new Map();
      for (const node of graph.nodes) {
        byId.set(node.id, project(node));
      }

      const edges = graph.edges.map((edge) => ({
        a: byId.get(edge.source),
        b: byId.get(edge.target)
      })).filter((edge) => edge.a && edge.b);

      edges.sort((e1, e2) => ((e1.a.z + e1.b.z) - (e2.a.z + e2.b.z)));

      ctx.save();
      ctx.lineCap = "round";
      for (const edge of edges) {
        const z = (edge.a.z + edge.b.z) * 0.5;
        const alpha = 0.22 + Math.max(0, z) * 0.16;
        ctx.globalAlpha = Math.max(0.16, Math.min(0.48, alpha));
        ctx.strokeStyle = ink;
        ctx.lineWidth = 1.7;
        ctx.beginPath();
        ctx.moveTo(edge.a.x, edge.a.y);
        ctx.lineTo(edge.b.x, edge.b.y);
        ctx.stroke();
      }
      ctx.restore();

      const points = graph.nodes.map((node) => {
        const p = byId.get(node.id);
        return { id: node.id, ...p };
      }).sort((a, b) => a.z - b.z);

      for (const p of points) {
        const alpha = 0.58 + Math.max(0, p.z) * 0.20;
        const radius = Math.max(3.1, 4.2 * p.s);

        ctx.save();
        ctx.globalAlpha = Math.max(0.45, Math.min(0.92, alpha));
        ctx.fillStyle = "#f8f7f2";
        ctx.strokeStyle = ink;
        ctx.lineWidth = 1.45;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    }

    function step() {
      if (graph) {
        rotY += 0.0022;
        draw();
      }
      requestAnimationFrame(step);
    }
    window.addEventListener("resize", resize);

    fetch(src)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not load graph data");
        }
        return res.json();
      })
      .then((data) => {
        graph = data;
        if (status) {
          status.textContent = "AT4val[60,6]: 60 vertices, 120 edges, degree 4, diameter 6.";
        }
        resize();
      })
      .catch((err) => {
        if (status) {
          status.textContent = err.message;
        }
      });

    resize();
    requestAnimationFrame(step);
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-at4val-3d]").forEach(initViewer);
  });
})();

