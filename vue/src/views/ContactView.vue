<script setup>
import { onMounted, inject, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const prefersReduced = inject('prefersReduced')
const titleRef = ref(null)

const links = [
  { label: 'mohamedrostom9538@gmail.com',                href: 'mailto:mohamedrostom9538@gmail.com',                      icon: 'mail' },
  { label: '+49 174 466 7687',                            href: 'tel:+491744667687',                                        icon: 'phone' },
  { label: 'linkedin.com/in/mohamed-abdelfattah-rostom', href: 'https://linkedin.com/in/mohamed-abdelfattah-rostom',       icon: 'linkedin' },
  { label: 'github.com/MohamedRostom',                   href: 'https://github.com/MohamedRostom',                         icon: 'github' },
]

function glitchTitle(el) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01'
  const original = el.textContent
  let i = 0
  const id = setInterval(() => {
    el.textContent = original.split('').map((c, idx) => {
      if (c === ' ') return ' '
      return idx < i ? c : chars[Math.floor(Math.random() * chars.length)]
    }).join('')
    i += 1.5
    if (i >= original.length + 2) { el.textContent = original; clearInterval(id) }
  }, 28)
}

onMounted(() => {
  if (prefersReduced) return

  gsap.from('.contact-prompt', { opacity: 0, x: -20, duration: 0.5, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-prompt', start: 'top 88%' } })

  ScrollTrigger.create({
    trigger: '.contact-title', start: 'top 85%', once: true,
    onEnter: () => {
      gsap.from('.contact-title', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out',
        onComplete: () => { if (titleRef.value) glitchTitle(titleRef.value) } })
    },
  })

  gsap.from('.contact-sub',    { opacity: 0, y: 14, duration: 0.5, delay: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-sub', start: 'top 88%' } })
  gsap.from('.status-line',    { opacity: 0, y: 10, duration: 0.4, delay: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.status-line', start: 'top 88%' } })
  gsap.from('.contact-actions .btn', { opacity: 0, y: 12, stagger: 0.1, duration: 0.45, delay: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-actions', start: 'top 88%' } })
  gsap.from('.contact-link-item', { opacity: 0, x: -16, stagger: 0.1, duration: 0.45, delay: 0.2, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-links', start: 'top 90%' } })

  gsap.to('.online-dot', {
    scale: 1.4, opacity: 0.6, duration: 0.8, ease: 'power2.inOut', repeat: -1, yoyo: true,
  })
})
</script>

<template>
  <div class="page">
    <div class="inner">
      <p class="contact-prompt" aria-hidden="true">connect --open</p>
      <h1 class="contact-title" ref="titleRef">Let's build something</h1>
      <p class="contact-sub">
        Open to senior roles in automotive software, embedded systems, and test automation.
        Based in Sindelfingen, Germany — open to relocation and travel.
      </p>

      <div class="status-line">
        <span class="online-dot" aria-hidden="true"></span>
        <span class="status-text">Available for opportunities</span>
      </div>

      <div class="contact-actions">
        <a href="mailto:mohamedrostom9538@gmail.com" class="btn btn-primary">SEND MESSAGE</a>
        <a href="/MohamedRostom/Mohamed_Rostom_AutomationEngineer_Resume.pdf"
           download class="btn btn-secondary">RESUME PDF</a>
      </div>

      <div class="contact-links">
        <a v-for="l in links" :key="l.label" :href="l.href"
           target="_blank" rel="noopener noreferrer" class="contact-link-item">
          <span class="link-icon-label">{{ l.icon }}</span>
          <span class="link-value">{{ l.label }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-prompt { font-size: 0.72rem; color: var(--m); margin-bottom: 0.5rem; }
.contact-prompt::before { content: '$ '; color: var(--gd); }

.contact-title {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  color: var(--g); font-weight: 700;
  margin-bottom: 0.65rem;
  text-shadow: 0 0 30px rgba(34,197,94,0.15);
}
.contact-title::before { content: '> '; color: var(--gd); }

.contact-sub { font-size: 0.85rem; color: var(--m); margin-bottom: 1.5rem; max-width: 520px; line-height: 1.75; }

.status-line { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem; }
.online-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--g); box-shadow: 0 0 6px rgba(34,197,94,0.7); display: inline-block; }
.status-text { font-size: 0.72rem; color: var(--gd); letter-spacing: 0.06em; }

.contact-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 2rem; }

.contact-links { display: flex; flex-direction: column; gap: 0.5rem; }
.contact-link-item {
  display: flex; align-items: center; gap: 0.75rem;
  text-decoration: none;
  padding: 0.55rem 1rem;
  border: 1px solid var(--br); background: var(--cb);
  transition: border-color 0.15s, background 0.15s;
  max-width: 520px;
}
.contact-link-item:hover { border-color: var(--g); background: rgba(34,197,94,0.05); }
.link-icon-label {
  font-size: 0.62rem; color: var(--gd);
  border: 1px solid var(--gd); padding: 0.05rem 0.4rem;
  text-transform: uppercase; letter-spacing: 0.06em; white-space: nowrap; flex-shrink: 0;
  min-width: 4.5rem; text-align: center;
}
.link-value { font-size: 0.78rem; color: var(--g); word-break: break-all; }

@media (max-width: 480px) {
  .contact-actions { flex-direction: column; }
  .contact-actions .btn { width: 100%; justify-content: center; }
}
</style>
