<script setup>
import { onMounted, inject } from 'vue'
import { gsap } from 'gsap'
const prefersReduced = inject('prefersReduced')

const certs = [
  { name: 'ISTQB Certified Tester Foundation Level', id: 'ID: 221026031' },
  { name: 'ISTQB Agile Tester',                      id: 'ID: 230817023' },
  { name: 'Modern C++',                               id: 'Udemy' },
  { name: 'OOP Specialization',                       id: 'Coursera' },
]

onMounted(() => {
  if (prefersReduced) return
  gsap.from('#education .section-label', { opacity: 0, y: 18, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '#education', start: 'top 80%' } })
  gsap.from('#education .section-title', { opacity: 0, y: 18, duration: 0.6, delay: 0.06, ease: 'power3.out',
    scrollTrigger: { trigger: '#education', start: 'top 80%' } })
  document.querySelectorAll('.edu-card').forEach((el, i) => {
    gsap.from(el, { opacity: 0, y: 24, duration: 0.65, delay: i * 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' } })
  })
})
</script>

<template>
  <section id="education">
    <p class="section-label">education.txt</p>
    <h2 class="section-title">Education &amp; Certifications</h2>
    <div class="edu-grid">
      <div class="edu-card glass">
        <p class="edu-card-label">Education</p>
        <p class="edu-degree">B.Sc. Communications and Electronics Engineering</p>
        <p class="edu-inst">Faculty of Engineering, Alexandria University, Egypt</p>
        <p class="edu-period">2014 – 2019</p>
      </div>
      <div class="edu-card glass">
        <p class="edu-card-label">Certifications</p>
        <div class="cert-list">
          <div v-for="c in certs" :key="c.name" class="cert-item">
            <p class="cert-name">{{ c.name }}</p>
            <p class="cert-id">{{ c.id }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.edu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.edu-card { padding: 1.5rem; }
.edu-card-label {
  font-size: 0.68rem;
  color: var(--g);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.1rem;
}
.edu-card-label::before { content: '// '; color: var(--gd); }
.edu-degree { font-size: 0.9rem; font-weight: 700; color: #E2E8F0; margin-bottom: 0.35rem; line-height: 1.4; }
.edu-inst { font-size: 0.82rem; color: var(--t); margin-bottom: 0.25rem; }
.edu-period { font-size: 0.72rem; color: var(--m); }
.cert-list { display: flex; flex-direction: column; gap: 0.8rem; }
.cert-item { padding-bottom: 0.8rem; border-bottom: 1px solid var(--br); }
.cert-item:last-child { border-bottom: none; padding-bottom: 0; }
.cert-name { font-size: 0.84rem; color: #E2E8F0; margin-bottom: 0.1rem; }
.cert-id { font-size: 0.7rem; color: var(--m); }
@media (max-width: 640px) { .edu-grid { grid-template-columns: 1fr; } }
</style>