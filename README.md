# 🚀 Depois da Despedida - Site Profissional Completo

Site estático de alto desempenho, otimizado para SEO Local, conversão e conformidade rigorosa com a LGPD. Desenvolvido com HTML5, CSS3 e JavaScript puro (Vanilla).

## 📋 Checklist de Configuração Pré-Lançamento

1. **Substituir Placeholders de Marketing** (Busque por `🚨` no `index.html`):
   - [ ] `G-XXXXXXXXXX` → Seu ID real do Google Analytics 4.
   - [ ] `AW-XXXXXXXXX` → Seu ID de Conversão do Google Ads.
   - [ ] `GTM-XXXXXXX` → Seu ID do Google Tag Manager.
   - [ ] `1234567890` → Seu ID real do Meta Pixel.
   - [ ] Atualize o CNPJ/CPF no rodapé do `index.html` e na `politica-privacidade.html`.

2. **Dados do Negócio**:
   - [ ] Valide o endereço completo no Schema.org (JSON-LD) no `<head>` do `index.html`.
   - [ ] Atualize os links das redes sociais no footer.

3. **Hospedagem Estática Recomendada**:
   - Vercel, Netlify ou GitHub Pages (gratuitos, rápidos e com HTTPS automático).

## ⚙️ Guia de Configuração de Ferramentas

- **Google Tag Manager (GTM)**: Crie um contêiner Web. Cole os snippets no `<head>` e `<body>`. Use o GTM para gerenciar o GA4 e o Meta Pixel de forma centralizada.
- **Google Analytics 4**: Vincule ao GTM. Configure um evento de conversão chamado "whatsapp_click" quando o usuário clica nos botões de contato.
- **Meta Pixel**: O evento `PageView` já está configurado. No Gerenciador de Eventos do Facebook, crie uma regra para disparar o evento "Lead" nos cliques do botão flutuante do WhatsApp.

## 🧪 3 Dicas Rápidas de Teste Local

1. **Simulação de UTM**: Abra o site localmente adicionando `?utm_source=instagram&utm_campaign=luto2026` à URL. Clique no botão do WhatsApp e verifique se a mensagem pré-preenchida no app reflete exatamente: *"Vim pelo site (Fonte: instagram, Campanha: luto2026)..."*.
2. **Teste de LocalStorage (Tema)**: Abra o DevTools (F12) > Application > Local Storage. Alterne o modo escuro e verifique se a chave `theme` muda de `light` para `dark` e persiste ao recarregar a página.
3. **Bloqueio de Cookies (LGPD)**: Abra em uma aba anônima. **Não** clique em "Aceitar" no banner. Abra o Console (F12) e clique no WhatsApp. Verifique se a função `trackEvent` registra no console: `[Track Bloqueado pela LGPD]`.

## 📈 Plano de Ação de Marketing Local (8 Semanas)

- **Semana 1-2**: Otimização do Perfil da Empresa no Google (antigo GMB). Adicionar fotos reais do espaço, horário de funcionamento, link para o site e pedir avaliações de clientes atendidos.
- **Semana 3-4**: Campanha de Google Ads (Rede de Pesquisa) com palavras-chave de cauda longa e alta intenção: "psicólogo para luto São Paulo", "advogado inventário viúvo SP".
- **Semana 5-6**: Lançamento de conteúdo orgânico no Instagram com trechos do Ebook "O Guia do Recomeço" (isca digital) para capturar e-mails e construir lista de nutrição.
- **Semana 7-8**: Ativação de remarketing (Meta Ads) para visitantes que acessaram a página de serviços ou FAQ mas não clicaram no WhatsApp, exibindo depoimentos em vídeo para gerar confiança.

---
*Desenvolvido com foco em performance, acessibilidade, empatia digital e segurança jurídica.*