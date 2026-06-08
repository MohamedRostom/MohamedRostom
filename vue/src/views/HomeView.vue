<script setup>
import { onMounted, onUnmounted, inject, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const prefersReduced = inject('prefersReduced')
const canvasRef = ref(null)

const stats = [
  { value: 4, suffix: '+', label: 'Years Exp' },
  { value: 4, suffix: '',  label: 'OEM Clients' },
  { value: 2, suffix: '',  label: 'ISTQB Certs' },
  { value: 3, suffix: '',  label: 'Languages' },
]

let rafId = null
let resizeHandler = null

function initCanvas(canvas) {
  if (!canvas || prefersReduced) return
  const ctx = canvas.getContext('2d')
  const chars = '01<>[]{}|/\\アイウエオ'

  function resize() {
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
  }
  resize()
  resizeHandler = resize
  window.addEventListener('resize', resize)

  let cols = Math.floor(canvas.width / 22)
  let drops = Array.from({ length: cols }, () => Math.random() * -80)
  window.addEventListener('resize', () => {
    cols  = Math.floor(canvas.width / 22)
    drops = Array.from({ length: cols }, () => Math.random() * -80)
  })

  function draw() {
    ctx.fillStyle = 'rgba(10,10,10,0.055)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.font = '13px "JetBrains Mono", monospace'
    drops.forEach((y, i) => {
      const bright = Math.random() > 0.97
      ctx.fillStyle = bright ? 'rgba(134,239,172,0.3)' : 'rgba(34,197,94,0.1)'
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 22, y * 20)
      if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0
      else drops[i] += 0.45
    })
    rafId = requestAnimationFrame(draw)
  }
  draw()
}

function animateCount(el, target, suffix) {
  let n = 0
  const step = target / 55
  const id = setInterval(() => {
    n += step
    if (n >= target) { el.textContent = target + suffix; clearInterval(id) }
    else el.textContent = Math.floor(n) + suffix
  }, 16)
}

onMounted(() => {
  initCanvas(canvasRef.value)

  if (prefersReduced) {
    document.querySelectorAll('.stat-val').forEach((el, i) => {
      el.textContent = stats[i].value + stats[i].suffix
    })
    return
  }

  const tl = gsap.timeline({ delay: 0.08 })
  tl.from('.hero-badge',        { opacity: 0, y: 20, duration: 0.55, ease: 'power3.out' })
    .from('.hero-prompt',       { opacity: 0, x: -24, duration: 0.4,  ease: 'power3.out' }, '-=0.2')
    .from('.hero-name-word',    { opacity: 0, y: 60, stagger: 0.1, duration: 0.7, ease: 'power3.out' }, '-=0.15')
    .from('.hero-role',         { opacity: 0, x: 22, duration: 0.5,  ease: 'power3.out' }, '-=0.35')
    .from('.hero-location',     { opacity: 0, y: 12, duration: 0.4,  ease: 'power3.out' }, '-=0.3')
    .from('.stat-item',         { opacity: 0, y: 28, scale: 0.88, stagger: 0.1, duration: 0.55, ease: 'back.out(1.5)' }, '-=0.2')
    .from('.hero-actions .btn', { opacity: 0, y: 14, stagger: 0.1, duration: 0.45, ease: 'power3.out' }, '-=0.2')
    .call(() => {
      document.querySelectorAll('.stat-val').forEach((el, i) =>
        animateCount(el, stats[i].value, stats[i].suffix)
      )
    })

  gsap.to('.hero-page', {
    opacity: 0.25, scale: 0.975, ease: 'none',
    scrollTrigger: { trigger: '.hero-page', start: 'center top', end: 'bottom top', scrub: 1.5 },
  })

  document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect()
      gsap.to(btn, {
        x: (e.clientX - r.left - r.width  / 2) * 0.28,
        y: (e.clientY - r.top  - r.height / 2) * 0.28,
        duration: 0.3, ease: 'power2.out',
      })
    })
    btn.addEventListener('mouseleave', () =>
      gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.4)' })
    )
  })
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
})
</script>

<template>
  <div class="hero-page">
    <canvas ref="canvasRef" class="hero-canvas" aria-hidden="true"></canvas>

    <div class="hero-inner">
      <div class="hero-badge">
        <span class="badge-dot" aria-hidden="true">●</span>
        OPEN TO OPPORTUNITIES
      </div>

      <p class="hero-prompt">whoami</p>

      <h1 class="hero-name">
        <span class="hero-name-word">Mohamed</span>
        <span class="hero-name-word">Rostom</span>
      </h1>

      <p class="hero-role">Software Automation Engineer</p>
      <p class="hero-location">Sindelfingen, Germany</p>

      <div class="stats-row">
        <div class="stat-item" v-for="s in stats" :key="s.label">
          <span class="stat-val">0{{ s.suffix }}</span>
          <span class="stat-label">{{ s.label }}</span>
        </div>
      </div>

      <div class="hero-actions">
        <a href="mailto:mohamedrostom9538@gmail.com"
           class="btn btn-primary btn-magnetic">GET IN TOUCH</a>
        <a href="/MohamedRostom/Mohamed_Rostom_AutomationEngineer_Resume.pdf" download
           class="btn btn-secondary btn-magnetic">DOWNLOAD CV</a>
      </div>
    </div>

    <div class="scroll-hint" aria-hidden="true">
      <span class="scroll-hint-line"></span>
      <span class="scroll-hint-text">scroll</span>
    </div>
  </div>
</template>

<style scoped>
.hero-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.6;
}

.hero-inner {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  padding: 7rem 2rem 5rem;
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

.hero-prompt { font-size: 0.78rem; color: var(--m); margin-bottom: 0.5rem; }
.hero-prompt::before { content: '$ '; color: var(--gd); }

.hero-name {
  display: flex;
  flex-direction: column;
  font-size: clamp(2.8rem, 7vw, 5rem);
  font-weight: 700;
  color: var(--g);
  line-height: 1.05;
  margin-bottom: 0.6rem;
  text-shadow: 0 0 40px rgba(34,197,94,0.18);
  overflow: hidden;
}
.hero-name-word { display: block; }

.hero-role { font-size: 0.95rem; color: var(--a); margin-bottom: 0.3rem; }
.hero-role::before { content: 'role: '; color: var(--m); }

.hero-location { font-size: 0.8rem; color: var(--m); margin-bottom: 2.25rem; }
.hero-location::before { content: 'loc:  '; }

.stats-row  { display: flex; flex-wrap: wrap; gap: 2.5rem; margin-bottom: 2.5rem; }
.stat-item  { display: flex; flex-direction: column; }
.stat-val   { font-weight: 700; font-size: 2rem; line-height: 1; color: var(--g); }
.stat-label { font-size: 0.68rem; color: var(--m); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 0.2rem; }

.hero-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }

.scroll-hint {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  animation: fadeUpIn 0.8s 2.2s ease both;
}
.scroll-hint-line {
  width: 1px;
  height: 36px;
  background: linear-gradient(to bottom, transparent, var(--gd));
  animation: scrollPulse 1.8s ease-in-out infinite;
}
.scroll-hint-text { font-size: 0.6rem; color: var(--m); letter-spacing: 0.12em; }

@keyframes scrollPulse { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
@keyframes fadeUpIn {
  from { opacity: 0; transform: translateX(-50%) translateY(12px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}

@media (max-width: 480px) {
  .hero-actions { flex-direction: column; }
  .hero-actions .btn { width: 100%; justify-content: center; }
  .stats-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
}
</style>
