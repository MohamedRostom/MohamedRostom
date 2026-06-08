<script setup>
import { onMounted, onUnmounted, provide, watch } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'

gsap.registerPlugin(ScrollTrigger)

let lenis = null
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const route = useRoute()

function raf(t) { lenis && lenis.raf(t * 1000) }

function initLenis() {
  if (lenis) { lenis.destroy(); gsap.ticker.remove(raf) }
  if (prefersReduced) return
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  lenis.on('scroll', ({ progress }) => {
    const bar = document.getElementById('scroll-progress')
    if (bar) bar.style.width = (progress * 100) + '%'
  })
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)
}

onMounted(initLenis)
onUnmounted(() => { lenis && lenis.destroy(); gsap.ticker.remove(raf) })

watch(() => route.path, () => {
  ScrollTrigger.getAll().forEach(t => t.kill())
  const bar = document.getElementById('scroll-progress')
  if (bar) bar.style.width = '0%'
  if (lenis) lenis.scrollTo(0, { immediate: true })
  setTimeout(() => ScrollTrigger.refresh(), 120)
})

function onLeave(el, done) {
  ScrollTrigger.getAll().forEach(t => t.kill())
  gsap.to(el, { opacity: 0, y: -18, duration: 0.32, ease: 'power2.in', onComplete: done })
}

function onEnter(el, done) {
  gsap.set(el, { opacity: 0, y: 28 })
  gsap.to(el, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.04, onComplete: done })
}

provide('lenis', { get: () => lenis })
provide('prefersReduced', prefersReduced)
</script>

<template>
  <a href="#main" class="skip-link">Skip to content</a>
  <div id="scroll-progress"></div>
  <NavBar />
  <main id="main">
    <RouterView v-slot="{ Component }">
      <Transition @leave="onLeave" @enter="onEnter" :css="false" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --g:   #22C55E;
  --gd:  #15803D;
  --gb:  rgba(34,197,94,0.05);
  --gba: rgba(34,197,94,0.18);
  --a:   #F59E0B;
  --bg:  #0A0A0A;
  --cb:  #0F0F0F;
  --t:   #D1D5DB;
  --m:   #4B5563;
  --br:  #1A2A1A;
}

html { scroll-behavior: smooth; }

body {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-weight: 400;
  background-color: var(--bg);
  color: var(--t);
  line-height: 1.75;
  overflow-x: hidden;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent, transparent 2px,
    rgba(34,197,94,0.009) 2px, rgba(34,197,94,0.009) 4px
  );
}

#scroll-progress {
  position: fixed;
  top: 0; left: 0;
  height: 2px; width: 0%;
  background: linear-gradient(90deg, #22C55E, #86EFAC);
  z-index: 1001;
  transition: width 0.05s linear;
}

.skip-link {
  position: absolute;
  top: -100%; left: 1rem;
  padding: 0.5rem 1rem;
  background: var(--g);
  color: #0A0A0A;
  font-weight: 700;
  font-size: 0.85rem;
  text-decoration: none;
  z-index: 10000;
  transition: top 0.2s;
}
.skip-link:focus { top: 0; }

.page {
  min-height: 100vh;
  padding-top: 4rem;
}

.inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 5rem 2rem;
}

.glass {
  background: var(--cb);
  border: 1px solid var(--br);
  position: relative;
  transition: border-color 0.2s;
}
.glass::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 2px;
  background: var(--gd);
  transition: background 0.2s;
}
.glass:hover { border-color: rgba(34,197,94,0.25); }
.glass:hover::before { background: var(--g); }

.section-label {
  font-size: 0.7rem;
  color: var(--m);
  margin-bottom: 0.4rem;
  display: block;
}
.section-label::before { content: '$ '; color: var(--gd); }

.section-title {
  font-size: clamp(1.4rem, 3vw, 2rem);
  color: var(--g);
  margin-bottom: 2.5rem;
  font-weight: 700;
  display: block;
}
.section-title::before { content: '// '; color: var(--gd); }

.section-divider {
  border: none;
  border-top: 1px solid var(--br);
  margin: 3rem 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.55rem 1.3rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s;
  border-radius: 0;
  border: none;
}
.btn-primary {
  background: var(--g);
  color: #0A0A0A;
}
.btn-primary::before { content: '> '; }
.btn-primary:hover { box-shadow: 0 0 20px rgba(34,197,94,0.35); }
.btn-secondary {
  background: transparent;
  color: var(--g);
  border: 1px solid var(--gd);
}
.btn-secondary::before { content: '[ '; display: inline; }
.btn-secondary::after  { content: ' ]'; display: inline; }
.btn-secondary:hover { border-color: var(--g); background: var(--gb); }

.tag-pill {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.67rem;
  padding: 0.15rem 0.5rem;
  border: 1px solid var(--br);
  background: var(--gb);
  color: var(--m);
}

:focus-visible { outline: 2px solid var(--g); outline-offset: 3px; }

h1, h2, h3 {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  line-height: 1.15;
}

@media (max-width: 768px) {
  .inner { padding: 4rem 1.25rem; }
}
</style>
