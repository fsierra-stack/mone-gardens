// Real unit data from the Moné Gardens brief (section 5). Kept as a plain
// module-level table so the shape is a drop-in match for a future Supabase
// `units` table — swap getUnits()/getUnit() for a query and nothing that
// imports them needs to change.

export type UnitStatus = "disponible" | "vendido" | "reservado";
export type UnitRow = "A" | "B";

export interface Unit {
  code: string; // e.g. "A01"
  row: UnitRow;
  index: number; // 0-based position within the row (0 = 01)
  status: UnitStatus;
  price: number | null; // USD; null when not publicly priced
  totalArea: number; // m² de construcción
  interiorArea: number; // m² interior (estimado: total - 4.05)
  exteriorArea: number; // m² de patio
  parkingSpots: number;
}

type RawUnit = [status: UnitStatus, price: number | null, totalArea: number];

const RAW: Record<UnitRow, RawUnit[]> = {
  A: [
    ["vendido", null, 101.75],
    ["disponible", 125990, 101.75],
    ["disponible", 125990, 101.75],
    ["disponible", 127400, 103.4],
    ["reservado", null, 101.75],
    ["disponible", 125990, 101.75],
    ["disponible", 125990, 101.75],
    ["disponible", 127400, 103.4],
    ["disponible", 130070, 105.07],
    ["disponible", 125990, 101.75],
    ["disponible", 125990, 101.75],
    ["disponible", 127400, 103.4],
    ["disponible", 130070, 105.07],
    ["disponible", 125990, 101.75],
    ["disponible", 125990, 101.75],
    ["vendido", null, 101.75],
  ],
  B: [
    ["reservado", null, 104.62],
    ["disponible", 125990, 101.75],
    ["disponible", 125990, 101.75],
    ["disponible", 127400, 102.9],
    ["disponible", 130070, 105.07],
    ["disponible", 125990, 101.75],
    ["disponible", 125990, 101.75],
    ["disponible", 127400, 102.9],
    ["disponible", 130070, 105.07],
    ["disponible", 125990, 101.75],
    ["disponible", 125990, 101.75],
    ["disponible", 127400, 102.9],
    ["disponible", 130070, 105.07],
    ["disponible", 125990, 101.75],
    ["vendido", null, 101.75],
    ["vendido", null, 102.49],
  ],
};

// Patio area isn't broken out per unit in the brief, only per price tier —
// bucket by total m² so sold/reserved units (no listed price) still land
// on a sensible tier.
function exteriorAreaForTotal(totalArea: number): number {
  if (totalArea < 102.3) return 28.5;
  if (totalArea < 104) return 42.6;
  return 68.9;
}

function buildRow(row: UnitRow): Unit[] {
  return RAW[row].map(([status, price, totalArea], index) => ({
    code: `${row}${String(index + 1).padStart(2, "0")}`,
    row,
    index,
    status,
    price,
    totalArea,
    interiorArea: Number((totalArea - 4.05).toFixed(2)),
    exteriorArea: exteriorAreaForTotal(totalArea),
    parkingSpots: 2,
  }));
}

const ALL_UNITS: Unit[] = [...buildRow("A"), ...buildRow("B")];

export function getUnits(row?: UnitRow): Unit[] {
  return row ? ALL_UNITS.filter((u) => u.row === row) : ALL_UNITS;
}

export function getUnit(code: string): Unit | undefined {
  return ALL_UNITS.find((u) => u.code === code);
}

export function formatPriceLabel(unit: Unit): string {
  if (unit.status === "vendido") return "Vendido";
  if (unit.status === "reservado") return "Reservado";
  return `${unit.price!.toLocaleString("en-US")} US$`;
}
