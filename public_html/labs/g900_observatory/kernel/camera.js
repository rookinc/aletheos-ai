export function createCamera() {
  return {
    distance: 13,
    yaw: 0.8,
    pitch: -0.32,
    roll: 0,
    panX: 0,
    panY: 0,
  };
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function rotateY(point, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return {
    x: c * point.x + s * point.z,
    y: point.y,
    z: -s * point.x + c * point.z,
  };
}

function rotateX(point, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return {
    x: point.x,
    y: c * point.y - s * point.z,
    z: s * point.y + c * point.z,
  };
}

function rotateZ(point, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return {
    x: c * point.x - s * point.y,
    y: s * point.x + c * point.y,
    z: point.z,
  };
}

export function projectPoint(point, camera, viewport) {
  let q = rotateY(point, camera.yaw);
  q = rotateX(q, camera.pitch);
  q = rotateZ(q, camera.roll);

  q.x += camera.panX;
  q.y += camera.panY;

  const zCamera = q.z + camera.distance;
  const focal = Math.min(viewport.width, viewport.height) * 0.64;
  const scale = focal / Math.max(1.5, zCamera);

  return {
    x: viewport.width / 2 + q.x * scale,
    y: viewport.height / 2 - q.y * scale,
    scale,
    depth: zCamera,
  };
}
