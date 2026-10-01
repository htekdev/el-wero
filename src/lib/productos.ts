import { PRODUCTOS_SEED } from "./productos-seed";
import type { Unidad } from "./remisiones";

export interface Producto {
  id: string;
  nombre: string;
  unidad: Unidad;
  proveedor: string;
  disponible: boolean;
}

const STORAGE_KEY = "el-wero:productos-disponibilidad";

function slugify(nombre: string): string {
  return nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getDisponibilidad(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, boolean>;
  } catch {
    return {};
  }
}

/**
 * Catálogo de productos. Los precios NO se cargan aquí porque cambian cada
 * semana (ver módulo de Precios, pendiente). Todos los productos arrancan
 * como "no disponible" hasta que Sofia confirme cuáles sí vende El Wero,
 * ya que el proveedor no vende todos los que aparecen en su lista.
 */
export function getProductos(): Producto[] {
  const disponibilidad = getDisponibilidad();
  return PRODUCTOS_SEED.map((p) => {
    const id = slugify(p.nombre);
    return {
      id,
      nombre: p.nombre,
      unidad: p.unidad,
      proveedor: p.proveedor,
      disponible: disponibilidad[id] ?? false,
    };
  });
}

export function setDisponible(id: string, disponible: boolean): void {
  if (typeof window === "undefined") return;
  const disponibilidad = getDisponibilidad();
  disponibilidad[id] = disponible;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(disponibilidad));
}

export function getProductosDisponibles(): Producto[] {
  return getProductos().filter((p) => p.disponible);
}
