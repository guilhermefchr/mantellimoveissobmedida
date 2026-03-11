# SEO On-Page — Checklist e Referência

## Checklist SEO para Landing Pages

### 🏷️ Meta Tags Essenciais
- [ ] `<title>` entre 50–60 caracteres com keyword principal?
- [ ] `<meta name="description">` entre 150–160 caracteres com CTA?
- [ ] Open Graph tags para compartilhamento em redes sociais?
- [ ] Twitter Card tags?
- [ ] Canonical tag para evitar conteúdo duplicado?
- [ ] Meta robots correto (index, follow para LP principal)?

**Código modelo:**
```html
<head>
  <title>Nome do Produto | Benefício Principal – Marca</title>
  <meta name="description" content="Descrição convincente com keyword e CTA em 150 chars. Experimente grátis hoje.">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Título para redes sociais">
  <meta property="og:description" content="Descrição para redes sociais">
  <meta property="og:image" content="https://exemplo.com/og-image.jpg">
  <meta property="og:url" content="https://exemplo.com/landing">
  <meta property="og:type" content="website">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Título">
  <meta name="twitter:description" content="Descrição">
  <meta name="twitter:image" content="https://exemplo.com/twitter-image.jpg">
  
  <!-- Canonical -->
  <link rel="canonical" href="https://exemplo.com/landing-page">
</head>
```

---

### 📐 Estrutura de Headings
- [ ] Um único `<h1>` por página com keyword principal?
- [ ] `<h2>` para seções principais?
- [ ] `<h3>` para sub-seções?
- [ ] Hierarquia lógica sem pular níveis (h1 → h2 → h3)?
- [ ] Keywords naturalmente incluídas nos headings?

**Estrutura ideal:**
```html
<h1>Keyword Principal + Benefício</h1>
  <h2>Seção 1: Por que escolher</h2>
    <h3>Benefício 1</h3>
    <h3>Benefício 2</h3>
  <h2>Como funciona</h2>
  <h2>Depoimentos</h2>
  <h2>Perguntas Frequentes</h2>
```

---

### 🖼️ SEO de Imagens
- [ ] Todas as imagens com `alt` descritivo e relevante?
- [ ] Nomes de arquivo descritivos (não "img001.jpg")?
- [ ] Alt text não é keyword stuffing?

```html
<!-- ❌ Ruim -->
<img src="img001.jpg" alt="">
<img src="foto.jpg" alt="curso online curso digital curso barato">

<!-- ✅ Bom -->
<img src="curso-marketing-digital-resultados.webp" 
     alt="Estudante analisando métricas de marketing digital no notebook">
```

---

### 🔗 Links
- [ ] Links internos com anchor text descritivo?
- [ ] Links externos com `rel="noopener noreferrer"`?
- [ ] Sem links quebrados?
- [ ] CTA links descritivos (não "clique aqui")?

---

### 📊 Schema Markup (Dados Estruturados)
Adicionar schema relevante para o tipo de página:

**Para produto/serviço:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Nome do Produto",
  "description": "Descrição",
  "offers": {
    "@type": "Offer",
    "price": "197.00",
    "priceCurrency": "BRL",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
}
</script>
```

**Para FAQ (aumenta visibilidade nas SERPs):**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Pergunta 1?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Resposta 1."
      }
    }
  ]
}
</script>
```

---

### ⚡ Performance como Fator de Ranqueamento
- [ ] Core Web Vitals passando? (ver references/performance.md)
- [ ] HTTPS ativo?
- [ ] Mobile-friendly?
- [ ] Página carrega em < 3s no 4G?

---

### 📝 Conteúdo
- [ ] Keyword principal aparece no primeiro parágrafo?
- [ ] Densidade de keyword natural (não exagerada)?
- [ ] Conteúdo suficiente para a intenção de busca?
- [ ] Texto alternativo para imagens informativas?

---

## Verificação Rápida
Tools para verificar SEO on-page:
- **Google Search Console**: indexação e erros
- **Screaming Frog** (free up to 500 URLs): auditoria completa
- **Schema Validator**: https://validator.schema.org
- **Rich Results Test**: https://search.google.com/test/rich-results
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
