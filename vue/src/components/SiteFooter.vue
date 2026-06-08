<template>
  <footer>
    <div class="footer-inner">
      <span class="footer-name">Mohamed Rostom</span>
      <span class="footer-sep">·</span>
      <span class="footer-copy">Software Automation Engineer · Sindelfingen, Germany · 2026</span>
    </div>
    <p class="footer-built">Vue 3 + Vite · Deployed via GitHub Actions</p>
  </footer>
</template>

<style scoped>
footer {
  padding: 2rem;
  border-top: 1px solid var(--br);
  text-align: center;
}
.footer-inner {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 0.5rem;
}
.footer-name {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--g);
}
.footer-name::before { content: '> '; color: var(--m); }
.footer-sep, .footer-copy {
  font-size: 0.75rem;
  color: var(--m);
}
.footer-built {
  font-size: 0.65rem;
  color: var(--m);
  opacity: 0.5;
}
</style>