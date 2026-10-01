export type Unidad = "kg" | "domo" | "pieza";

export interface RemisionLinea {
  id: string;
  producto: string;
  cantidad: number;
  unidad: Unidad;
  precioUnitario: number;
}

export interface Remision {
  id: string;
  cliente: string;
  fecha: string; // ISO date (yyyy-mm-dd)
  lineas: RemisionLinea[];
  createdAt: string; // ISO timestamp
}

const STORAGE_KEY = "el-wero:remisiones";

export function subtotalLinea(linea: RemisionLinea): number {
  return linea.cantidad * linea.precioUnitario;
}

export function totalRemision(remision: Pick<Remision, "lineas">): number {
  return remision.lineas.reduce((sum, l) => sum + subtotalLinea(l), 0);
}

export function nuevaLinea(): RemisionLinea {
  return {
    id: crypto.randomUUID(),
    producto: "",
    cantidad: 0,
    unidad: "kg",
    precioUnitario: 0,
  };
}

export function getRemisiones(): Remision[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Remision[];
    return parsed.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

export function getRemision(id: string): Remision | undefined {
  return getRemisiones().find((r) => r.id === id);
}

export function saveRemision(remision: Remision): void {
  if (typeof window === "undefined") return;
  const remisiones = getRemisiones();
  remisiones.push(remision);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(remisiones));
}

export function formatMoney(n: number): string {
  return n.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });
}

export const UNIDADES: { value: Unidad; label: string }[] = [
  { value: "kg", label: "Kilos" },
  { value: "domo", label: "Domo" },
  { value: "pieza", label: "Pieza" },
];
