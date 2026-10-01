"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  UNIDADES,
  formatMoney,
  getRemision,
  subtotalLinea,
  totalRemision,
  type Remision,
} from "@/lib/remisiones";

function unidadLabel(unidad: string): string {
  return UNIDADES.find((u) => u.value === unidad)?.label ?? unidad;
}

export default function VerRemisionPage() {
  const params = useParams<{ id: string }>();
  const [remision, setRemision] = useState<Remision | null | undefined>(
    undefined
  );

  useEffect(() => {
    setRemision(getRemision(params.id));
  }, [params.id]);

  if (remision === undefined) return null;

  if (remision === null || !remision) {
    return (
      <main className="min-h-screen bg-slate-50 p-12 text-center text-slate-600">
        <p>No encontramos esa remisión.</p>
        <Link href="/remisiones" className="mt-4 inline-block text-emerald-700 underline">
          Volver a remisiones
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 print:bg-white">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between print:hidden">
          <Link href="/remisiones" className="text-sm text-slate-500 hover:text-slate-700">
            ← Remisiones
          </Link>
          <button
            onClick={() => window.print()}
            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Imprimir
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm print:border-none print:shadow-none">
          <p className="text-sm font-medium uppercase tracking-widest text-emerald-700">
            Comercializadora El Wero
          </p>
          <h1 className="mt-1 text-2xl font-bold">Remisión</h1>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500">Cliente</p>
              <p className="font-semibold">{remision.cliente}</p>
            </div>
            <div>
              <p className="text-slate-500">Fecha</p>
              <p className="font-semibold">{remision.fecha}</p>
            </div>
          </div>

          <table className="mt-6 w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="py-2">Producto</th>
                <th className="py-2 text-right">Cantidad</th>
                <th className="py-2 text-right">Unidad</th>
                <th className="py-2 text-right">Precio unit.</th>
                <th className="py-2 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {remision.lineas.map((l) => (
                <tr key={l.id} className="border-b border-slate-100">
                  <td className="py-2">{l.producto}</td>
                  <td className="py-2 text-right">{l.cantidad}</td>
                  <td className="py-2 text-right">{unidadLabel(l.unidad)}</td>
                  <td className="py-2 text-right">
                    {formatMoney(l.precioUnitario)}
                  </td>
                  <td className="py-2 text-right">
                    {formatMoney(subtotalLinea(l))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-end">
            <div className="w-48 rounded-lg bg-emerald-50 px-4 py-3 text-right">
              <p className="text-xs text-emerald-700">Total</p>
              <p className="text-lg font-bold text-emerald-900">
                {formatMoney(totalRemision(remision))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
