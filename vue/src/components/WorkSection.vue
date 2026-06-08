<script setup>
import { onMounted, inject } from 'vue'
import { gsap } from 'gsap'
const prefersReduced = inject('prefersReduced')

const projects = [
  { num: '01', title: 'ADAS CI/CD Pipeline',
    desc: 'GitLab CI/CD for Mercedes-Benz ADAS ECU — end-to-end build, integration, and automated validation pipeline for safety-critical embedded systems.',
    result: 'Reusable pipeline templates adopted across multiple ECU projects.' },
  { num: '02', title: 'Python Test Automation Framework',
    desc: 'CAPL + Vector CANoe + HIL framework for ADAS function validation — scenario-driven automated test execution against hardware-in-the-loop environments.',
    result: 'Replaced manual execution with automated scenario-driven runs.' },
  { num: '03', title: 'OTA Firmware Components',
    desc: 'C/C++ + SQLite on Embedded Linux for Valeo telematics — configuration management components enabling reliable over-the-air firmware updates.',
    result: 'Stable FOTA deployed across production units.' },
]

onMounted(() => {
  if (prefersReduced) return
  gsap.from('#work .section-label', { opacity: 0, y: 18, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '#work', start: 'top 80%' } })
  gsap.from('#work .section-title', { opacity: 0, y: 18, duration: 0.6, delay: 0.06, ease: 'power3.out',
    scrollTrigger: { trigger: '#work', start: 'top 80%' } })
  document.querySelectorAll('.work-card').forEach((el, i) => {
    gsap.from(el, { opacity: 0, y: 24, duration: 0.65, delay: i * 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' } })
  })
})
</script>

<template>
  <section id="work">
    <p class="section-label">projects --select</p>
    <h2 class="section-title">Selected Projects</h2>
    <div class="work-grid">
      <div v-for="p in projects" :key="p.num" class="work-card">
        <p class="work-num">{{ p.num }}</p>
        <h3 class="work-title">{{ p.title }}</h3>
        <p class="work-desc">{{ p.desc }}</p>
        <p class="work-result"><span class="result-label">Result:</span> {{ p.result }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.work-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.75rem; }
.work-card {
  background: var(--cb);
  border: 1px solid var(--br);
  padding: 1.5rem;
  transition: border-color 0.2s;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.work-card:hover { border-color: rgba(34,197,94,0.25); }
.work-num { font-size: 0.65rem; color: var(--gd); letter-spacing: 0.06em; }
.work-title { font-size: 0.9rem; font-weight: 700; color: #E2E8F0; line-height: 1.3; }
.work-desc { font-size: 0.8rem; color: var(--m); line-height: 1.7; flex: 1; }
.work-result { font-size: 0.78rem; color: var(--t); padding-top: 0.75rem; border-top: 1px solid var(--br); }
.result-label { color: var(--g); font-weight: 600; }
@media (max-width: 768px) { .work-grid { grid-template-columns: 1fr; } }
</style>