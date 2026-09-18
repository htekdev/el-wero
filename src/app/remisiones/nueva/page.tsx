"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  UNIDADES,
  formatMoney,
  nuevaLinea,
  saveRemision,
  subtotalLinea,
  totalRemision,
  type RemisionLinea,
  type Unidad,
} from "@/lib/remisiones";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function NuevaRemisionPage() {
  const router = useRouter();
  const [cliente, setCliente] = useState("");
  const [fecha, setFecha] = useState(todayISO());
  const [lineas, setLineas] = useState<RemisionLinea[]>([nuevaLinea()]);

  function actualizarLinea(id: string, cambios: Partial<RemisionLinea>) {
    setLineas((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...cambios } : l))
    );
  }

  function agregarLinea() {
    setLineas((prev) => [...prev, nuevaLinea()]);
  }

  function quitarLinea(id: string) {
    setLineas((prev) =>
      prev.length > 1 ? prev.filter((l) => l.id !== id) : prev
    );
  }

  function guardar() {
    if (!cliente.trim()) {
      alert("Escribe el nombre del cliente/restaurante.");
      return;
    }
    const lineasValidas = lineas.filter((l) => l.producto.trim());
    if (lineasValidas.length === 0) {
      alert("Agrega al menos un producto.");
      return;
    }
    const remision = {
      id: crypto.randomUUID(),
      cliente: cliente.trim(),
      fecha,
      lineas: lineasValidas,
      createdAt: new Date().toISOString(),
    };
    saveRemision(remision);
    router.push(`/remisiones/${remision.id}`);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-sm font-medium uppercase tracking-widest text-emerald-700">
          Comercializadora El Wero
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Nueva remisión
        </h1>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Cliente / Restaurante
            </span>
            <input
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Ej. Restaurante La Cabaña"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Fecha</span>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
            />
          </label>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Productos</h2>
            <button
              type="button"
              onClick={agregarLinea}
              className="rounded-lg border border-emerald-700 px-3 py-1.5 text-sm font-medium text-emerald-800 hover:bg-emerald-50"
            >
              + Agregar producto
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {lineas.map((linea) => (
              <div
                key={linea.id}
                className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-12 sm:items-end"
              >
                <label className="sm:col-span-4">
                  <span className="text-xs font-medium text-slate-500">
                    Producto
                  </span>
                  <input
                    value={linea.producto}
                    onChange={(e) =>
                      actualizarLinea(linea.id, { producto: e.target.value })
                    }
                    placeholder="Ej. Jitomate"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:border-emerald-600 focus:outline-none"
                  />
                </label>
                <label className="sm:col-span-2">
                  <span className="text-xs font-medium text-slate-500">
                    Cantidad
                  </span>
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={linea.cantidad || ""}
                    onChange={(e) =>
                      actualizarLinea(linea.id, {
                        cantidad: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:border-emerald-600 focus:outline-none"
                  />
                </label>
                <label className="sm:col-span-2">
                  <span className="text-xs font-medium text-slate-500">
                    Unidad
                  </span>
                  <select
                    value={linea.unidad}
                    onChange={(e) =>
                      actualizarLinea(linea.id, {
                        unidad: e.target.value as Unidad,
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:border-emerald-600 focus:outline-none"
                  >
                    {UNIDADES.map((u) => (
                      <option key={u.value} value={u.value}>
                        {u.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="sm:col-span-2">
                  <span className="text-xs font-medium text-slate-500">
                    Precio unitario
                  </span>
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={linea.precioUnitario || ""}
                    onChange={(e) =>
                      actualizarLinea(linea.id, {
                        precioUnitario: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm focus:border-emerald-600 focus:outline-none"
                  />
                </label>
                <div className="sm:col-span-1">
                  <span className="text-xs font-medium text-slate-500">
                    Subtotal
                  </span>
                  <p className="mt-1 text-sm font-semibold">
                    {formatMoney(subtotalLinea(linea))}
                  </p>
                </div>
                <div className="sm:col-span-1 sm:text-right">
                  <button
                    type="button"
                    onClick={() => quitarLinea(linea.id)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <span className="font-semibold text-emerald-900">Total</span>
          <span className="text-xl font-bold text-emerald-900">
            {formatMoney(totalRemision({ lineas }))}
          </span>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={guardar}
            className="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800"
          >
            Guardar remisión
          </button>
          <button
            type="button"
            onClick={() => router.push("/remisiones")}
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            Cancelar
          </button>
        </div>
      </div>
    </main>
  );
}
