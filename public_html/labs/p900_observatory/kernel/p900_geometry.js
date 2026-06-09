function idOf(sector, local) {
  return `${sector}:${local}`;
}

export function buildVertices(candidate, view, tick = 0, pulseEnabled = true) {
  const points = [];
  const pulse = pulseEnabled ? Math.sin(tick * 0.025) : 0;

  for (let sector = 0; sector < 15; sector += 1) {
    for (let local = 0; local < 60; local += 1) {
      const residue = local % 30;
      const bit = local >= 30 ? 1 : 0;

      const sectorAngle = (Math.PI * 2 * sector) / 15;
      const residueAngle = (Math.PI * 2 * residue) / 30;

      let radius = 4.6 + 0.22 * Math.sin(residueAngle * 3);
      let z = (bit === 0 ? -0.52 : 0.52) + 1.85 * Math.sin(residueAngle);

      if (view === "internal_g60") {
        radius = 1.15 + 0.085 * residue;
        z = (bit === 0 ? -0.5 : 0.5) + 0.55 * Math.sin(residueAngle * 2);
      } else if (view === "residue_sheets") {
        radius = 3.1 + residue * 0.07;
        z = bit === 0 ? -0.35 : 0.35;
      } else if (view === "sector_fibers") {
        radius = 1.4 + bit * 0.65 + 0.03 * residue;
        z = -2.4 + sector * 0.34;
      }

      const breath = pulseEnabled ? 0.08 * pulse * Math.cos(residueAngle + sector * 0.3) : 0;

      let x;
      let y;

      if (view === "sector_fibers") {
        const a = residueAngle;
        const sectorCol = sector - 7;
        x = sectorCol * 0.62 + Math.cos(a) * radius * 0.22;
        y = Math.sin(a) * radius * 0.22 + (bit ? 0.25 : -0.25);
      } else if (view === "internal_g60") {
        const centerAngle = sectorAngle;
        const cx = 4.6 * Math.cos(centerAngle);
        const cy = 4.6 * Math.sin(centerAngle);
        const a = residueAngle + bit * Math.PI / 7;
        x = cx + Math.cos(a) * radius * 0.28;
        y = cy + Math.sin(a) * radius * 0.28;
      } else {
        x = Math.cos(sectorAngle) * (radius + breath);
        y = Math.sin(sectorAngle) * (radius + breath);
      }

      points.push({
        id: idOf(sector, local),
        sector,
        local,
        residue,
        bit,
        x,
        y,
        z,
      });
    }
  }

  return points;
}

export function buildEdges(candidate, view) {
  const lists = candidate.edge_lists || {};

  if (view === "internal_g60") {
    return lists.internal_g60 || [];
  }

  if (view === "external_p900" || view === "residue_sheets") {
    return lists.external_p900 || [];
  }

  if (view === "sector_fibers") {
    return lists.internal_g60 || [];
  }

  return lists.combined || [];
}
