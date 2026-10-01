"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  formatMoney,
  getRemisiones,
  totalRemision,
  type Remision,
} from "@/lib/remisiones";

export default function RemisionesPage() {
  const [remisiones, setRemisiones] = useState<Remision[] | null>(null);

  useEffect(() => {
    setRemisiones(getRemisiones());
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-emerald-700">
              Comercializadora El Wero
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Remisiones
            </h1>
          </div>
          <Link
            href="/remisiones/nueva"
            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800"
          >
            + Nueva remisión
          </Link>
        </div>

        {remisiones === null ? null : remisiones.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-slate-600">
              Aún no hay remisiones. Crea la primera para un cliente.
            </p>
            <Link
              href="/remisiones/nueva"
              className="mt-4 inline-block rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              + Nueva remisión
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {remisiones.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/remisiones/${r.id}`}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-emerald-300"
                >
                  <div>
                    <p className="font-semibold">{r.cliente}</p>
                    <p className="text-sm text-slate-500">
                      {r.fecha} · {r.lineas.length}{" "}
                      {r.lineas.length === 1 ? "producto" : "productos"}
                    </p>
                  </div>
                  <p className="font-semibold text-emerald-800">
                    {formatMoney(totalRemision(r))}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
