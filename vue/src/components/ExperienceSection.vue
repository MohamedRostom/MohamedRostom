<script setup>
import { onMounted, inject } from 'vue'
import { gsap } from 'gsap'
const prefersReduced = inject('prefersReduced')

const jobs = [
  {
    title: 'Software Automation Test Engineer',
    badge: 'Resident Eng.',
    company: 'Mercedes-Benz ADAS · Luxoft GmbH',
    period: 'Jul 2024 – Present',
    bullets: [
      'Designed GitLab CI/CD pipelines for ADAS ECU build, integration, and automated validation',
      'Developed reusable Python libraries and pipeline templates for ECU packaging',
      'Built test automation frameworks using Python, CAPL, Vector CANoe for ADAS function validation',
      'Maintained HIL environments; ensured ASPICE compliance and V&V traceability',
    ],
    tags: ['Python','CAPL','GitLab CI/CD','Vector CANoe','HIL','ASPICE','Jira'],
  },
  {
    title: 'Software Engineer',
    badge: null,
    company: 'Valeo · Nissan, Volkswagen',
    period: 'Nov 2022 – Jul 2024',
    bullets: [
      'Embedded software design, development, and testing on Linux and real-time systems',
      'Developed OTA/FOTA configuration management components using C/C++ and SQLite',
      'Debugged software-hardware interactions; contributed to V2V and vehicle diagnostics',
    ],
    tags: ['C/C++','Python','SQLite','Embedded Linux','Bash','CAPL'],
  },
  {
    title: 'Validation Engineer',
    badge: null,
    company: 'Valeo · Nissan, Renault',
    period: 'Oct 2021 – Oct 2022',
    bullets: [
      'Designed validation test plans: smoke, regression, exploratory, and negative testing',
      'Managed CI/CD daily validation and Jenkins automation',
      'Maintained HIL environments and V&V documentation in Core ALM and IBM DOORS',
    ],
    tags: ['Python','CAPL','Vector CANoe','Jenkins','Core ALM','IBM DOORS'],
  },
]

onMounted(() => {
  if (prefersReduced) return
  gsap.from('#experience .section-label', { opacity: 0, y: 18, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '#experience', start: 'top 80%' } })
  gsap.from('#experience .section-title', { opacity: 0, y: 18, duration: 0.6, delay: 0.06, ease: 'power3.out',
    scrollTrigger: { trigger: '#experience', start: 'top 80%' } })
  document.querySelectorAll('.job-card').forEach((el, i) => {
    gsap.from(el, { opacity: 0, y: 24, duration: 0.65, delay: i * 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' } })
  })
})
</script>

<template>
  <section id="experience">
    <p class="section-label">experience --list</p>
    <h2 class="section-title">Experience</h2>

    <div v-for="job in jobs" :key="job.title" class="job-card glass">
      <p class="job-title">
        {{ job.title }}
        <span v-if="job.badge" class="job-badge">{{ job.badge }}</span>
      </p>
      <p class="job-company">{{ job.company }}</p>
      <p class="job-period">{{ job.period }}</p>
      <ul class="job-bullets">
        <li v-for="b in job.bullets" :key="b">{{ b }}</li>
      </ul>
      <div class="job-tags">
        <span v-for="t in job.tags" :key="t" class="tag-pill">{{ t }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.job-card { padding: 1.5rem; margin-bottom: 0.75rem; }
.job-title { font-size: 0.92rem; font-weight: 700; color: #E2E8F0; margin-bottom: 0.2rem; }
.job-badge {
  font-size: 0.65rem;
  border: 1px solid var(--gd);
  color: var(--g);
  padding: 0.1rem 0.45rem;
  margin-left: 0.5rem;
  vertical-align: middle;
}
.job-company { font-size: 0.8rem; color: var(--a); margin-bottom: 0.15rem; }
.job-period { font-size: 0.72rem; color: var(--m); margin-bottom: 0.9rem; }
.job-bullets { list-style: none; margin-bottom: 1rem; }
.job-bullets li {
  font-size: 0.82rem;
  color: var(--t);
  padding-left: 1.5rem;
  position: relative;
  margin-bottom: 0.35rem;
  line-height: 1.65;
}
.job-bullets li::before {
  content: '>>>';
  position: absolute;
  left: 0;
  color: var(--gd);
  font-size: 0.62rem;
  top: 0.28em;
}
.job-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; }
</style>