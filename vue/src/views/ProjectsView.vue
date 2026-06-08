<script setup>
import { onMounted, inject } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const prefersReduced = inject('prefersReduced')

const projects = [
  {
    num: '01',
    title: 'ADAS CI/CD Pipeline',
    stack: 'Python · GitLab CI/CD · Docker',
    desc: 'End-to-end GitLab CI/CD pipeline for Mercedes-Benz ADAS ECU — automated build, integration, and validation for safety-critical embedded systems.',
    result: 'Reusable pipeline templates adopted across multiple ECU projects.',
  },
  {
    num: '02',
    title: 'Python Test Automation Framework',
    stack: 'Python · CAPL · Vector CANoe · HIL',
    desc: 'Scenario-driven test execution framework for ADAS function validation against hardware-in-the-loop environments using CAPL scripts.',
    result: 'Replaced manual execution with fully automated scenario-driven runs.',
  },
  {
    num: '03',
    title: 'OTA Firmware Components',
    stack: 'C/C++ · SQLite · Embedded Linux',
    desc: 'Configuration management components for Valeo telematics enabling reliable over-the-air firmware updates across multiple vehicle platforms.',
    result: 'Stable FOTA deployed across production units.',
  },
]

onMounted(() => {
  if (prefersReduced) return

  gsap.from('.projects-header', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: '.projects-header', start: 'top 85%' } })

  document.querySelectorAll('.project-card').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, y: 40, scale: 0.95, duration: 0.7, delay: i * 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    })

    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect()
      gsap.to(el, {
        rotateX: -(((e.clientY - r.top)  / r.height) - 0.5) * 8,
        rotateY:  (((e.clientX - r.left) / r.width)  - 0.5) * 8,
        transformPerspective: 800,
        duration: 0.3, ease: 'power2.out',
      })
    })
    el.addEventListener('mouseleave', () =>
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
    )
  })
})
</script>

<template>
  <div class="page">
    <div class="inner">
      <div class="projects-header">
        <p class="section-label">projects --select</p>
        <h1 class="section-title">Selected Projects</h1>
      </div>

      <div class="projects-list">
        <div v-for="p in projects" :key="p.num" class="project-card glass">
          <div class="card-top">
            <span class="project-num">{{ p.num }}</span>
            <span class="project-stack">{{ p.stack }}</span>
          </div>
          <h3 class="project-title">{{ p.title }}</h3>
          <p class="project-desc">{{ p.desc }}</p>
          <p class="project-result">
            <span class="result-label">Result:</span> {{ p.result }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects-list { display: flex; flex-direction: column; gap: 0.75rem; }

.project-card {
  padding: 2rem;
  transition: border-color 0.2s;
  transform-style: preserve-3d;
  will-change: transform;
}

.card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; }
.project-num   { font-size: 0.65rem; color: var(--gd); letter-spacing: 0.06em; }
.project-stack { font-size: 0.65rem; color: var(--m); letter-spacing: 0.04em; }

.project-title {
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 700; color: #E2E8F0;
  margin-bottom: 0.75rem; line-height: 1.3;
}
.project-desc {
  font-size: 0.83rem; color: var(--m); line-height: 1.8; margin-bottom: 1.25rem;
}
.project-result { font-size: 0.8rem; color: var(--t); padding-top: 0.75rem; border-top: 1px solid var(--br); }
.result-label { color: var(--g); font-weight: 600; }
</style>
