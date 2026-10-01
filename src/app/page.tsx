import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-10">
          <p className="text-sm font-medium uppercase tracking-widest text-emerald-700">
            Comercializadora
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            El Wero
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Sistema interno de operación: pedidos, remisiones, entregas,
            precios semanales y cobranza por restaurante.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/remisiones"
              className="inline-block rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800"
            >
              📄 Ir a Remisiones
            </Link>
            <Link
              href="/productos"
              className="inline-block rounded-lg border border-emerald-700 px-5 py-2.5 text-sm font-semibold text-emerald-800 shadow-sm hover:bg-emerald-50"
            >
              🥬 Ver catálogo de productos
            </Link>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">En construcción</h2>
          <p className="mt-2 text-slate-600">
            Estamos armando la Fase 1 del sistema. Los primeros módulos serán:
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            <li className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
              🍽️ Restaurantes
            </li>
            <li className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
              🥬 Catálogo de productos
            </li>
            <li className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
              📝 Captura de pedidos
            </li>
            <li className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
              📄 Remisiones (PDF)
            </li>
            <li className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
              ⚖️ Entregado vs pedido
            </li>
            <li className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
              💵 Precios semanales
            </li>
            <li className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
              💰 Cobranza por restaurante
            </li>
            <li className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
              📊 Reportes día / semana / mes
            </li>
          </ul>
        </section>

        <footer className="mt-10 text-sm text-slate-500">
          © {new Date().getFullYear()} Comercializadora El Wero
        </footer>
      </div>
    </main>
  );
}
