# Performance Técnica — Checklist e Referência

## Core Web Vitals (Metas Google 2024)

| Métrica | Boa | Precisa Melhorar | Ruim |
|---------|-----|-----------------|------|
| LCP (Largest Contentful Paint) | ≤ 2.5s | 2.5–4s | > 4s |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | 0.1–0.25 | > 0.25 |
| INP (Interaction to Next Paint) | ≤ 200ms | 200–500ms | > 500ms |
| FCP (First Contentful Paint) | ≤ 1.8s | 1.8–3s | > 3s |
| TTFB (Time to First Byte) | ≤ 800ms | 800ms–1.8s | > 1.8s |

---

## Checklist de Performance

### 🖼️ Imagens
- [ ] Imagens em formato moderno (WebP ou AVIF)?
- [ ] `width` e `height` definidos em todas as imagens (evita CLS)?
- [ ] Imagem hero tem `fetchpriority="high"` e NÃO tem `loading="lazy"`?
- [ ] Imagens abaixo da dobra têm `loading="lazy"`?
- [ ] Imagens responsivas com `srcset` e `sizes`?
- [ ] Imagens comprimidas (use Squoosh / imagemin)?

**Código modelo:**
```html
<!-- Hero Image - sempre eager + fetchpriority -->
<img
  src="hero.webp"
  alt="Descrição da oferta"
  width="1200"
  height="600"
  fetchpriority="high"
  decoding="async"
/>

<!-- Imagens abaixo da dobra -->
<img
  src="feature.webp"
  alt="Feature"
  width="600"
  height="400"
  loading="lazy"
  decoding="async"
/>
```

---

### 🔤 Fontes
- [ ] Usando `font-display: swap` ou `optional`?
- [ ] Preconnect para Google Fonts ou CDN de fontes?
- [ ] Subsets de fontes carregados (apenas latin se não usar outros idiomas)?
- [ ] Máximo 2 famílias de fonte + 3 pesos?

**Código modelo:**
```html
<!-- No <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- CSS -->
@font-face {
  font-family: 'MinhaFonte';
  src: url('fonte.woff2') format('woff2');
  font-display: swap;
}
```

---

### 📦 CSS e JavaScript
- [ ] CSS crítico inline no `<head>`?
- [ ] CSS não-crítico carregado com `media="print"` + onload trick?
- [ ] JS com `defer` ou `async` (nenhum JS bloqueante no `<head>`)?
- [ ] JS de terceiros (analytics, chat) carregados com `defer`?
- [ ] CSS e JS minificados?
- [ ] Sem bibliotecas desnecessárias (jQuery para uma LP simples = red flag)?

**Código modelo:**
```html
<!-- CSS crítico inline -->
<style>
  /* apenas above-the-fold styles aqui */
  body { margin: 0; font-family: sans-serif; }
  .hero { ... }
</style>

<!-- CSS não-crítico lazy -->
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>

<!-- JS com defer -->
<script src="app.js" defer></script>
<script src="https://www.googletagmanager.com/gtm.js" defer></script>
```

---

### 🌐 Rede e Servidor
- [ ] HTTPS ativo?
- [ ] HTTP/2 ou HTTP/3?
- [ ] Compressão Gzip ou Brotli ativa?
- [ ] Cache headers configurados (CSS/JS/imagens com longa expiração)?
- [ ] CDN em uso para assets estáticos?
- [ ] Preconnect para domínios críticos de terceiros?

```html
<link rel="preconnect" href="https://cdn.exemplo.com">
<link rel="dns-prefetch" href="https://analytics.google.com">
```

---

### 📱 Mobile
- [ ] Viewport meta tag presente?
- [ ] Touch targets ≥ 48x48px?
- [ ] Texto legível sem zoom (mínimo 16px body)?
- [ ] Sem conteúdo mais largo que a tela (overflow-x)?

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

## Como Medir

1. **Google PageSpeed Insights**: https://pagespeed.web.dev
2. **Chrome DevTools** → Lighthouse tab → mobile
3. **WebPageTest**: https://webpagetest.org (filmstrip view)
4. **CrUX Dashboard**: dados reais de usuários

## Red Flags Críticos (impacto imediato)

- ❌ Imagem hero em JPEG/PNG grande sem compressão → subir para WebP
- ❌ JS síncrono no `<head>` → adicionar `defer`
- ❌ Google Fonts sem preconnect → adicionar preconnect
- ❌ Imagens sem dimensões → adicionar `width` + `height`
- ❌ Slider/carrossel JavaScript pesado → remover ou substituir por CSS
