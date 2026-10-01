# Comercializadora El Wero

Sistema interno de operación para **Comercializadora El Wero**, un distribuidor de frutas y verduras que surte a restaurantes.

Este NO es un sitio de marketing — es una **app de administración interna** para reemplazar el flujo actual de WhatsApp + Excel + remisión en papel.

## Alcance Fase 1

- 🍽️ Restaurantes (catálogo de clientes)
- 🥬 Catálogo de productos (unidades mixtas: kilos, domos, etc.)
- 📝 Captura rápida de pedidos (desde WhatsApp / remisión)
- 📄 Generación de remisiones en PDF para imprimir
- ⚖️ Registro de cantidad entregada vs cantidad pedida
- 💵 Precios semanales (actualización por producto)
- 💰 Cobranza por restaurante
- 📊 Reportes por día / semana / mes

## Stack

- **Next.js 15** + App Router + TypeScript
- **Tailwind CSS**
- Deploy: **Vercel**

## Comandos

```bash
npm install
npm run dev      # dev server
npm run build    # production build
npm run lint     # eslint
```

## Owner

- **Cliente:** Comercializadora El Wero
- **Product owner:** Sofia (Telegram scoped)
- **Agente:** `el-wero` (en `htekdev/rocha-family`)

PRs de UI/features aprueba Sofia; PRs técnicos (tests, CI, refactors) los aprueba Hector.
