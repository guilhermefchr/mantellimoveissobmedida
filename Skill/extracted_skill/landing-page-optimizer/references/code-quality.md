# Qualidade de Código — Checklist e Referência

## HTML Semântico

### ✅ Checklist HTML
- [ ] DOCTYPE declarado?
- [ ] `lang` definido no `<html>`?
- [ ] Charset UTF-8 no `<head>`?
- [ ] Estrutura semântica com `<header>`, `<main>`, `<section>`, `<footer>`?
- [ ] Sem `<div>` onde elemento semântico seria melhor?
- [ ] Formulários com `<label>` associado a cada input?
- [ ] Botões usam `<button>`, não `<div>` ou `<a>`?
- [ ] Links usam `<a>`, não `<button>` (para navegação)?

**Estrutura HTML ideal para landing page:**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Título | Marca</title>
  <!-- meta tags, CSS crítico inline, preconnects -->
</head>
<body>
  <header>
    <!-- Logo + CTA mínimo, SEM navegação completa -->
  </header>
  
  <main>
    <section id="hero"><!-- Hero --></section>
    <section id="social-proof"><!-- Logos, números --></section>
    <section id="benefits"><!-- Benefícios --></section>
    <section id="testimonials"><!-- Depoimentos --></section>
    <section id="cta"><!-- CTA secundário --></section>
    <section id="faq"><!-- FAQ --></section>
  </main>
  
  <footer>
    <!-- Links legais, copyright -->
  </footer>
  
  <!-- Scripts no final, com defer -->
  <script src="app.js" defer></script>
</body>
</html>
```

---

## CSS Eficiente

### ✅ Checklist CSS
- [ ] Sem CSS inline desnecessário (exceto CSS crítico acima da dobra)?
- [ ] Variáveis CSS para cores e tipografia?
- [ ] Reset/normalize mínimo?
- [ ] Sem `!important` excessivo?
- [ ] Media queries mobile-first?
- [ ] Sem seletores excessivamente específicos?
- [ ] Animações usando `transform` e `opacity` (GPU-friendly)?
- [ ] `will-change` usado com moderação?

**Boas práticas:**
```css
/* ✅ Variáveis CSS */
:root {
  --color-primary: #2563eb;
  --color-cta: #f97316;
  --font-heading: 'Inter', sans-serif;
  --space-section: clamp(3rem, 8vw, 6rem);
}

/* ✅ Mobile-first */
.hero-title {
  font-size: 1.75rem;
}
@media (min-width: 768px) {
  .hero-title { font-size: 3rem; }
}

/* ✅ Animações GPU-friendly */
.card {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
}

/* ❌ Evitar */
.card:hover {
  margin-top: -4px; /* causa layout reflow */
  box-shadow: 0 10px 30px rgba(0,0,0,0.1); /* OK mas com moderação */
}
```

---

## JavaScript Otimizado

### ✅ Checklist JS
- [ ] Nenhum JS bloqueante no `<head>` (todos com `defer` ou no final)?
- [ ] Event listeners usando `addEventListener`, não `onclick` inline?
- [ ] Sem jQuery para LPs simples (vanilla JS é suficiente)?
- [ ] Analytics / pixels carregados de forma assíncrona?
- [ ] Sem `console.log` em produção?
- [ ] Formulários com validação client-side antes de submit?
- [ ] Intersection Observer para lazy loading customizado?

**Padrão para formulário otimizado:**
```javascript
// ✅ Validação e submit sem jQuery
const form = document.getElementById('lead-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Enviando...';
  
  const data = Object.fromEntries(new FormData(form));
  
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (res.ok) {
      window.location.href = '/obrigado';
    } else {
      throw new Error('Erro no servidor');
    }
  } catch (err) {
    btn.disabled = false;
    btn.textContent = 'Tentar novamente';
    alert('Ocorreu um erro. Tente novamente.');
  }
});
```

**Intersection Observer para animações on-scroll:**
```javascript
// ✅ Substituindo plugins pesados de scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Para de observar após animar
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

---

## Acessibilidade (Impacta SEO e UX)

### ✅ Checklist A11y
- [ ] Contraste de cor ≥ 4.5:1 para texto normal?
- [ ] Contraste ≥ 3:1 para texto grande (18px+)?
- [ ] Focus visible em todos os elementos interativos?
- [ ] Imagens decorativas com `alt=""`?
- [ ] Imagens informativas com alt descritivo?
- [ ] Página navegável pelo teclado?
- [ ] `aria-label` em ícones sem texto visível?

```css
/* ✅ Focus visível (não remover!) */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

## Red Flags de Código

| Problema | Impacto | Solução |
|---------|---------|---------|
| `<script src="...">` no `<head>` sem defer | Bloqueia renderização | Adicionar `defer` |
| jQuery + plugins para LP simples | +90KB desnecessário | Vanilla JS |
| CSS não minificado em produção | Tamanho maior, mais lento | Minificar |
| Imagens sem dimensões no HTML | CLS alto | Adicionar width/height |
| `document.write()` | Bloqueia parser | Remover |
| Estilos inline duplicados | Manutenção difícil | Mover para CSS |
| IDs duplicados | HTML inválido, bugs JS | Garantir unicidade |
