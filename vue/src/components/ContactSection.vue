<script setup>
import { onMounted, inject } from 'vue'
import { gsap } from 'gsap'
const prefersReduced = inject('prefersReduced')

onMounted(() => {
  if (prefersReduced) return
  gsap.from('#contact .contact-title', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: '#contact .contact-title', start: 'top 85%' } })
  gsap.from('#contact .contact-sub', { opacity: 0, y: 18, duration: 0.6, delay: 0.08, ease: 'power3.out',
    scrollTrigger: { trigger: '#contact .contact-sub', start: 'top 85%' } })
  gsap.from('#contact .contact-actions', { opacity: 0, y: 14, duration: 0.5, delay: 0.14, ease: 'power3.out',
    scrollTrigger: { trigger: '#contact .contact-actions', start: 'top 85%' } })
  gsap.from('.contact-pill', { opacity: 0, y: 12, stagger: 0.07, duration: 0.45, delay: 0.2, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-pill', start: 'top 88%' } })
})
</script>

<template>
  <section id="contact">
    <p class="contact-prompt" aria-hidden="true">connect --open</p>
    <h2 class="contact-title">Let's build something</h2>
    <p class="contact-sub">Open to senior roles in automotive software, embedded systems, and test automation.</p>
    <div class="contact-actions">
      <a href="mailto:mohamedrostom9538@gmail.com" class="btn btn-primary">SEND MESSAGE</a>
      <a href="/Mohamed_Rostom_AutomationEngineer_Resume.pdf" download class="btn btn-secondary">RESUME PDF</a>
    </div>
    <div class="contact-links">
      <a href="mailto:mohamedrostom9538@gmail.com" class="contact-pill">mohamedrostom9538@gmail.com</a>
      <a href="https://linkedin.com/in/mohamed-abdelfattah-rostom" target="_blank" rel="noopener noreferrer" class="contact-pill">LinkedIn</a>
      <a href="https://github.com/MohamedRostom" target="_blank" rel="noopener noreferrer" class="contact-pill">GitHub</a>
    </div>
  </section>
</template>

<style scoped>
#contact { border-bottom: none; }
.contact-prompt {
  font-size: 0.72rem;
  color: var(--m);
  margin-bottom: 0.5rem;
}
.contact-prompt::before { content: '$ '; color: var(--gd); }
.contact-title {
  font-size: clamp(1.4rem, 3vw, 2rem);
  color: var(--g);
  margin-bottom: 0.6rem;
}
.contact-title::before { content: '> '; color: var(--gd); }
.contact-sub {
  font-size: 0.85rem;
  color: var(--m);
  margin-bottom: 2rem;
  max-width: 480px;
}
.contact-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 2rem; }
.contact-links { display: flex; flex-wrap: wrap; gap: 0.6rem; }
.contact-pill {
  display: inline-flex;
  align-items: center;
  font-size: 0.78rem;
  color: var(--g);
  text-decoration: none;
  padding: 0.35rem 0.9rem;
  border: 1px solid var(--gd);
  background: var(--gb);
  transition: border-color 0.15s, background 0.15s;
}
.contact-pill:hover { border-color: var(--g); background: rgba(34,197,94,0.08); }
@media (max-width: 480px) {
  .contact-actions { flex-direction: column; }
  .contact-actions .btn { width: 100%; justify-content: center; }
}
</style>