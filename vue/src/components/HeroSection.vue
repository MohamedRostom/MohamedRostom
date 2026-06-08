<script setup>
import { onMounted, inject } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const prefersReduced = inject('prefersReduced')

const stats = [
  { value: 4, suffix: '+', label: 'Years Exp' },
  { value: 4, suffix: '',  label: 'OEM Clients' },
  { value: 2, suffix: '',  label: 'ISTQB Certs' },
  { value: 3, suffix: '',  label: 'Languages' },
]

function animateCount(el, target, suffix) {
  const duration = 1200, step = target / (duration / 16)
  let current = 0
  const timer = setInterval(() => {
    current += step
    if (current >= target) { el.textContent = target + suffix; clearInterval(timer) }
    else el.textContent = Math.floor(current) + suffix
  }, 16)
}

onMounted(() => {
  if (prefersReduced) {
    document.querySelectorAll('.stat-val').forEach((el, i) => {
      el.textContent = stats[i].value + stats[i].suffix
    })
    return
  }

  const tl = gsap.timeline({ delay: 0.1 })
  tl.from('.hero-badge',    { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
    .from('.hero-prompt',   { opacity: 0, y: 15, duration: 0.4, ease: 'power3.out' }, '-=0.2')
    .from('.hero-name',     { opacity: 0, y: 40, duration: 0.7, ease: 'power3.out' }, '-=0.3')
    .from('.hero-role',     { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, '-=0.4')
    .from('.hero-location', { opacity: 0, y: 15, duration: 0.4, ease: 'power3.out' }, '-=0.3')
    .from('.stat-item',     { opacity: 0, y: 20, stagger: 0.08, duration: 0.5, ease: 'power3.out' }, '-=0.2')
    .from('.hero-actions',  { opacity: 0, y: 15, duration: 0.4, ease: 'power3.out' }, '-=0.2')
    .call(() => {
      document.querySelectorAll('.stat-val').forEach((el, i) => {
        animateCount(el, stats[i].value, stats[i].suffix)
      })
    })

  gsap.to('#hero', { opacity: 0.4, scale: 0.98, ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'center top', end: 'bottom top', scrub: 1 } })
})
</script>

<template>
  <section id="hero" style="max-width:100%;padding:0 2rem;border-bottom:1px solid var(--br)">
    <div class="hero-inner">
      <div class="hero-badge">
        <span class="badge-dot" aria-hidden="true">●</span>
        OPEN TO OPPORTUNITIES
      </div>

      <p class="hero-prompt">whoami</p>
      <h1 class="hero-name">Mohamed<br>Rostom</h1>
      <p class="hero-role">Software Automation Engineer</p>
      <p class="hero-location">Sindelfingen, Germany</p>

      <div class="stats-row">
        <div class="stat-item" v-for="s in stats" :key="s.label">
          <span class="stat-val">0{{ s.suffix }}</span>
          <span class="stat-label">{{ s.label }}</span>
        </div>
      </div>

      <div class="hero-actions">
        <a href="mailto:mohamedrostom9538@gmail.com" class="btn btn-primary">GET IN TOUCH</a>
        <a href="/Mohamed_Rostom_AutomationEngineer_Resume.pdf" download class="btn btn-secondary">DOWNLOAD CV</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
#hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-inner {
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  padding-top: 7rem;
  padding-bottom: 5rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--gb);
  border: 1px solid var(--gd);
  color: var(--g);
  padding: 0.3rem 1rem;
  font-size: 0.72rem;
  margin-bottom: 1.75rem;
  letter-spacing: 0.1em;
}

.badge-dot { animation: blink 1s step-end infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.hero-prompt {
  font-size: 0.78rem;
  color: var(--m);
  margin-bottom: 0.5rem;
}
.hero-prompt::before { content: '$ '; color: var(--gd); }

.hero-name {
  font-size: clamp(2.8rem, 7vw, 5rem);
  font-weight: 700;
  color: var(--g);
  line-height: 1.05;
  margin-bottom: 0.6rem;
  text-shadow: 0 0 30px rgba(34,197,94,0.2);
}

.hero-role {
  font-size: 0.95rem;
  color: var(--a);
  margin-bottom: 0.3rem;
}
.hero-role::before { content: 'role: '; color: var(--m); }

.hero-location {
  font-size: 0.8rem;
  color: var(--m);
  margin-bottom: 2.25rem;
}
.hero-location::before { content: 'loc:  '; }

.stats-row { display: flex; flex-wrap: wrap; gap: 2.5rem; margin-bottom: 2.5rem; }
.stat-item { display: flex; flex-direction: column; }

.stat-val {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 2rem;
  line-height: 1;
  color: var(--g);
}

.stat-label {
  font-size: 0.68rem;
  color: var(--m);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 0.2rem;
}

.hero-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }

@media (max-width: 480px) {
  .hero-actions { flex-direction: column; }
  .hero-actions .btn { width: 100%; justify-content: center; }
  .stats-row { display: grid; grid-template-columns: repeat(2,1fr); gap: 1.25rem; }
}
</style>