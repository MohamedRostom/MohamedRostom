<script setup>
import { onMounted, inject } from 'vue'
import { gsap } from 'gsap'
const prefersReduced = inject('prefersReduced')

onMounted(() => {
  if (prefersReduced) return
  gsap.from('#about .section-label', { opacity: 0, y: 18, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '#about', start: 'top 80%' } })
  gsap.from('#about .section-title', { opacity: 0, y: 18, duration: 0.6, delay: 0.06, ease: 'power3.out',
    scrollTrigger: { trigger: '#about', start: 'top 80%' } })
  document.querySelectorAll('.about-text').forEach((el, i) => {
    gsap.from(el, { opacity: 0, y: 16, duration: 0.5, delay: i * 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' } })
  })
  gsap.from('.philosophy-box', { opacity: 0, y: 16, duration: 0.5, delay: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.philosophy-box', start: 'top 88%' } })
})
</script>

<template>
  <section id="about">
    <p class="section-label">about.txt</p>
    <h2 class="section-title">About Me</h2>
    <p class="about-text">Software Engineer with 4+ years in embedded systems and automation — specializing in ADAS validation, ECU testing, and CI/CD pipeline design. Currently Resident Engineer on-site at Mercedes-Benz via Luxoft GmbH. ISTQB-certified with a track record across 4 OEM clients: Mercedes-Benz, Nissan, Volkswagen, and Renault.</p>
    <p class="about-text">I bridge embedded software engineering and automated validation — building systems that make quality repeatable and traceability inevitable.</p>
    <div class="lang-pills">
      <span class="lang-pill">English · Fluent</span>
      <span class="lang-pill">German · Basic</span>
      <span class="lang-pill">Arabic · Native</span>
    </div>
    <div class="philosophy-box">
      <p class="philosophy-label">Philosophy</p>
      <p class="philosophy-text">"The main goal of engineers is to decrease time to finish a task with high Quality and Efficiency. Anything in the Software Industry can be done — but with a cost. Based on the inputs, engineers set priority and start working on it."</p>
    </div>
  </section>
</template>

<style scoped>
.about-text { font-size: 0.85rem; color: var(--t); line-height: 1.85; margin-bottom: 1rem; }
.lang-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem; margin-bottom: 1rem; }
.lang-pill { font-size: 0.7rem; border: 1px solid var(--br); padding: 0.2rem 0.55rem; color: var(--m); }
.philosophy-box {
  background: var(--cb);
  border: 1px solid var(--br);
  border-left: 2px solid var(--gd);
  padding: 1.25rem;
  margin-top: 0.5rem;
}
.philosophy-label {
  font-size: 0.68rem;
  color: var(--g);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}
.philosophy-label::before { content: '// '; }
.philosophy-text { font-size: 0.82rem; color: var(--m); line-height: 1.85; font-style: italic; }
</style>