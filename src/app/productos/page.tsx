"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getProductos, setDisponible, type Producto } from "@/lib/productos";

const UNIDAD_LABEL: Record<Producto["unidad"], string> = {
  kg: "Kilos",
  domo: "Domo",
  pieza: "Pieza",
};

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [filtro, setFiltro] = useState("");
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    setProductos(getProductos());
    setCargado(true);
  }, []);

  function toggleDisponible(id: string, disponible: boolean) {
    setDisponible(id, disponible);
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, disponible } : p))
    );
  }

  const filtrados = useMemo(() => {
    const q = filtro.trim().toLowerCase();
    if (!q) return productos;
    return productos.filter((p) => p.nombre.toLowerCase().includes(q));
  }, [productos, filtro]);

  const disponibles = productos.filter((p) => p.disponible).length;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-sm font-medium uppercase tracking-widest text-emerald-700">
          Comercializadora El Wero
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Catálogo de productos
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Lista importada del proveedor Roberto Pérez Lucio (Paradice). Solo
          incluye nombre y unidad — <strong>sin precios</strong>, porque
          cambian cada semana. El proveedor no vende todo lo que aparece
          aquí, así que marca ✅ solo los productos que El Wero sí maneja
          realmente.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            placeholder="Buscar producto..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none sm:max-w-xs"
          />
          <p className="text-sm text-slate-500">
            {cargado
              ? `${disponibles} de ${productos.length} marcados como disponibles`
              : "Cargando..."}
          </p>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Unidad</th>
                <th className="px-4 py-3">Proveedor</th>
                <th className="px-4 py-3 text-right">¿Lo vende El Wero?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtrados.map((p) => (
                <tr key={p.id} className={p.disponible ? "bg-emerald-50/50" : ""}>
                  <td className="px-4 py-2.5 font-medium">{p.nombre}</td>
                  <td className="px-4 py-2.5 text-slate-600">
                    {UNIDAD_LABEL[p.unidad]}
                  </td>
                  <td className="px-4 py-2.5 text-slate-500">{p.proveedor}</td>
                  <td className="px-4 py-2.5 text-right">
                    <label className="inline-flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={p.disponible}
                        onChange={(e) =>
                          toggleDisponible(p.id, e.target.checked)
                        }
                        className="h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
                      />
                    </label>
                  </td>
                </tr>
              ))}
              {filtrados.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-slate-400"
                  >
                    Sin resultados para &quot;{filtro}&quot;.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
